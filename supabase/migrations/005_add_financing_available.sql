-- Add financing_available field to vehicles
ALTER TABLE vehicles ADD COLUMN financing_available boolean NOT NULL DEFAULT false;
