-- Create resumes table
create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  template_id text not null check (template_id in ('classic', 'modern', 'minimal', 'creative', 'executive', 'tech')),
  locale text not null default 'en' check (locale in ('en', 'de', 'es')),
  photo_url text,
  personal_info jsonb default '{}',
  work_experience jsonb default '[]',
  education jsonb default '[]',
  skills jsonb default '[]',
  languages jsonb default '[]',
  certifications jsonb default '[]',
  summary text,
  is_primary boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.resumes enable row level security;

-- RLS policies
create policy "resumes_select_own" on public.resumes for select using (auth.uid() = user_id);
create policy "resumes_insert_own" on public.resumes for insert with check (auth.uid() = user_id);
create policy "resumes_update_own" on public.resumes for update using (auth.uid() = user_id);
create policy "resumes_delete_own" on public.resumes for delete using (auth.uid() = user_id);

-- Index for faster queries
create index idx_resumes_user_id on public.resumes(user_id);
create index idx_resumes_created_at on public.resumes(created_at desc);
