create extension if not exists pgcrypto;

create type public.profile_role as enum ('member', 'moderator', 'admin');
create type public.submission_status as enum ('pending', 'in_review', 'approved', 'rejected');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role public.profile_role not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contribution_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  kind text not null check (kind in ('topic', 'experience', 'nomination', 'correction')),
  name text not null check (char_length(name) between 1 and 80),
  message text not null check (char_length(message) between 10 and 2000),
  status public.submission_status not null default 'pending',
  moderator_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.contribution_submissions enable row level security;

create or replace function public.current_profile_role()
returns public.profile_role language sql stable security definer set search_path = public
as $$ select role from public.profiles where id = auth.uid(); $$;

revoke all on function public.current_profile_role() from public;
grant execute on function public.current_profile_role() to authenticated;

create policy "Users can read their own profile"
on public.profiles for select to authenticated
using ((select auth.uid()) = id);

create policy "Users can update their own display name"
on public.profiles for update to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id and role = public.current_profile_role());

create policy "Users can create submissions"
on public.contribution_submissions for insert to authenticated
with check ((select auth.uid()) = user_id and status = 'pending');

create policy "Users can read their own submissions"
on public.contribution_submissions for select to authenticated
using ((select auth.uid()) = user_id);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name) values (new.id, null);
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.is_moderator()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'moderator')); $$;

create policy "Moderators can review submissions"
on public.contribution_submissions for update to authenticated
using (public.is_moderator())
with check (public.is_moderator());

revoke all on public.profiles, public.contribution_submissions from anon;
grant select, update on public.profiles to authenticated;
grant select, insert, update on public.contribution_submissions to authenticated;
