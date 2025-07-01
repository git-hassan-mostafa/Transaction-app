import { SQLiteDatabase } from "expo-sqlite";
import SqlTableCreator from "../Helpers/SqlTableCreator";

export default class CreateTablesManager {
  constructor() { }

  async init(db: SQLiteDatabase) {
    // Check if tables already exist before creating them
    const tablesExist = await this.checkTablesExist(db);
    if (!tablesExist) {
      await this.createTables(db);
    } else {
      console.info("Tables already exist, skipping creation");
    }
  }

  private async checkTablesExist(db: SQLiteDatabase): Promise<boolean> {
    try {
      // Check if at least one of our tables exists
      const result = await db.getFirstAsync<{ count: number }>(
        "SELECT COUNT(*) as count FROM sqlite_master WHERE type='table' AND name='Customers'"
      );
      return result?.count > 0;
    } catch (error) {
      console.error("Error checking if tables exist:", error);
      return false;
    }
  }

  private async createTables(db: SQLiteDatabase) {
    try {
      console.info("Creating Tables...");
      const start = new Date().getTime();
      await this.setPragmaForeignKeysOn(db);
      await this.createPeopleTable(db);
      await this.createProvidersTable(db);
      await this.createProductsTable(db);
      await this.createCustomersTable(db);
      await this.createInternalDebtsTable(db);
      await this.createInternalDebtProductsTable(db);
      await this.createInternalDebtPaymentsTable(db);
      await this.createExternalDebtsTable(db);
      await this.createExternalDebtProductsTable(db);
      await this.createExternalDebtPaymentsTable(db);
      const end = new Date().getTime();
      console.info("Tables Created ", "Time taken: ", end - start, "ms");
    } catch (error) {
      console.error("Error creating tables: ", error);
    }
  }

  private async dropTables(db: SQLiteDatabase) {
    try {
      console.info("Droping Tables...");
      const start = new Date().getTime();
      await SqlTableCreator.dropTable(db, "People");
      await SqlTableCreator.dropTable(db, "Providers");
      await SqlTableCreator.dropTable(db, "Products");
      await SqlTableCreator.dropTable(db, "Customers");
      await SqlTableCreator.dropTable(db, "InternalDebts");
      await SqlTableCreator.dropTable(db, "InternalDebtProducts");
      await SqlTableCreator.dropTable(db, "InternalDebtPayments");
      await SqlTableCreator.dropTable(db, "ExternalDebts");
      await SqlTableCreator.dropTable(db, "ExternalDebtProducts");
      await SqlTableCreator.dropTable(db, "ExternalDebtPayments");
      const end = new Date().getTime();
      console.info("Tables Droped ", "Time taken: ", end - start, "ms");
    } catch (error) {
      console.error("Error Dropping Tables", error);
    }
  }

  private async setPragmaForeignKeysOn(db: SQLiteDatabase) {
    await db.execAsync("PRAGMA foreign_keys = ON;");
  }

  private async createPeopleTable(db: SQLiteDatabase) {
    new SqlTableCreator(db)
      .createTable("People")
      .column({
        name: "PersonId",
        type: "INTEGER",
        isPrimaryKey: true,
        isAutoIncrement: true,
        isNullable: false,
      })
      .column({
        name: "Name",
        type: "TEXT",
        isNullable: false,
      })
      .column({
        name: "PhoneNumber",
        type: "TEXT",
        isNullable: false,
        isUnique: true,
      })
      .executeAsync();
  }

  private async createProvidersTable(db: SQLiteDatabase) {
    new SqlTableCreator(db)
      .createTable("Providers")
      .column({
        name: "ProviderId",
        type: "INTEGER",
        isPrimaryKey: true,
        isAutoIncrement: true,
        isNullable: false,
      })
      .column({
        name: "Name",
        type: "TEXT",
        isNullable: false,
      })
      .column({
        name: "PhoneNumber",
        type: "TEXT",
        isNullable: false,
        isUnique: true,
      })
      .column({
        name: "Notes",
        type: "TEXT",
        isNullable: true,
      })
      .executeAsync();
  }

