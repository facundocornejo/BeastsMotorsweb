-- =============================================
-- Row Level Security Policies
-- =============================================

-- VEHICLES
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view non-sold vehicles"
  ON vehicles FOR SELECT
  TO anon
  USING (is_sold = false);

CREATE POLICY "Authenticated can view all vehicles"
  ON vehicles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert vehicles"
  ON vehicles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update vehicles"
  ON vehicles FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can delete vehicles"
  ON vehicles FOR DELETE
  TO authenticated
  USING (true);

-- HAPPY SALES
ALTER TABLE happy_sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view happy sales"
  ON happy_sales FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated can view all happy sales"
  ON happy_sales FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert happy sales"
  ON happy_sales FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update happy sales"
  ON happy_sales FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can delete happy sales"
  ON happy_sales FOR DELETE
  TO authenticated
  USING (true);

-- SITE CONFIG
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read site config"
  ON site_config FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated can read site config"
  ON site_config FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can update site config"
  ON site_config FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert site config"
  ON site_config FOR INSERT
  TO authenticated
  WITH CHECK (true);
