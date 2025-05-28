import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";

export default abstract class AbstractDataAccess {
  protected db: SQLiteDatabase;
  protected static isFirstTimeCreated: boolean = true;

  constructor() {
    this.db = useSQLiteContext();
  }
}