  private async createProductsTable(db: SQLiteDatabase) {
    new SqlTableCreator(db)
      .createTable("Products")
      .column({
        name: "ProductId",
        type: "INTEGER",
        isPrimaryKey: true,
        isAutoIncrement: true,
        isNullable: false,
      })
      .column({
        name: "Name",
        type: "TEXT",
        isNullable: false,
      })
      .column({
        name: "Quantity",
        type: "INTEGER",
        isNullable: false,
      })
      .column({
        name: "Price",
        type: "REAL",
        isNullable: false,
      })
      .column({
        name: "Notes",
        type: "TEXT",
        isNullable: true,
      })
      .column({
        name: "Product_ProviderId",
        type: "INTEGER",
        isNullable: true,
      })
      .foreignKey({
        column: "Product_ProviderId",
        referencesTable: "Providers",
        referencesColumn: "ProviderId",
        onDeleteCascade: true,
      })
      .executeAsync();
  }

  private async createCustomersTable(db: SQLiteDatabase) {
    new SqlTableCreator(db)
      .createTable("Customers")
      .column({
        name: "CustomerId",
        type: "INTEGER",
        isPrimaryKey: true,
        isAutoIncrement: true,
        isNullable: false,
      })
      .column({
        name: "Name",
        type: "TEXT",
        isNullable: false,
      })
      .column({
        name: "PhoneNumber",
        type: "TEXT",
        isNullable: false,
        isUnique: true,
      })
      .column({
        name: "Notes",
        type: "TEXT",
        isNullable: true,
      })
      .executeAsync();
  }

  private async createInternalDebtsTable(db: SQLiteDatabase) {
    new SqlTableCreator(db)
      .createTable("InternalDebts")
      .column({
        name: "InternalDebtId",
        type: "INTEGER",
        isPrimaryKey: true,
        isAutoIncrement: true,
        isNullable: false,
      })
      .column({
        name: "Date",
        type: "TIMESTAMP",
        default: "CURRENT_TIMESTAMP",
      })
      .column({
        name: "Notes",
        type: "TEXT",
        isNullable: true,
      })
      .column({
        name: "InternalDebt_CustomerId",
        type: "INTEGER",
        isNullable: false,
      })
      .column({
        name: "InternalDebt_PersonId",
        type: "INTEGER",
        isNullable: true,
      })
      .foreignKey({
        column: "InternalDebt_CustomerId",
        referencesTable: "Customers",
        referencesColumn: "CustomerId",
        onDeleteCascade: true,
      })
      .foreignKey({
        column: "InternalDebt_PersonId",
        referencesTable: "People",
        referencesColumn: "PersonId",
        onDeleteCascade: true,
      })
      .executeAsync();
  }

  private async createInternalDebtProductsTable(db: SQLiteDatabase) {
    new SqlTableCreator(db)
      .createTable("InternalDebtProducts")
      .column({
        name: "InternalDebtProductId",
        type: "INTEGER",
        isPrimaryKey: true,
        isAutoIncrement: true,
        isNullable: false,
      })
      .column({
        name: "InternalDebtProductQuantity",
        type: "INTEGER",
        isNullable: false,
      })
      .column({
        name: "InternalDebtProduct_InternalDebtId",
        type: "INTEGER",
        isNullable: false,
      })
      .column({
        name: "InternalDebtProduct_ProductId",
        type: "INTEGER",
        isNullable: false,
      })
      .foreignKey({
        column: "InternalDebtProduct_InternalDebtId",
        referencesTable: "InternalDebts",
        referencesColumn: "InternalDebtId",
        onDeleteCascade: true,
      })
      .foreignKey({
        column: "InternalDebtProduct_ProductId",
        referencesTable: "Products",
        referencesColumn: "ProductId",
      })
      .executeAsync();
  }

