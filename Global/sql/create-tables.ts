const OtherQueries = "";
const dropTables = `
  -- drop table People;
  -- drop table Providers;
  -- drop table Items;
  -- drop table Customers;
  -- drop table InnerDebts;
  -- drop table OuterDebts;
  -- drop table InnerDebtPayments;
  -- drop table InnerDebtItems;
  -- drop table OuterDebtItems;
  -- drop table OuterDebtPayments;
  `;
const createTables = `
-- Ensure foreign key support is enabled
PRAGMA foreign_keys = ON;
-- Table: People
CREATE TABLE IF NOT EXISTS People (
    PersonId INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    PhoneNumber TEXT UNIQUE
);

-- Table: Providers
CREATE TABLE IF NOT EXISTS Providers (
    ProviderId INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    PhoneNumber TEXT UNIQUE,
    Notes TEXT DEFAULT NULL
);

-- Table: Items
CREATE TABLE IF NOT EXISTS Items (
    ItemId INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Quantity INTEGER NOT NULL,
    Price REAL NOT NULL,
    Notes TEXT DEFAULT NULL,
    ProviderId INTEGER DEFAULT NULL,
    FOREIGN KEY (ProviderId) REFERENCES Providers (ProviderId) ON DELETE CASCADE
);

-- Table: Customers
CREATE TABLE IF NOT EXISTS Customers (
    CustomerId INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    PhoneNumber TEXT UNIQUE,
    Notes TEXT DEFAULT NULL
);

-- Table: InnerDebts
CREATE TABLE IF NOT EXISTS InnerDebts (
    InnerDebtId INTEGER PRIMARY KEY AUTOINCREMENT,
    TotalPrice REAL NOT NULL,
    PricePaid REAL DEFAULT 0,
    Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Notes TEXT DEFAULT NULL,
    PersonId INTEGER NULL,
    CustomerId INTEGER NOT NULL,
    FOREIGN KEY (CustomerId) REFERENCES Customers (CustomerId) ON DELETE CASCADE,
    FOREIGN KEY (PersonId) REFERENCES People (PersonId) ON DELETE CASCADE
);

-- Table: OuterDebts
CREATE TABLE IF NOT EXISTS OuterDebts (
    OuterDebtId INTEGER PRIMARY KEY AUTOINCREMENT,
    TotalPrice REAL NOT NULL,
    PricePaid REAL DEFAULT 0,
    Date TEXT DEFAULT CURRENT_TIMESTAMP,
    Notes TEXT DEFAULT NULL,
    PersonId INTEGER NOT NULL,
    ProviderId INTEGER NOT NULL,
    FOREIGN KEY (ProviderId) REFERENCES Providers (ProviderId) ON DELETE CASCADE,
    FOREIGN KEY (PersonId) REFERENCES People (PersonId) ON DELETE CASCADE
);

-- Table: InnerDebtPayments
CREATE TABLE IF NOT EXISTS InnerDebtPayments (
    InnerDebtPaymentId INTEGER PRIMARY KEY AUTOINCREMENT,
    Amount REAL NOT NULL,
    Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    InnerDebtId INTEGER NOT NULL,
    FOREIGN KEY (InnerDebtId) REFERENCES InnerDebts (InnerDebtId) ON DELETE CASCADE
);

-- Table: InnerDebtItems
CREATE TABLE IF NOT EXISTS InnerDebtItems (
    InnerDebtItemId INTEGER PRIMARY KEY AUTOINCREMENT,
    Quantity INTEGER NOT NULL,
    InnerDebtId INTEGER NOT NULL,
    ItemId INTEGER NOT NULL,
    FOREIGN KEY (InnerDebtId) REFERENCES InnerDebts (InnerDebtId) ON DELETE CASCADE,
    FOREIGN KEY (ItemId) REFERENCES Items (ItemId) ON DELETE CASCADE
);

-- Table: OuterDebtPayments
CREATE TABLE IF NOT EXISTS OuterDebtPayments (
    OuterDebtPaymentId INTEGER PRIMARY KEY AUTOINCREMENT,
    Amount REAL NOT NULL,
    Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    OuterDebtId INTEGER NOT NULL,
    FOREIGN KEY (OuterDebtId) REFERENCES OuterDebts (OuterDebtId) ON DELETE CASCADE
);

-- Table: OuterDebtItems
CREATE TABLE IF NOT EXISTS OuterDebtItems (
    OuterDebtItemId INTEGER PRIMARY KEY AUTOINCREMENT,
    Quantity INTEGER NOT NULL,
    OuterDebtId INTEGER NOT NULL,
    ItemId INTEGER NOT NULL,
    FOREIGN KEY (OuterDebtId) REFERENCES OuterDebts (OuterDebtId) ON DELETE CASCADE,
    FOREIGN KEY (ItemId) REFERENCES Items (ItemId) ON DELETE CASCADE
);
`;
const createTablesQuery = OtherQueries + dropTables + createTables;
export default createTablesQuery;
