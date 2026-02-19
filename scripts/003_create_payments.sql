-- Create payments table for tracking transactions
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  stripe_session_id text,
  stripe_payment_intent_id text,
  stripe_subscription_id text,
  amount_cents integer not null,
  currency text not null check (currency in ('eur', 'usd')),
  payment_type text not null check (payment_type in ('one_time', 'subscription')),
  status text default 'pending' check (status in ('pending', 'succeeded', 'failed', 'canceled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.payments enable row level security;

-- RLS policies
create policy "payments_select_own" on public.payments for select using (auth.uid() = user_id);
create policy "payments_insert_own" on public.payments for insert with check (auth.uid() = user_id);
create policy "payments_update_own" on public.payments for update using (auth.uid() = user_id);

-- Indexes
create index idx_payments_user_id on public.payments(user_id);
create index idx_payments_stripe_session on public.payments(stripe_session_id);
create index idx_payments_stripe_intent on public.payments(stripe_payment_intent_id);
create index idx_payments_created_at on public.payments(created_at desc);
