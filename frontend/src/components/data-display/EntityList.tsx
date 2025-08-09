import React from 'react';
import { Entity } from '../../services/entityService';
import EntityCard from './EntityCard';
import './EntityList.css';

interface EntityListProps {
  entities: Entity[];
  onRefresh: () => void;
}

const EntityList: React.FC<EntityListProps> = ({ entities, onRefresh }) => {
  if (entities.length === 0) {
    return (
      <div className="empty-state">
        <p>No entities found. Create your first entity!</p>
      </div>
    );
  }

  return (
    <div className="entity-list">
      {entities.map((entity) => (
        <EntityCard
          key={entity.id}
          entity={entity}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
};

export default EntityList;
