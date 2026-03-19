-- Create vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  brand text NOT NULL,
  model text NOT NULL,
  version text,
  year integer NOT NULL,
  mileage integer NOT NULL DEFAULT 0,
  price_usd numeric(10,2) NOT NULL,
  fuel_type text NOT NULL CHECK (fuel_type IN ('nafta', 'diesel', 'eléctrico', 'híbrido')),
  transmission text NOT NULL CHECK (transmission IN ('manual', 'automático', 'CVT')),
  vehicle_type text NOT NULL CHECK (vehicle_type IN ('usado', '0km', 'moto', 'next-gen')),
  description text,
  is_featured boolean DEFAULT false,
  is_new_arrival boolean DEFAULT false,
  is_sold boolean DEFAULT false,
  images jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX idx_vehicles_slug ON vehicles (slug);
CREATE INDEX idx_vehicles_type ON vehicles (vehicle_type);
CREATE INDEX idx_vehicles_brand ON vehicles (brand);
CREATE INDEX idx_vehicles_is_sold ON vehicles (is_sold);
CREATE INDEX idx_vehicles_is_featured ON vehicles (is_featured);
CREATE INDEX idx_vehicles_created_at ON vehicles (created_at DESC);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_vehicles_updated_at
  BEFORE UPDATE ON vehicles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
