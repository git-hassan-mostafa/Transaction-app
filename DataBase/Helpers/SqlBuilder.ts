import tableDetails from "@/Shared/Constants/ColumnsDetails";
import { SQLiteDatabase } from "expo-sqlite";

export default class SqlBuilder<T extends Record<string, any>> {
  private tableName: string;
  private db: SQLiteDatabase;
  private type!: "select" | "update";
  private getQuery: string =
    "select * from @table @joinQuery @whereQuery @orderByQuery";
  private updateQuery: string = "update @table set @updatedQuery @whereQuery";
  private deleteQuery: string = "delete from @table @whereQuery";
  private joinQuery: string = "";

  constructor(db: SQLiteDatabase, tableName: string) {
    this.db = db;
    this.tableName = tableName;
  }

  select(values: string[] = ["*"]) {
    this.type = "select";
    if (values.length === 0) return this;
    this.getQuery = this.getQuery.replace("*", values.join(" , "));
    return this;
  }

  async insert(value: Partial<T>) {
    try {
      if (!value) return null;
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
                   if (value === null || value === undefined) {
                     return "NULL";
                   }
                   return value;
                 })
                 .join(" , ")}) RETURNING *`;
      const result = await this.db.runAsync(query);
      return result;
    } catch (error) {
      console.error("an error occurred in insert", error);
      return null;
    }
  }

  async insertAll(values: Partial<T>[]) {
    try {
      if (!values || values.length === 0) return false;

      const columns = Object.keys(values[0]).join(" , ");
      const valuesList = values
        .map(
          (value) =>
            `(${Object.values(value)
              .map((val) => {
                if (typeof val === "string") {
                  return `'${val}'`;
                }
                if (typeof val === "object" || Array.isArray(val)) {
                  return `'${JSON.stringify(val)}'`;
                }
                if (val === null || val === undefined) {
                  return "NULL";
                }
                return val;
              })
              .join(" , ")})`
        )
        .join(" , ");

      const query = `insert into ${this.tableName} (${columns}) values ${valuesList} RETURNING *`;
      const result = await this.db.runAsync(query);
      return result;
    } catch (error) {
      console.error("an error occurred in insertAll", error);
      return null;
    }
  }

  async delete(id: number) {
    try {
      var tableId = this.getTableId(this.tableName);
      this.deleteQuery = this.deleteQuery.replace("@table", this.tableName);
      if (id === -1)
        this.deleteQuery = this.deleteQuery.replace("@whereQuery", "");
      var whereQuery = `where ${tableId} = ${id}`;
      this.deleteQuery = this.deleteQuery.replace("@whereQuery", whereQuery);
      const result = await this.db.runAsync(this.deleteQuery);
      return result;
    } catch (error) {
      console.error("an error occurred in delete", error);
      return null;
    }
  }

  async deleteAll(ids: number[]) {
    try {
      if (!ids || ids.length === 0) return null;

      const tableId = this.getTableId(this.tableName);
      this.deleteQuery = this.deleteQuery.replace("@table", this.tableName);
      const whereQuery = `where ${tableId} in (${ids.join(",")})`;
      this.deleteQuery = this.deleteQuery.replace("@whereQuery", whereQuery);

      const result = await this.db.runAsync(this.deleteQuery);
      return result;
    } catch (error) {
      console.error("an error occurred in deleteAll", error);
      return null;
    }
  }

  update(value: T) {
    if (!value) return this;
    this.type = "update";
    const query = `${Object.entries(value)
      .map(([key, value]: [any, any]) => {
        if (typeof value === "string") {
          return `${key} = '${value}'`;
        }
        if (value == null || value == undefined || value?.length === 0) {
          return `${key} = NULL`;
        }
        return `${key} = ${value}`;
      })
      .join(" , ")}`;
    this.updateQuery = this.updateQuery.replace("@updatedQuery", query);
    return this;
  }

  updateField(key: string, value: any) {
    var query = "";
    this.type = "update";
    if (typeof value === "string") {
      query = `${key} = '${value}'`;
    } else if (value == null || value == undefined || value?.length === 0) {
      query = `${key} = NULL`;
    } else query = `${key} = ${value}`;
    this.updateQuery = this.updateQuery.replace("@updatedQuery", query);
    return this;
  }

  where(value: Partial<T>) {
    if (!value) {
      this.getQuery = this.getQuery.replace("@whereQuery", "");
      this.updateQuery = this.updateQuery.replace("@whereQuery", "");
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
    this.getQuery = this.getQuery.replace("@whereQuery", query);
    this.updateQuery = this.updateQuery.replace("@whereQuery", query);
    return this;
  }

  orderBy(value: string, direction: "asc" | "desc" = "asc") {
    if (!value) {
      this.getQuery = this.getQuery.replace("@orderByQuery", "");
      return this;
    }
    this.getQuery = this.getQuery.replace(
      "@orderByQuery",
      `order by ${value} ${direction}`
    );
    return this;
  }

  join(tables: string[], keys: string[], type = "") {
    if (tables.length !== 2 || keys.length !== 2) {
      throw new Error("Join requires exactly two tables and two keys.");
    }

    this.joinQuery += ` ${type} join ${tables[1]} on ${tables[0]}.${keys[0]} = ${tables[1]}.${keys[1]}`;
    return this;
  }

  leftJoin(tables: string[], keys: string[]) {
    return this.join(tables, keys, "left");
  }

  rightJoin(tables: string[], keys: string[]) {
    return this.join(tables, keys, "right");
  }

  async firstAsync() {
    try {
      if (this.type == "select") {
        this.getQuery = this.getQuery.replace("@whereQuery", "");
        this.getQuery = this.getQuery.replace("@orderByQuery", "");
        this.getQuery = this.getQuery.replace("@joinQuery", this.joinQuery);
        this.getQuery = this.getQuery.replace("@table", this.tableName);
        const result = await this.db.getFirstAsync<T>(this.getQuery);
        return result;
      }
    } catch (error) {
      console.error("an error occurred in firstAsync", error);
      return null;
    }
  }

  async executeAsync() {
    try {
      if (this.type == "select") {
        this.getQuery = this.getQuery.replace("@whereQuery", "");
        this.getQuery = this.getQuery.replace("@orderByQuery", "");
        this.getQuery = this.getQuery.replace("@joinQuery", this.joinQuery);
        this.getQuery = this.getQuery.replace("@table", this.tableName);
        const result = await this.db.getAllAsync<T>(this.getQuery);
        return result;
      }
      if (this.type == "update") {
        this.updateQuery = this.updateQuery.replace("@whereQuery", "");
        this.updateQuery = this.updateQuery.replace("@table", this.tableName);
        const result = await this.db.runAsync(this.updateQuery);
        return result;
      }
      return null;
    } catch (error) {
      console.error("an error occurred in executeAsync", error);
      return null;
    }
  }

  private getTableId(table: string) {
    return (
      tableDetails.find((t) => t.name.toLowerCase() === table.toLowerCase())
        ?.id ?? ""
    );
  }
}
