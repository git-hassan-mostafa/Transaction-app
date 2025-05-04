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
    Item_ProviderId INTEGER DEFAULT NULL,
    FOREIGN KEY (Item_ProviderId) REFERENCES Providers (ProviderId) ON DELETE CASCADE
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
    Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Notes TEXT DEFAULT NULL,
    InnerDebt_CustomerId INTEGER NOT NULL,
    InnerDebt_PersonId INTEGER NULL,
    FOREIGN KEY (InnerDebt_CustomerId) REFERENCES Customers (CustomerId) ON DELETE CASCADE,
    FOREIGN KEY (InnerDebt_PersonId) REFERENCES People (PersonId) ON DELETE CASCADE
);

-- Table: OuterDebts
CREATE TABLE IF NOT EXISTS OuterDebts (
    OuterDebtId INTEGER PRIMARY KEY AUTOINCREMENT,
    Date TEXT DEFAULT CURRENT_TIMESTAMP,
    Notes TEXT DEFAULT NULL,
    OuterDebt_ProviderId INTEGER NOT NULL,
    OuterDebt_PersonId INTEGER NOT NULL,
    FOREIGN KEY (OuterDebt_ProviderId) REFERENCES Providers (ProviderId) ON DELETE CASCADE,
    FOREIGN KEY (OuterDebt_PersonId) REFERENCES People (PersonId) ON DELETE CASCADE
);

-- Table: InnerDebtPayments
CREATE TABLE IF NOT EXISTS InnerDebtPayments (
    InnerDebtPaymentId INTEGER PRIMARY KEY AUTOINCREMENT,
    Amount REAL NOT NULL,
    Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    InnerDebtPayment_InnerDebtId INTEGER NOT NULL,
    FOREIGN KEY (InnerDebtPayment_InnerDebtId) REFERENCES InnerDebts (InnerDebtId) ON DELETE CASCADE
);

-- Table: InnerDebtItems
CREATE TABLE IF NOT EXISTS InnerDebtItems (
    InnerDebtItemId INTEGER PRIMARY KEY AUTOINCREMENT,
    InnerDebtItemQuantity INTEGER NOT NULL,
    InnerDebtItem_InnerDebtId INTEGER NOT NULL,
    InnerDebtItem_ItemId INTEGER NOT NULL,
    FOREIGN KEY (InnerDebtItem_InnerDebtId) REFERENCES InnerDebts (InnerDebtId) ON DELETE CASCADE,
    FOREIGN KEY (InnerDebtItem_ItemId) REFERENCES Items (ItemId) ON DELETE CASCADE
);

-- Table: OuterDebtPayments
CREATE TABLE IF NOT EXISTS OuterDebtPayments (
    OuterDebtPaymentId INTEGER PRIMARY KEY AUTOINCREMENT,
    Amount REAL NOT NULL,
    Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    OuterDebtPayment_OuterDebtId INTEGER NOT NULL,
    FOREIGN KEY (OuterDebtPayment_OuterDebtId) REFERENCES OuterDebts (OuterDebtId) ON DELETE CASCADE
);

-- Table: OuterDebtItems
CREATE TABLE IF NOT EXISTS OuterDebtItems (
    OuterDebtItemId INTEGER PRIMARY KEY AUTOINCREMENT,
    OuterDebtQuantity INTEGER NOT NULL,
    OuterDebtItem_OuterDebtId INTEGER NOT NULL,
    OuterDebtItem_ItemId INTEGER NOT NULL,
    FOREIGN KEY (OuterDebtItem_OuterDebtId) REFERENCES OuterDebts (OuterDebtId) ON DELETE CASCADE,
    FOREIGN KEY (OuterDebtItem_ItemId) REFERENCES Items (ItemId) ON DELETE CASCADE
);
`;
const createTablesQuery = OtherQueries + dropTables + createTables;
export default createTablesQuery;
