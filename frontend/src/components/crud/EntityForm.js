import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { entityService } from '../../services/apiService';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const EntityForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active',
    metadata: {}
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      fetchEntity();
    }
  }, [id, isEditing]);

  const fetchEntity = async () => {
    try {
      setLoading(true);
      const entity = await entityService.getById(id);
      setFormData({
        name: entity.name || '',
        description: entity.description || '',
        status: entity.status || 'active',
        metadata: entity.metadata || {}
      });
    } catch (err) {
      setError('Failed to fetch entity');
      console.error('Error fetching entity:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.length > 255) {
      errors.name = 'Name must be less than 255 characters';
    }
    
    if (formData.description && formData.description.length > 1000) {
      errors.description = 'Description must be less than 1000 characters';
    }
    
    if (!['active', 'inactive'].includes(formData.status)) {
      errors.status = 'Status must be either active or inactive';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (isEditing) {
        await entityService.update(id, formData);
      } else {
        await entityService.create(formData);
      }

      navigate('/entities');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save entity');
      console.error('Error saving entity:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/entities');
  };

  if (loading && isEditing) {
    return <LoadingSpinner message="Loading entity..." />;
  }

  return (
    <div className="entity-form">
      <div className="form-header">
        <h2>{isEditing ? 'Edit Entity' : 'Create New Entity'}</h2>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={"form-input ${validationErrors.name ? 'error' : ''}"}
            placeholder="Enter entity name"
          />
          {validationErrors.name && (
            <span className="error-text">{validationErrors.name}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={"form-textarea ${validationErrors.description ? 'error' : ''}"}
            placeholder="Enter entity description"
            rows={4}
          />
          {validationErrors.description && (
            <span className="error-text">{validationErrors.description}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className={"form-select ${validationErrors.status ? 'error' : ''}"}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {validationErrors.status && (
            <span className="error-text">{validationErrors.status}</span>
          )}
        </div>

        <div className="form-actions">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : (isEditing ? 'Update' : 'Create')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EntityForm;
