import { T } from '@faker-js/faker/dist/airline-D6ksJFwG';
import {Database} from 'better-sqlite3';

interface criteria {
  field: string;
  op: "=" | "!" | "<" | ">" | "<=" |">=";
  value: any
}

class GenericDao<T> {
  private db:Database.Database;
  private tableName: string;

  constructor(dbPath: string,tableName: string) {
    this.db = new Database(dbPath);
    this.tableName = tableName;
  }

  async create(entity: T):Promise<void> {
    const keys = Object.keys(entity).join(",");
    const values = Object.values(entity);
    const placeholders = values.map(() => "?").join(",");

    const stmt = this.db.prepare(`INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders})`   
    );
    stmt.run(...values);
  }
  async read(id: number): Promise<T | null> {
    const stmt = this.db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`

    );
    return stmt.get(id) as T | null;
    }

    async update(id: number, entity: T): Promise<void> {
      const update = Object.keys(entity).map((keys) => `${keys} = ?`).join(",");
      const values = Object.values(entity);

      const stmt = this.db.prepare(`UPDATE ${this.tableName} SET ${update} WHERE id = ?`

      );
      stmt.run(...values,id);
    }
    async delete(id: number): Promise<void> {
      const stmt = this.db.prepare(`DELETE FROM ${this.tableName} WHERE id = ?`

      );
      stmt.run(id);
    }

    async findAll(): Promise<T[]> {
      const stmt = this.db.prepare(`SELECT *FROM ${this.tableName}`);
      return stmt.all() as T[];

    }

    async findByCriteria(criteria: criteria): Promise<T[]> {
      const stmt = this.db.prepare(` SELECT * FROM ${this.tableName} WHERE ${criteria.field} ${criteria.op} ?`

      );
      return stmt.all(criteria.value) as T[];
    }
}