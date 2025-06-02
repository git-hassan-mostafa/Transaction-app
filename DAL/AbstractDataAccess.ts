import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";

export default abstract class AbstractDataAccess {
  protected db: SQLiteDatabase;

  constructor() {
    this.db = useSQLiteContext();
  }
}
