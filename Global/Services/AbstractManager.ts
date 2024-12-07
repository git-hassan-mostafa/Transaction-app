import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import createTablesQuery from "../sql/create-tables";

export default abstract class AbstractManager {
  protected db: SQLiteDatabase;
  constructor() {
    this.db = useSQLiteContext();
    this.createSqlTables().then(() => {
      console.info("tables created");
    });
  }

  private async createSqlTables() {
    try {
      await this.db.execAsync(createTablesQuery);
    } catch (error) {
      console.error("an error occurred while create table", error);
    }
  }
}
