import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { entityService } from '../../services/apiService';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const EntityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entity, setEntity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEntity();
  }, [id]);

  const fetchEntity = async () => {
    try {
      setLoading(true);
      const entityData = await entityService.getById(id);
      setEntity(entityData);
      setError(null);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Entity not found');
      } else {
        setError('Failed to fetch entity');
      }
      console.error('Error fetching entity:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this entity?')) {
      try {
        await entityService.delete(id);
        navigate('/entities');
      } catch (err) {
        setError('Failed to delete entity');
        console.error('Error deleting entity:', err);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading entity..." />;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          {error}
        </div>
        <Link to="/entities">
          <Button variant="primary">Back to List</Button>
        </Link>
      </div>
    );
  }

  if (!entity) {
    return (
      <div className="error-container">
        <div className="error-message">
          Entity not found
        </div>
        <Link to="/entities">
          <Button variant="primary">Back to List</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="entity-detail">
      <div className="detail-header">
        <div className="header-content">
          <h2>{entity.name}</h2>
          <span className={"status status-${entity.status}"}>{entity.status}</span>
        </div>
        <div className="header-actions">
          <Link to={"entities/${entity.id}/edit"}>
            <Button variant="primary">Edit</Button>
          </Link>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-section">
          <h3>Description</h3>
          <p className="description">
            {entity.description || 'No description provided'}
          </p>
        </div>

        <div className="detail-section">
          <h3>Metadata</h3>
          <div className="metadata">
            <div className="metadata-item">
              <strong>ID:</strong> {entity.id}
            </div>
            <div className="metadata-item">
              <strong>Status:</strong> {entity.status}
            </div>
            <div className="metadata-item">
              <strong>Created:</strong> {new Date(entity.createdAt).toLocaleString()}
            </div>
            <div className="metadata-item">
              <strong>Updated:</strong> {new Date(entity.updatedAt).toLocaleString()}
            </div>
          </div>
        </div>

        {entity.metadata && Object.keys(entity.metadata).length > 0 && (
          <div className="detail-section">
            <h3>Additional Metadata</h3>
            <div className="additional-metadata">
              {Object.entries(entity.metadata).map(([key, value]) => (
                <div key={key} className="metadata-item">
                  <strong>{key}:</strong> {JSON.stringify(value)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="detail-actions">
        <Link to="/entities">
          <Button variant="outline">Back to List</Button>
        </Link>
      </div>
    </div>
  );
};

export default EntityDetail;
