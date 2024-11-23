const createTablesQuery = `
-- Table: People
CREATE TABLE IF NOT EXISTS People (
    id SERIAL PRIMARY KEY, -- Auto-incrementing ID
    name VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(20) UNIQUE
);

-- Table: Providers
CREATE TABLE IF NOT EXISTS Providers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    borrowedPrice DECIMAL(10, 2) NOT NULL,
    payedPrice DECIMAL(10, 2) NOT NULL,
    phoneNumber VARCHAR(20) UNIQUE,
    itemsList JSON DEFAULT NULL -- For lists of items, consider normalizing if needed
);

-- Table: Items
CREATE TABLE IF NOT EXISTS Items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    providerId INT NOT NULL,
    FOREIGN KEY (providerId) REFERENCES Providers (id) ON DELETE CASCADE -- Ensures integrity
);

-- Table: Customers
CREATE TABLE IF NOT EXISTS Customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    borrowedPrice DECIMAL(10, 2) NOT NULL,
    payedPrice DECIMAL(10, 2) NOT NULL,
    phoneNumber VARCHAR(20) UNIQUE,
    borrowList JSON DEFAULT NULL -- JSON for list of borrow details
);

-- Table: InnerDebts
CREATE TABLE IF NOT EXISTS InnerDebts (
    id SERIAL PRIMARY KEY,
    customerId VARCHAR(255) NOT NULL,
    items_list JSON DEFAULT NULL, -- List of items as JSON
    total_price DECIMAL(10, 2) NOT NULL,
    payments_list JSON DEFAULT NULL, -- History of payments
    price_paid DECIMAL(10, 2) DEFAULT 0,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    personId INT NOT NULL,
    FOREIGN KEY (customerId) REFERENCES Customers (id) ON DELETE CASCADE,
    FOREIGN KEY (personId) REFERENCES People (id) ON DELETE CASCADE
);

-- Table: OuterDebts
CREATE TABLE IF NOT EXISTS OuterDebts (
    id SERIAL PRIMARY KEY,
    providerId INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    itemsList JSON DEFAULT NULL, -- List of items involved
    paymentsList JSON DEFAULT NULL, -- History of payments
    personId INT NOT NULL,
    FOREIGN KEY (providerId) REFERENCES Providers (id) ON DELETE CASCADE,
    FOREIGN KEY (personId) REFERENCES People (id) ON DELETE CASCADE
);
`;

export default createTablesQuery;
