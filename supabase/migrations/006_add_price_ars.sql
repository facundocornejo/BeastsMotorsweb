-- Add ARS price field and make USD price optional
ALTER TABLE vehicles ALTER COLUMN price_usd DROP NOT NULL;
ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS price_ars numeric(14,0);
