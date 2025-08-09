import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Entity, entityService } from '../../services/entityService';
import Button from '../common/Button';
import './EntityCard.css';

interface EntityCardProps {
  entity: Entity;
  onRefresh: () => void;
}

const EntityCard: React.FC<EntityCardProps> = ({ entity, onRefresh }) => {
  const deleteMutation = useMutation({
    mutationFn: entityService.delete,
    onSuccess: () => {
      onRefresh();
    },
    onError: (error) => {
      console.error('Failed to delete entity:', error);
    }
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this entity?')) {
      deleteMutation.mutate(entity.id);
    }
  };

  return (
    <div className="entity-card">
      <div className="entity-card__header">
        <h3>{entity.name}</h3>
        <div className="entity-card__actions">
          <Button
            variant="danger"
            size="small"
            onClick={handleDelete}
            loading={deleteMutation.isPending}
          >
            Delete
          </Button>
        </div>
      </div>
      {entity.description && (
        <p className="entity-card__description">{entity.description}</p>
      )}
      <div className="entity-card__meta">
        <small>Created: {new Date(entity.created_at).toLocaleDateString()}</small>
      </div>
    </div>
  );
};

export default EntityCard;
