import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import createTablesQuery from "../sql/create-tables";

export default abstract class AbstractManager {
  protected db: SQLiteDatabase;
  protected static isFirstTimeCreated: boolean = true;

  constructor() {
    this.db = useSQLiteContext();
    this.initialize();
  }

  private initialize() {
    if (AbstractManager.isFirstTimeCreated) {
      this.createSqlTables().then(() => {
        console.info("tables created");
      });
      AbstractManager.isFirstTimeCreated = false;
    }
  }

  private async createSqlTables() {
    try {
      await this.db.execAsync(createTablesQuery);
    } catch (error) {
      console.error("an error occurred while create table", error);
    }
  }
}
