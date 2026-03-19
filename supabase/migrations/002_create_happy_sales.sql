-- Create happy_sales table
CREATE TABLE IF NOT EXISTS happy_sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_title text NOT NULL,
  images jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);
