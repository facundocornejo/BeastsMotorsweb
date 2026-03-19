-- Create site_config table
CREATE TABLE IF NOT EXISTS site_config (
  key text PRIMARY KEY,
  value text NOT NULL
);

-- Insert default values
INSERT INTO site_config (key, value) VALUES
  ('whatsapp_number', ''),
  ('address', 'Paraná, Entre Ríos, Argentina'),
  ('phone', ''),
  ('email', ''),
  ('instagram_url', ''),
  ('facebook_url', ''),
  ('business_hours', 'Lun a Vie 9:00 - 18:00, Sáb 9:00 - 13:00')
ON CONFLICT (key) DO NOTHING;
