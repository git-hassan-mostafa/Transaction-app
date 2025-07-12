-- drop table if exists internaldebtproducts;
-- drop table  if exists  internaldebtpayments;
-- drop table  if exists  internalDebts;
-- drop table  if exists  externaldebtproducts;
-- drop table  if exists  externaldebtpayments;
-- drop table  if exists  externaldebts;
-- drop table  if exists  products;
-- drop table  if exists  people;
-- drop table  if exists  providers;
-- drop table  if exists  customers;


-- Customers
CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phonenumber TEXT NOT NULL UNIQUE,
  notes TEXT
);

-- Providers
CREATE TABLE IF NOT EXISTS providers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phonenumber TEXT NOT NULL UNIQUE,
  notes TEXT
);

-- People
CREATE TABLE IF NOT EXISTS people (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phonenumber TEXT NOT NULL UNIQUE
);



-- Products
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price NUMERIC NOT NULL,
  notes TEXT,
  providerid INTEGER REFERENCES providers(id) ON DELETE CASCADE
);


-- InternalDebts
CREATE TABLE IF NOT EXISTS internaldebts (
  id SERIAL PRIMARY KEY,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  customerid INTEGER NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  personid INTEGER REFERENCES people(id) ON DELETE CASCADE
);

-- InternalDebtProducts
CREATE TABLE IF NOT EXISTS internaldebtproducts (
  id SERIAL PRIMARY KEY,
  quantity INTEGER NOT NULL,
  internaldebtid INTEGER NOT NULL REFERENCES internaldebts(id) ON DELETE CASCADE,
  productid INTEGER NOT NULL REFERENCES products(id)
);

-- InternalDebtPayments
CREATE TABLE IF NOT EXISTS internaldebtpayments (
  id SERIAL PRIMARY KEY,
  amount NUMERIC NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  internaldebtid INTEGER NOT NULL REFERENCES internaldebts(id) ON DELETE CASCADE
);


-- ExternalDebts
CREATE TABLE IF NOT EXISTS externaldebts (
  id SERIAL PRIMARY KEY,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  providerid INTEGER NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  personid INTEGER NOT NULL REFERENCES people(id) ON DELETE CASCADE
);

-- ExternalDebtProducts
CREATE TABLE IF NOT EXISTS externaldebtproducts (
  id SERIAL PRIMARY KEY,
  quantity INTEGER NOT NULL,
  externaldebtid INTEGER NOT NULL REFERENCES externaldebts(id) ON DELETE CASCADE,
  productid INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE
);

-- ExternalDebtPayments
CREATE TABLE IF NOT EXISTS externaldebtpayments (
  id SERIAL PRIMARY KEY,
  amount NUMERIC NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  externaldebtid INTEGER NOT NULL REFERENCES externaldebts(id) ON DELETE CASCADE
);

ALTER TABLE people DISABLE ROW LEVEL SECURITY;
ALTER TABLE providers DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE internaldebts DISABLE ROW LEVEL SECURITY;
ALTER TABLE internaldebtproducts DISABLE ROW LEVEL SECURITY;
ALTER TABLE internaldebtpayments DISABLE ROW LEVEL SECURITY;
ALTER TABLE externaldebts DISABLE ROW LEVEL SECURITY;
ALTER TABLE externaldebtproducts DISABLE ROW LEVEL SECURITY;
ALTER TABLE externaldebtpayments DISABLE ROW LEVEL SECURITY;
