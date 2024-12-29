const OtherQueries = "";
//  +
//  `
// INSERT INTO InnerDebts (
//     totalPrice,
//     pricePaid,
//     paymentsList,
//     itemsList,
//     date,
//     personId,
//     customerId
// ) VALUES (
//     20.0,               -- totalPrice
//     10.0,               -- pricePaid
//     '[]',               -- paymentsList as an empty JSON array
//     '[]',               -- itemsList as an empty JSON array
//     CURRENT_TIMESTAMP,  -- date, defaults to the current timestamp
//     1,                  -- personId
//     1                   -- customerId
// );
// `
// ;
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
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phoneNumber TEXT UNIQUE
);

-- Table: Providers
CREATE TABLE IF NOT EXISTS Providers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    borrowedPrice REAL NOT NULL,
    payedPrice REAL NOT NULL,
    phoneNumber TEXT UNIQUE,
    itemsList TEXT DEFAULT NULL
);

-- Table: Items
CREATE TABLE IF NOT EXISTS Items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    providerId INTEGER NOT NULL,
    FOREIGN KEY (providerId) REFERENCES Providers (id) ON DELETE CASCADE
);

-- Table: Customers
CREATE TABLE IF NOT EXISTS Customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    borrowedPrice REAL NOT NULL,
    payedPrice REAL NOT NULL,
    phoneNumber TEXT UNIQUE,
    borrowList TEXT DEFAULT NULL
);

-- Table: InnerDebts
CREATE TABLE IF NOT EXISTS InnerDebts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    totalPrice REAL NOT NULL,
    pricePaid REAL DEFAULT 0,
    paymentsList TEXT DEFAULT NULL,
    itemsList TEXT DEFAULT NULL,
    date TEXT DEFAULT CURRENT_TIMESTAMP,
    personId INTEGER NOT NULL,
    customerId INTEGER NOT NULL,
    FOREIGN KEY (customerId) REFERENCES Customers (id) ON DELETE CASCADE,
    FOREIGN KEY (personId) REFERENCES People (id) ON DELETE CASCADE
);

-- Table: OuterDebts
CREATE TABLE IF NOT EXISTS OuterDebts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    totalPrice REAL NOT NULL,
    pricePaid REAL DEFAULT 0,
    paymentsList TEXT DEFAULT NULL,
    itemsList TEXT DEFAULT NULL,
    date TEXT DEFAULT CURRENT_TIMESTAMP,
    personId INTEGER NOT NULL,
    providerId INTEGER NOT NULL,
    FOREIGN KEY (providerId) REFERENCES Providers (id) ON DELETE CASCADE,
    FOREIGN KEY (personId) REFERENCES People (id) ON DELETE CASCADE
);
`;
const createTablesQuery = OtherQueries + dropTables + createTables;
export default createTablesQuery;
