-- Schema: get_stuff_done
-- NOTE: Review ON DELETE behavior and adjust if you want CASCADE instead of SET NULL.

------------------------------------------------------------------
-- Create schema
------------------------------------------------------------------
CREATE SCHEMA IF NOT EXISTS get_stuff_done;

------------------------------------------------------------------
-- ENUM types
------------------------------------------------------------------
CREATE TYPE get_stuff_done.gender_enum AS ENUM ('Male', 'Female');

CREATE TYPE get_stuff_done.garment_enum AS ENUM (
  'Shirt',
  'Trousers/Shorts',
  'Skirts',
  'Denim Shirt/Jeans/Skirt',
  'Blouse',
  'Kurta',
  'Pyjama',
  'Ghagra',
  'Choli',
  'Dupatta',
  'Bedsheet',
  'Sari'
);

CREATE TYPE get_stuff_done.order_status_enum AS ENUM (
  'Unconfirmed',
  'Confirmed',
  'Pickup Scheduled',
  'Picked Up',
  'Processing',
  'Ready To Deliver',
  'Delivery Scheduled',
  'Delivered',
  'Unsatisfatory',
  'Closed'
);

------------------------------------------------------------------
-- Tables
------------------------------------------------------------------

-- Customer
CREATE TABLE IF NOT EXISTS get_stuff_done."Customer" (
  rec_id         SERIAL PRIMARY KEY,
  full_name      VARCHAR,
  emailid        VARCHAR,
  mobile_num     INTEGER,
  gender         get_stuff_done.gender_enum,
  birth_date     DATE,
  address        INTEGER
);

-- Unique index (as in model indexes)
CREATE UNIQUE INDEX IF NOT EXISTS idx_get_stuff_done_customer_mobile_num ON get_stuff_done."Customer"(mobile_num);

-- TailoringOrder
CREATE TABLE IF NOT EXISTS get_stuff_done."TailoringOrder" (
  rec_id         SERIAL PRIMARY KEY,
  order_status   get_stuff_done.order_status_enum DEFAULT 'Unconfirmed',
  cust_id        INTEGER REFERENCES get_stuff_done."Customer"(rec_id) ON DELETE SET NULL
);

-- CustomerGarment
CREATE TABLE IF NOT EXISTS get_stuff_done."CustomerGarment" (
  rec_id               SERIAL PRIMARY KEY,
  garment              get_stuff_done.garment_enum,
  garment_gender       get_stuff_done.gender_enum,
  garment_pic          BYTEA NOT NULL,
  ref_garment_included BOOLEAN NOT NULL DEFAULT false,
  ref_garment_pic      BYTEA,
  order_rec_id         INTEGER REFERENCES get_stuff_done."TailoringOrder"(rec_id) ON DELETE SET NULL
);

-- GarmentService (services applied to a garment)
CREATE TABLE IF NOT EXISTS get_stuff_done."GarmentService" (
  rec_id             SERIAL PRIMARY KEY,
  svc_measure_inches NUMERIC(5,2),
  cust_garment_id    INTEGER REFERENCES get_stuff_done."CustomerGarment"(rec_id) ON DELETE CASCADE,
  svc_type           VARCHAR REFERENCES get_stuff_done."TailoringServices"(service_type) ON DELETE SET NULL
);

-- Optional indexes on FKs for performance
CREATE INDEX IF NOT EXISTS idx_get_stuff_done_tailoringorder_cust_id ON get_stuff_done."TailoringOrder"(cust_id);
CREATE INDEX IF NOT EXISTS idx_get_stuff_done_customergarment_order_rec_id ON get_stuff_done."CustomerGarment"(order_rec_id);
CREATE INDEX IF NOT EXISTS idx_get_stuff_done_garmentservice_cust_garment_id ON get_stuff_done."GarmentService"(cust_garment_id);
CREATE INDEX IF NOT EXISTS idx_get_stuff_done_garmentservice_svc_type ON get_stuff_done."GarmentService"(svc_type);
