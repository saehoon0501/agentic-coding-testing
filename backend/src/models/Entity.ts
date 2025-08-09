export interface Entity {
  id: string;
  name: string;
  description?: string;
  created_at: Date;
  updated_at?: Date;
}

export class EntityModel implements Entity {
  id: string;
  name: string;
  description?: string;
  created_at: Date;
  updated_at?: Date;

  constructor(data: Entity) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  validate(): boolean {
    return !!(this.name && this.name.trim().length > 0);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}
