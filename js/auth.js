-- ==========================================
-- PROFILES
-- ==========================================

create table profiles (

    id uuid primary key references auth.users(id) on delete cascade,

    full_name text not null,

    role text default 'user',

    preferred_language text default 'en',

    created_at timestamptz default now()

);

-- ==========================================
-- MEETING ROOMS
-- ==========================================

create table meeting_rooms (

    id bigint generated always as identity primary key,

    room_name text not null,

    capacity integer not null default 1,

    location text,

    description text,

    active boolean default true,

    created_at timestamptz default now()

);

-- ==========================================
-- RESERVATIONS
-- ==========================================

create table reservations (

    id bigint generated always as identity primary key,

    room_id bigint references meeting_rooms(id) on delete cascade,

    user_id uuid references profiles(id) on delete cascade,

    title text not null,

    reservation_date date not null,

    start_time time not null,

    end_time time not null,

    notes text,

    status text default 'active',

    created_at timestamptz default now()

);

-- ==========================================
-- REALTIME
-- ==========================================

alter publication supabase_realtime
add table reservations;

alter publication supabase_realtime
add table meeting_rooms;