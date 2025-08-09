import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { entityService } from '../../services/apiService';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

const EntityList = () => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEntities();
  }, [pagination.page, searchTerm]);

  const fetchEntities = async () => {
    try {
      setLoading(true);
      const response = await entityService.getAll({
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm
      });
      
      setEntities(response.data);
      setPagination(prev => ({
        ...prev,
        ...response.pagination
      }));
      setError(null);
    } catch (err) {
      setError('Failed to fetch entities');
      console.error('Error fetching entities:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entity?')) {
      try {
        await entityService.delete(id);
        fetchEntities(); // Refresh the list
      } catch (err) {
        setError('Failed to delete entity');
        console.error('Error deleting entity:', err);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchEntities();
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  if (loading) {
    return <LoadingSpinner message="Loading entities..." />;
  }

  return (
    <div className="entity-list">
      <div className="list-header">
        <h2>Entities</h2>
        <Link to="/entities/new">
          <Button variant="primary">Create New Entity</Button>
        </Link>
      </div>

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search entities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Button type="submit" variant="secondary">Search</Button>
        </form>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="entity-grid">
        {entities.length === 0 ? (
          <div className="empty-state">
            <p>No entities found.</p>
            <Link to="/entities/new">
              <Button variant="primary">Create your first entity</Button>
            </Link>
          </div>
        ) : (
          entities.map(entity => (
            <div key={entity.id} className="entity-card">
              <div className="entity-header">
                <h3>{entity.name}</h3>
                <span className={"status status-${entity.status}"}>{entity.status}</span>
              </div>
              <p className="entity-description">{entity.description}</p>
              <div className="entity-meta">
                <small>Created: {new Date(entity.createdAt).toLocaleDateString()}</small>
              </div>
              <div className="entity-actions">
                <Link to={"entities/${entity.id}"}>
                  <Button variant="secondary" size="small">View</Button>
                </Link>
                <Link to={"entities/${entity.id}/edit"}>
                  <Button variant="outline" size="small">Edit</Button>
                </Link>
                <Button 
                  variant="danger" 
                  size="small"
                  onClick={() => handleDelete(entity.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {pagination.totalPages > 1 && (
        <div className="pagination">
          <Button 
            variant="outline"
            disabled={pagination.page === 1}
            onClick={() => handlePageChange(pagination.page - 1)}
          >
            Previous
          </Button>
          <span className="page-info">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button 
            variant="outline"
            disabled={pagination.page === pagination.totalPages}
            onClick={() => handlePageChange(pagination.page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default EntityList;
