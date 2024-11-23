import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import createTablesQuery from "../sql/create-tables";

export default class AbstractManager {
  protected db: SQLiteDatabase;
  constructor() {
    this.db = useSQLiteContext();
    this.createSqlTables()
      .then(() => {
        console.info("tables creation");
      })
      .catch((error) => {
        console.error("an error occurred ", error);
      });
  }

  private async createSqlTables() {
    await this.db.execAsync(createTablesQuery);
  }
}
