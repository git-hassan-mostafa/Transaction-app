import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import SqlTableCreator from "../Global/Helpers/SqlTableCreator";

export default class CreateTablesManager {
  constructor() {}

  async init(db: SQLiteDatabase) {
    await this.dropTables(db);
    await this.createTables(db);
  }

  private async createTables(db: SQLiteDatabase) {
    try {
      console.log("Creating Tables...");
      const start = new Date().getTime();
      await this.createPeopleTable(db);
      await this.createProvidersTable(db);
      await this.createItemsTable(db);
      await this.createCustomersTable(db);
      await this.createInnerDebtsTable(db);
      await this.createInnerDebtItemsTable(db);
      await this.createInnerDebtPaymentsTable(db);
      await this.createOuterDebtsTable(db);
      await this.createOuterDebtItemsTable(db);
      await this.createOuterDebtPaymentsTable(db);
      const end = new Date().getTime();
      console.log("Tables Created ", "Time taken: ", end - start, "ms");
    } catch (error) {
      console.error("Error creating tables: ", error);
    }
  }

  private async dropTables(db: SQLiteDatabase) {
    try {
      //   console.log("Droping Tables...");
      //   const start = new Date().getTime();
      //   await SqlTableCreator.dropTable(db, "People");
      //   await SqlTableCreator.dropTable(db, "Providers");
      //   await SqlTableCreator.dropTable(db, "Items");
      //   await SqlTableCreator.dropTable(db, "Customers");
      //   await SqlTableCreator.dropTable(db, "InnerDebts");
      //   await SqlTableCreator.dropTable(db, "InnerDebtItems");
      //   await SqlTableCreator.dropTable(db, "InnerDebtPayments");
      //   await SqlTableCreator.dropTable(db, "OuterDebts");
      //   await SqlTableCreator.dropTable(db, "OuterDebtItems");
      //   await SqlTableCreator.dropTable(db, "OuterDebtPayments");
      //   const end = new Date().getTime();
      //   console.log("Tables Droped ", "Time taken: ", end - start, "ms");
    } catch (error) {}
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

  private async createItemsTable(db: SQLiteDatabase) {
    new SqlTableCreator(db)
      .createTable("Items")
      .column({
        name: "ItemId",
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
        name: "Item_ProviderId",
        type: "INTEGER",
        isNullable: true,
      })
      .foreignKey({
        column: "Item_ProviderId",
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

  private async createInnerDebtsTable(db: SQLiteDatabase) {
    new SqlTableCreator(db)
      .createTable("InnerDebts")
      .column({
        name: "InnerDebtId",
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
        name: "InnerDebt_CustomerId",
        type: "INTEGER",
        isNullable: false,
      })
      .column({
        name: "InnerDebt_PersonId",
        type: "INTEGER",
        isNullable: true,
      })
      .foreignKey({
        column: "InnerDebt_CustomerId",
        referencesTable: "Customers",
        referencesColumn: "CustomerId",
        onDeleteCascade: true,
      })
      .foreignKey({
        column: "InnerDebt_PersonId",
        referencesTable: "People",
        referencesColumn: "PersonId",
        onDeleteCascade: true,
      })
      .executeAsync();
  }

  private async createInnerDebtItemsTable(db: SQLiteDatabase) {
    new SqlTableCreator(db)
      .createTable("InnerDebtItems")
      .column({
        name: "InnerDebtItemId",
        type: "INTEGER",
        isPrimaryKey: true,
        isAutoIncrement: true,
        isNullable: false,
      })
      .column({
        name: "InnerDebtItemQuantity",
        type: "INTEGER",
        isNullable: false,
      })
      .column({
        name: "InnerDebtItem_InnerDebtId",
        type: "INTEGER",
        isNullable: false,
      })
      .column({
        name: "InnerDebtItem_ItemId",
        type: "INTEGER",
        isNullable: false,
      })
      .foreignKey({
        column: "InnerDebtItem_InnerDebtId",
        referencesTable: "InnerDebts",
        referencesColumn: "InnerDebtId",
        onDeleteCascade: true,
      })
      .foreignKey({
        column: "InnerDebtItem_ItemId",
        referencesTable: "Items",
        referencesColumn: "ItemId",
        onDeleteCascade: true,
      })
      .executeAsync();
  }

  private async createInnerDebtPaymentsTable(db: SQLiteDatabase) {
    new SqlTableCreator(db)
      .createTable("InnerDebtPayments")
      .column({
        name: "InnerDebtPaymentId",
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
        name: "InnerDebtPayment_InnerDebtId",
        type: "INTEGER",
        isNullable: false,
      })
      .foreignKey({
        column: "InnerDebtPayment_InnerDebtId",
        referencesTable: "InnerDebts",
        referencesColumn: "InnerDebtId",
        onDeleteCascade: true,
      })
      .executeAsync();
  }

  private async createOuterDebtsTable(db: SQLiteDatabase) {
    new SqlTableCreator(db)
      .createTable("OuterDebts")
      .column({
        name: "OuterDebtId",
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
        name: "OuterDebt_ProviderId",
        type: "INTEGER",
        isNullable: false,
      })
      .column({
        name: "OuterDebt_PersonId",
        type: "INTEGER",
        isNullable: false,
      })
      .foreignKey({
        column: "OuterDebt_ProviderId",
        referencesTable: "Providers",
        referencesColumn: "ProviderId",
        onDeleteCascade: true,
      })
      .foreignKey({
        column: "OuterDebt_PersonId",
        referencesTable: "People",
        referencesColumn: "PersonId",
        onDeleteCascade: true,
      })
      .executeAsync();
  }

  private async createOuterDebtItemsTable(db: SQLiteDatabase) {
    new SqlTableCreator(db)
      .createTable("OuterDebtItems")
      .column({
        name: "OuterDebtItemId",
        type: "INTEGER",
        isPrimaryKey: true,
        isAutoIncrement: true,
        isNullable: false,
      })
      .column({
        name: "OuterDebtQuantity",
        type: "INTEGER",
        isNullable: false,
      })
      .column({
        name: "OuterDebtItem_OuterDebtId",
        type: "INTEGER",
        isNullable: false,
      })
      .column({
        name: "OuterDebtItem_ItemId",
        type: "INTEGER",
        isNullable: false,
      })
      .foreignKey({
        column: "OuterDebtItem_OuterDebtId",
        referencesTable: "OuterDebts",
        referencesColumn: "OuterDebtId",
        onDeleteCascade: true,
      })
      .foreignKey({
        column: "OuterDebtItem_ItemId",
        referencesTable: "Items",
        referencesColumn: "ItemId",
        onDeleteCascade: true,
      })
      .executeAsync();
  }

  private async createOuterDebtPaymentsTable(db: SQLiteDatabase) {
    new SqlTableCreator(db)
      .createTable("OuterDebtPayments")
      .column({
        name: "OuterDebtPaymentId",
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
        name: "OuterDebtPayment_OuterDebtId",
        type: "INTEGER",
        isNullable: false,
      })
      .foreignKey({
        column: "OuterDebtPayment_OuterDebtId",
        referencesTable: "OuterDebts",
        referencesColumn: "OuterDebtId",
        onDeleteCascade: true,
      })
      .executeAsync();
  }
}
