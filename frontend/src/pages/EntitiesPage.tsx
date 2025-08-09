import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { entityService } from '../services/entityService';
import EntityList from '../components/data-display/EntityList';
import EntityForm from '../components/forms/EntityForm';
import Modal from '../components/modals/Modal';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/loading/LoadingSpinner';

const EntitiesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { data: entities, isLoading, error, refetch } = useQuery({
    queryKey: ['entities'],
    queryFn: entityService.getAll
  });

  const handleEntityCreated = () => {
    setIsModalOpen(false);
    refetch();
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error loading entities</div>;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Entities</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          Add Entity
        </Button>
      </div>
      
      <EntityList entities={entities || []} onRefresh={refetch} />
      
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Entity"
      >
        <EntityForm onSuccess={handleEntityCreated} />
      </Modal>
    </div>
  );
};

export default EntitiesPage;
