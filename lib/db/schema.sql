-- World Cup Inu — Supabase schema v1
-- Run in the Supabase SQL editor. Idempotent.

create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- ── ENUMS ─────────────────────────────────────────

do $$ begin
  create type fixture_status as enum (
    'NS','LIVE','HT','FT','PST','CANC','ABD','TBD'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type fixture_round as enum (
    'Group Stage - 1','Group Stage - 2','Group Stage - 3',
    'Round of 32','Round of 16','Quarter-finals','Semi-finals',
    '3rd Place Final','Final'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type bet_side as enum ('home','draw','away');
exception when duplicate_object then null; end $$;

do $$ begin
  create type bet_status as enum ('pending','settling','won','lost','void','refunded');
exception when duplicate_object then null; end $$;

do $$ begin
  create type badge_kind as enum ('oracle','whale','streak','paul_banker');
exception when duplicate_object then null; end $$;

-- ── TEAMS ─────────────────────────────────────────

create table if not exists teams (
  code text primary key,            -- e.g. 'BRA'
  name text not null,
  grp text not null check (grp in ('A','B','C','D','E','F','G','H','I','J','K','L')),
  colors text[] not null            -- [primary, secondary] hex
);

-- ── FIXTURES (104 WC26 matches) ───────────────────

create table if not exists fixtures (
  id bigint primary key,                     -- API-Football fixture id
  kickoff timestamptz not null,
  status fixture_status not null default 'NS',
  round fixture_round not null,
  venue_name text not null,
  venue_city text not null,
  home_code text not null references teams(code),
  away_code text not null references teams(code),
  minute int,
  score_home int,
  score_away int,
  is_neutral boolean generated always as (
    home_code not in ('USA','CAN','MEX')
  ) stored,
  updated_at timestamptz not null default now()
);

create index if not exists fixtures_kickoff_idx on fixtures (kickoff);
create index if not exists fixtures_status_idx on fixtures (status);
create index if not exists fixtures_round_idx on fixtures (round);

-- ── USERS ─────────────────────────────────────────

create table if not exists profiles (
  id uuid primary key default uuid_generate_v4(),
  wallet_address text unique,
  handle text unique,
  country text references teams(code),
  avatar_key text default 'chibi_jumping',
  joined_at timestamptz not null default now(),
  wallet_visible boolean not null default true,
  notif_kickoff boolean not null default true,
  notif_paul_pick boolean not null default true,
  notif_win boolean not null default true,
  notif_weekly_merkle boolean not null default true
);

-- ── POOLS ─────────────────────────────────────────

create table if not exists pools (
  fixture_id bigint primary key references fixtures(id) on delete cascade,
  home numeric(18,6) not null default 0,
  draw numeric(18,6) not null default 0,
  away numeric(18,6) not null default 0,
  seeded numeric(18,6) not null default 0,
  updated_at timestamptz not null default now()
);

-- ── ORACLE PICKS (Paul) ───────────────────────────

create table if not exists oracle_picks (
  id uuid primary key default uuid_generate_v4(),
  fixture_id bigint not null references fixtures(id) on delete cascade,
  pick bet_side not null,
  confidence int not null check (confidence between 0 and 99),
  p_home numeric(5,4) not null,
  p_draw numeric(5,4) not null,
  p_away numeric(5,4) not null,
  sources jsonb not null,
  created_at timestamptz not null default now(),
  unique (fixture_id)
);

-- ── BETS ──────────────────────────────────────────

create table if not exists bets (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  fixture_id bigint not null references fixtures(id) on delete cascade,
  side bet_side not null,
  stake numeric(18,6) not null check (stake > 0),
  odds_at_entry numeric(10,4) not null,
  status bet_status not null default 'pending',
  payout numeric(18,6),
  tx_hash text,
  placed_at timestamptz not null default now(),
  settled_at timestamptz
);

create index if not exists bets_user_idx on bets (user_id, placed_at desc);
create index if not exists bets_fixture_idx on bets (fixture_id);

-- ── COPE CARDS ────────────────────────────────────

create table if not exists cope_cards (
  token_id bigint primary key,             -- ERC-721A mint id
  bet_id uuid not null references bets(id) on delete cascade,
  wallet_address text not null,
  wallet_handle text,
  team_code text not null references teams(code),
  amount numeric(18,6) not null,
  roast text not null,
  redacted boolean not null default false,
  minted_at timestamptz not null default now()
);
create index if not exists cope_feed_idx on cope_cards (minted_at desc);

-- ── GRUDGE POINTS (off-chain) ─────────────────────

create table if not exists grudge_points (
  user_id uuid primary key references profiles(id) on delete cascade,
  points int not null default 0,
  streak_losses int not null default 0,
  last_loss_at timestamptz,
  updated_at timestamptz not null default now()
);

-- ── REWARDS (weekly Merkle epochs) ────────────────

create table if not exists rewards_epochs (
  epoch int primary key,
  snapshot_at timestamptz not null,
  merkle_root text not null,
  total_weth numeric(18,6) not null,
  tx_hash text,
  published_at timestamptz not null default now()
);

create table if not exists rewards_claims (
  epoch int not null references rewards_epochs(epoch) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  amount numeric(18,6) not null,
  proof text[] not null,
  claimed_at timestamptz,
  primary key (epoch, user_id)
);

-- ── TAX TICKER (cached totals) ────────────────────

create table if not exists tax_ticker (
  id boolean primary key default true,
  rewards_this_week numeric(18,2) not null default 0,
  ecosystem_this_week numeric(18,2) not null default 0,
  total_routed numeric(18,2) not null default 0,
  updated_at timestamptz not null default now(),
  check (id)
);

-- ── LEADERBOARD MATERIALIZED VIEWS ────────────────

create materialized view if not exists leaderboard_reward as
select
  p.id, p.handle, p.country,
  coalesce(sum(rc.amount), 0) as total_claimed,
  count(rc.epoch) as epochs
from profiles p
left join rewards_claims rc on rc.user_id = p.id
group by p.id;

create materialized view if not exists leaderboard_grudge as
select p.id, p.handle, p.country, g.points, g.streak_losses
from profiles p
join grudge_points g on g.user_id = p.id
order by g.points desc;

-- ── ROW LEVEL SECURITY ────────────────────────────

alter table profiles enable row level security;
alter table bets enable row level security;
alter table cope_cards enable row level security;
alter table rewards_claims enable row level security;

create policy "profiles are public read" on profiles
  for select using (true);
create policy "users manage own profile" on profiles
  for all using (auth.uid() = id);
create policy "bets are public read (handle gated in app layer)" on bets
  for select using (true);
create policy "users insert own bets" on bets
  for insert with check (auth.uid() = user_id);
create policy "cope cards are public read" on cope_cards
  for select using (true);
create policy "rewards claims are own" on rewards_claims
  for select using (auth.uid() = user_id);

-- ── seed teams (48 rows) ──────────────────────────
-- Run separately; see scripts/seed-fixtures.ts which calls this.
