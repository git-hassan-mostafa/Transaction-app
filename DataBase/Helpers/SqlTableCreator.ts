import { SQLiteDatabase } from "expo-sqlite";

type SqlColumn = {
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isAutoIncrement?: boolean;
  isNullable?: boolean;
  isUnique?: boolean;
  default?: string;
};

type ForeignKey = {
  column: string;
  referencesTable: string;
  referencesColumn: string;
  onDeleteCascade?: boolean;
};

export default class SqlTableCreator {
  private db: SQLiteDatabase;
  private tableName!: string;
  private columnsList: SqlColumn[] = [];
  private foreignKeys: ForeignKey[] = [];

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }

  public createTable(tableName: string): SqlTableCreator {
    this.tableName = tableName;
    return this;
  }

  static async dropTable(db: SQLiteDatabase, tableName: string): Promise<void> {
    const sql = `DROP TABLE IF EXISTS [${tableName}];`;
    await db.runAsync(sql);
  }

  column(column: SqlColumn): SqlTableCreator {
    this.columnsList.push(column);
    return this;
  }

  foreignKey(fk: ForeignKey): SqlTableCreator {
    this.foreignKeys.push(fk);
    return this;
  }

  async executeAsync(): Promise<void> {
    const colDefs = this.columnsList.map((col) => {
      const def: string[] = [`[${col.name}]`, col.type];

      if (col.isPrimaryKey) def.push("PRIMARY KEY");
      if (col.isAutoIncrement) def.push("AUTOINCREMENT");
      if (!col.isNullable && !col.isPrimaryKey) def.push("NOT NULL");
      if (col.isUnique) def.push("UNIQUE");
      if (col.default !== undefined) def.push(`DEFAULT ${col.default}`);

      return def.join(" ");
    });

    const fkDefs = this.foreignKeys.map((fk) => {
      const parts = [
        `FOREIGN KEY ([${fk.column}]) REFERENCES [${fk.referencesTable}]([${fk.referencesColumn}])`,
      ];
      if (fk.onDeleteCascade) parts.push("ON DELETE CASCADE");
      return parts.join(" ");
    });

    const fullDefs = [...colDefs, ...fkDefs].join(",\n  ");

    const sql = `CREATE TABLE IF NOT EXISTS [${this.tableName}] (\n  ${fullDefs}\n);`;
    await this.db.runAsync(sql);
  }
}
