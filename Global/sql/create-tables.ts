const createTablesQuery = `
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
    customerId INTEGER NOT NULL,
    items_list TEXT DEFAULT NULL,
    total_price REAL NOT NULL,
    payments_list TEXT DEFAULT NULL,
    price_paid REAL DEFAULT 0,
    date TEXT DEFAULT CURRENT_TIMESTAMP,
    personId INTEGER NOT NULL,
    FOREIGN KEY (customerId) REFERENCES Customers (id) ON DELETE CASCADE,
    FOREIGN KEY (personId) REFERENCES People (id) ON DELETE CASCADE
);

-- Table: OuterDebts
CREATE TABLE IF NOT EXISTS OuterDebts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    providerId INTEGER NOT NULL,
    price REAL NOT NULL,
    date TEXT DEFAULT CURRENT_TIMESTAMP,
    itemsList TEXT DEFAULT NULL,
    paymentsList TEXT DEFAULT NULL,
    personId INTEGER NOT NULL,
    FOREIGN KEY (providerId) REFERENCES Providers (id) ON DELETE CASCADE,
    FOREIGN KEY (personId) REFERENCES People (id) ON DELETE CASCADE
);
`;

export default createTablesQuery;
