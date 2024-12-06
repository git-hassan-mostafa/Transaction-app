import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";

export default class SqlBuilder<T> {
  private tableName: string;
  private db: SQLiteDatabase;
  private type!: "select" | "update";
  private getQuery: string = "select * from {0} {1} {2}";
  private updateQuery: string = "update {0} set {1} {2}";

  constructor(db: SQLiteDatabase, tableName: string) {
    this.db = db;
    this.tableName = tableName;
  }

  select(values: string[] = []) {
    this.type = "select";
    if (values.length === 0) return this;
    this.getQuery = this.getQuery.replace("*", values.join(" , "));
    return this;
  }

  async insert(value: T) {
    try {
      if (!value) return false;
      var query = `insert into ${this.tableName} (${Object.keys(value).join(
        " , "
      )})
               values (${Object.values(value)
                 .map((value) => {
                   if (typeof value === "string") {
                     return `'${value}'`;
                   }
                   if (typeof value === "object" || Array.isArray(value)) {
                     return `'${JSON.stringify(value)}'`;
                   }
                   return value;
                 })
                 .join(" , ")})`;
      await this.db.execAsync(query);
    } catch (error) {
      console.error("an error occurred", error);
    }
  }

  update(value: T) {
    if (!value) return this;
    this.type = "update";
    const query = `${Object.entries(value)
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `${key} = '${value}'`;
        }
        return `${key} = ${value}`;
      })
      .join(" , ")}`;
    this.updateQuery = this.updateQuery.replace("{1}", query);
    return this;
  }

  where(value: T) {
    if (!value) {
      this.getQuery = this.getQuery.replace("{1}", "");
      this.updateQuery = this.updateQuery.replace("{2}", "");
      return this;
    }
    var query = `where ${Object.entries(value)
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `${key} = '${value}'`;
        }
        return `${key} = ${value}`;
      })
      .join(" and ")}`;
    this.getQuery = this.getQuery.replace("{1}", query);
    this.updateQuery = this.updateQuery.replace("{2}", query);
    return this;
  }

  orderBy(value: string) {
    if (!value) {
      this.getQuery = this.getQuery.replace("{2}", "");
      return this;
    }
    this.getQuery = this.getQuery.replace("{2}", `order by ${value}`);
    return this;
  }

  async executeAsync() {
    if (this.type == "select") {
      this.getQuery = this.getQuery.replace("{1}", "");
      this.getQuery = this.getQuery.replace("{2}", "");
      this.getQuery = this.getQuery.replace("{0}", this.tableName);
      const result = await this.db.getAllAsync<T>(this.getQuery);
      return result;
    }
    if (this.type == "update") {
      this.updateQuery = this.updateQuery.replace("{2}", "");
      this.updateQuery = this.updateQuery.replace("{0}", this.tableName);
      const result = await this.db.execAsync(this.updateQuery);
      return [];
    }
    return [];
  }
}
