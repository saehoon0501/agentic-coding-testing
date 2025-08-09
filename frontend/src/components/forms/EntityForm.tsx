import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { entityService, CreateEntityData } from '../../services/entityService';
import Button from '../common/Button';
import './EntityForm.css';

interface EntityFormProps {
  onSuccess: () => void;
}

const EntityForm: React.FC<EntityFormProps> = ({ onSuccess }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateEntityData>();

  const createMutation = useMutation({
    mutationFn: entityService.create,
    onSuccess: () => {
      reset();
      onSuccess();
    },
    onError: (error) => {
      console.error('Failed to create entity:', error);
    }
  });

  const onSubmit = (data: CreateEntityData) => {
    createMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entity-form">
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          id="name"
          type="text"
          {...register('name', { required: 'Name is required' })}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...register('description')}
          rows={4}
        />
      </div>

      <div className="form-actions">
        <Button
          type="submit"
          loading={createMutation.isPending}
          disabled={createMutation.isPending}
        >
          Create Entity
        </Button>
      </div>
    </form>
  );
};

export default EntityForm;
