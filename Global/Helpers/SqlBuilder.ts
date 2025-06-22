import { SQLiteDatabase } from "expo-sqlite";
import tableDetails from "../Constants/ColumnsDetails";

export default class SqlBuilder<T extends Record<string, any>> {
  private tableName: string;
  private db: SQLiteDatabase;
  private type!: "select" | "update";
  private getQuery: string = "select * from {0} {1} {2} {3}";
  private updateQuery: string = "update {0} set {1} {2}";
  private deleteQuery: string = "delete from {0} {1}";
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
      this.deleteQuery = this.deleteQuery.replace("{0}", this.tableName);
      if (id === -1) this.deleteQuery = this.deleteQuery.replace("{1}", "");
      var whereQuery = `where ${tableId} = ${id}`;
      this.deleteQuery = this.deleteQuery.replace("{1}", whereQuery);
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
      this.deleteQuery = this.deleteQuery.replace("{0}", this.tableName);
      const whereQuery = `where ${tableId} in (${ids.join(",")})`;
      this.deleteQuery = this.deleteQuery.replace("{1}", whereQuery);

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
    this.updateQuery = this.updateQuery.replace("{1}", query);
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
    this.updateQuery = this.updateQuery.replace("{1}", query);
    return this;
  }

  where(value: Partial<T>) {
    if (!value) {
      this.getQuery = this.getQuery.replace("{2}", "");
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
    this.getQuery = this.getQuery.replace("{2}", query);
    this.updateQuery = this.updateQuery.replace("{2}", query);
    return this;
  }

  orderBy(value: string) {
    if (!value) {
      this.getQuery = this.getQuery.replace("{3}", "");
      return this;
    }
    this.getQuery = this.getQuery.replace("{3}", `order by ${value}`);
    return this;
  }

  join(table: string, table2: string | null = null, type = "") {
    if (type === "right") this.rightJoinQueryBuilder(table, table2);
    else this.joinQueryBuilder(table, table2, type);
    return this;
  }

  leftJoin(table: string, table2: string | null = null) {
    return this.join(table, table2, "left");
  }

  rightJoin(table: string, table2: string | null = null) {
    return this.join(table, table2, "right");
  }

  async firstAsync() {
    try {
      if (this.type == "select") {
        this.getQuery = this.getQuery.replace("{2}", "");
        this.getQuery = this.getQuery.replace("{3}", "");
        this.getQuery = this.getQuery.replace("{1}", this.joinQuery);
        this.getQuery = this.getQuery.replace("{0}", this.tableName);
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
        this.getQuery = this.getQuery.replace("{2}", "");
        this.getQuery = this.getQuery.replace("{3}", "");
        this.getQuery = this.getQuery.replace("{1}", this.joinQuery);
        this.getQuery = this.getQuery.replace("{0}", this.tableName);
        const result = await this.db.getAllAsync<T>(this.getQuery);
        return result;
      }
      if (this.type == "update") {
        this.updateQuery = this.updateQuery.replace("{2}", "");
        this.updateQuery = this.updateQuery.replace("{0}", this.tableName);
        const result = await this.db.runAsync(this.updateQuery);
        return result;
      }
      return null;
    } catch (error) {
      console.error("an error occurred in executeAsync", error);
      return null;
    }
  }

  private joinQueryBuilder(
    table: string,
    table2: string | null = null,
    type = ""
  ) {
    var foreignTableKey = this.getTableId(table);
    var primaryTableKey = table2
      ? table2.slice(0, -1)
      : this.tableName.slice(0, -1);
    var usedTable = table2 || this.tableName;
    var primaryTableForeignKey = primaryTableKey + "_" + foreignTableKey;
    this.joinQuery += ` ${type} join ${table} on ${usedTable}.${primaryTableForeignKey} = ${table}.${foreignTableKey} `;
  }

  private rightJoinQueryBuilder(table: string, table2: string | null = null) {
    var foreignTableKey = this.getTableId(table2 || this.tableName);
    var primaryTableKey = table?.slice(0, -1) ?? "";
    var usedTable = table2 || this.tableName;

    var primaryTableForeignKey = primaryTableKey + "_" + foreignTableKey;
    this.joinQuery += ` right join ${table} on ${table}.${primaryTableForeignKey} = ${usedTable}.${foreignTableKey} `;
  }

  private getTableId(table: string) {
    return (
      tableDetails.find((t) => t.name.toLowerCase() === table.toLowerCase())
        ?.id ?? ""
    );
  }
}
