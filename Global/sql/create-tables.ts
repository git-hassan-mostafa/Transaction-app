const OtherQueries = "";
const dropTables = `
  -- drop table People;
  -- drop table Providers;
  -- drop table Items;
  -- drop table Customers;
  -- drop table InnerDebts;
  -- drop table OuterDebts;
  `;
const createTables = `
-- Ensure foreign key support is enabled
PRAGMA foreign_keys = ON;
-- Table: People
CREATE TABLE IF NOT EXISTS People (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    PhoneNumber TEXT UNIQUE
);

-- Table: Providers
CREATE TABLE IF NOT EXISTS Providers (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    BorrowedPrice REAL NOT NULL,
    PayedPrice REAL NOT NULL,
    PhoneNumber TEXT UNIQUE,
    Notes TEXT DEFAULT NULL
);

-- Table: Items
CREATE TABLE IF NOT EXISTS Items (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Quantity INTEGER NOT NULL,
    Price REAL NOT NULL,
    Notes TEXT DEFAULT NULL,
    ProviderId INTEGER DEFAULT NULL,
    FOREIGN KEY (ProviderId) REFERENCES Providers (Id) ON DELETE CASCADE
);

-- Table: Customers
CREATE TABLE IF NOT EXISTS Customers (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    BorrowedPrice REAL NOT NULL,
    PayedPrice REAL NOT NULL,
    PhoneNumber TEXT UNIQUE,
    Notes TEXT DEFAULT NULL
);

-- Table: InnerDebts
CREATE TABLE IF NOT EXISTS InnerDebts (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    TotalPrice REAL NOT NULL,
    PricePaid REAL DEFAULT 0,
    PaymentsList TEXT DEFAULT NULL,
    ItemsList TEXT DEFAULT NULL,
    Date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Notes TEXT DEFAULT NULL,
    PersonId INTEGER NULL,
    CustomerId INTEGER NOT NULL,
    FOREIGN KEY (CustomerId) REFERENCES Customers (Id) ON DELETE CASCADE,
    FOREIGN KEY (PersonId) REFERENCES People (Id) ON DELETE CASCADE
);

-- Table: OuterDebts
CREATE TABLE IF NOT EXISTS OuterDebts (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    TotalPrice REAL NOT NULL,
    PricePaid REAL DEFAULT 0,
    PaymentsList TEXT DEFAULT NULL,
    ItemsList TEXT DEFAULT NULL,
    Date TEXT DEFAULT CURRENT_TIMESTAMP,
    Notes TEXT DEFAULT NULL,
    PersonId INTEGER NOT NULL,
    ProviderId INTEGER NOT NULL,
    FOREIGN KEY (ProviderId) REFERENCES Providers (Id) ON DELETE CASCADE,
    FOREIGN KEY (PersonId) REFERENCES People (Id) ON DELETE CASCADE
);
`;
const createTablesQuery = OtherQueries + dropTables + createTables;
export default createTablesQuery;