  private async createInternalDebtPaymentsTable(db: SQLiteDatabase) {
    new SqlTableCreator(db)
      .createTable("InternalDebtPayments")
      .column({
        name: "InternalDebtPaymentId",
        type: "INTEGER",
        isPrimaryKey: true,
        isAutoIncrement: true,
        isNullable: false,
      })
      .column({
        name: "Amount",
        type: "REAL",
        isNullable: false,
      })
      .column({
        name: "Date",
        type: "TIMESTAMP",
        default: "CURRENT_TIMESTAMP",
      })
      .column({
        name: "InternalDebtPayment_InternalDebtId",
        type: "INTEGER",
        isNullable: false,
      })
      .foreignKey({
        column: "InternalDebtPayment_InternalDebtId",
        referencesTable: "InternalDebts",
        referencesColumn: "InternalDebtId",
        onDeleteCascade: true,
      })
      .executeAsync();
  }

  private async createExternalDebtsTable(db: SQLiteDatabase) {
    new SqlTableCreator(db)
      .createTable("ExternalDebts")
      .column({
        name: "ExternalDebtId",
        type: "INTEGER",
        isPrimaryKey: true,
        isAutoIncrement: true,
        isNullable: false,
      })
      .column({
        name: "Date",
        type: "TEXT",
        default: "CURRENT_TIMESTAMP",
      })
      .column({
        name: "Notes",
        type: "TEXT",
        isNullable: true,
      })
      .column({
        name: "ExternalDebt_ProviderId",
        type: "INTEGER",
        isNullable: false,
      })
      .column({
        name: "ExternalDebt_PersonId",
        type: "INTEGER",
        isNullable: false,
      })
      .foreignKey({
        column: "ExternalDebt_ProviderId",
        referencesTable: "Providers",
        referencesColumn: "ProviderId",
        onDeleteCascade: true,
      })
      .foreignKey({
        column: "ExternalDebt_PersonId",
        referencesTable: "People",
        referencesColumn: "PersonId",
        onDeleteCascade: true,
      })
      .executeAsync();
  }

  private async createExternalDebtProductsTable(db: SQLiteDatabase) {
    new SqlTableCreator(db)
      .createTable("ExternalDebtProducts")
      .column({
        name: "ExternalDebtProductId",
        type: "INTEGER",
        isPrimaryKey: true,
        isAutoIncrement: true,
        isNullable: false,
      })
      .column({
        name: "ExternalDebtQuantity",
        type: "INTEGER",
        isNullable: false,
      })
      .column({
        name: "ExternalDebtProduct_ExternalDebtId",
        type: "INTEGER",
        isNullable: false,
      })
      .column({
        name: "ExternalDebtProduct_ProductId",
        type: "INTEGER",
        isNullable: false,
      })
      .foreignKey({
        column: "ExternalDebtProduct_ExternalDebtId",
        referencesTable: "ExternalDebts",
        referencesColumn: "ExternalDebtId",
        onDeleteCascade: true,
      })
      .foreignKey({
        column: "ExternalDebtProduct_ProductId",
        referencesTable: "Products",
        referencesColumn: "ProductId",
        onDeleteCascade: true,
      })
      .executeAsync();
  }

  private async createExternalDebtPaymentsTable(db: SQLiteDatabase) {
    new SqlTableCreator(db)
      .createTable("ExternalDebtPayments")
      .column({
        name: "ExternalDebtPaymentId",
        type: "INTEGER",
        isPrimaryKey: true,
        isAutoIncrement: true,
        isNullable: false,
      })
      .column({
        name: "Amount",
        type: "REAL",
        isNullable: false,
      })
      .column({
        name: "Date",
        type: "TIMESTAMP",
        default: "CURRENT_TIMESTAMP",
      })
      .column({
        name: "ExternalDebtPayment_ExternalDebtId",
        type: "INTEGER",
        isNullable: false,
      })
      .foreignKey({
        column: "ExternalDebtPayment_ExternalDebtId",
        referencesTable: "ExternalDebts",
        referencesColumn: "ExternalDebtId",
        onDeleteCascade: true,
      })
      .executeAsync();
  }
}
