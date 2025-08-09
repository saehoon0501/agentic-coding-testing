import { Entity } from '../models/Entity';
import { query } from '../config/database';

export class EntityService {
  async create(data: Partial<Entity>): Promise<Entity> {
    const result = await query(
      'INSERT INTO entities (name, description, created_at) VALUES (, , NOW()) RETURNING *',
      [data.name, data.description]
    );
    return result.rows[0];
  }

  async getAll(): Promise<Entity[]> {
    const result = await query('SELECT * FROM entities ORDER BY created_at DESC');
    return result.rows;
  }

  async getById(id: string): Promise<Entity | null> {
    const result = await query('SELECT * FROM entities WHERE id = ', [id]);
    return result.rows[0] || null;
  }

  async update(id: string, data: Partial<Entity>): Promise<Entity | null> {
    const result = await query(
      'UPDATE entities SET name = , description = , updated_at = NOW() WHERE id =  RETURNING *',
      [data.name, data.description, id]
    );
    return result.rows[0] || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM entities WHERE id = ', [id]);
    return result.rowCount > 0;
  }
}
