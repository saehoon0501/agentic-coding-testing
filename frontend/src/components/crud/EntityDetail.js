import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import { Edit, Delete, ArrowBack } from '@mui/icons-material';
import entityService from '../../services/entityService';

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
      setError(null);
      const response = await entityService.getEntity(id);
      setEntity(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this entity?')) {
      try {
        await entityService.deleteEntity(id);
        navigate('/entities');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'default';
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/entities')}
        >
          Back to List
        </Button>
      </Box>
    );
  }

  if (!entity) {
    return (
      <Box>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Entity not found
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/entities')}
        >
          Back to List
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Entity Details
        </Typography>
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/entities')}
          >
            Back
          </Button>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => navigate(`/entities/${id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Box display="flex" flexDirection="column" gap={3}>
          <Box>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              ID
            </Typography>
            <Typography variant="body1">
              {entity.id}
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Name
            </Typography>
            <Typography variant="body1">
              {entity.name}
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1">
              {entity.description || 'No description provided'}
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Status
            </Typography>
            <Chip
              label={entity.status}
              color={getStatusColor(entity.status)}
            />
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Created At
            </Typography>
            <Typography variant="body1">
              {new Date(entity.createdAt).toLocaleString()}
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Updated At
            </Typography>
            <Typography variant="body1">
              {new Date(entity.updatedAt).toLocaleString()}
            </Typography>
          </Box>

          {entity.metadata && Object.keys(entity.metadata).length > 0 && (
            <>
              <Divider />
              <Box>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Metadata
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <pre style={{ margin: 0, fontSize: '0.875rem' }}>
                    {JSON.stringify(entity.metadata, null, 2)}
                  </pre>
                </Paper>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default EntityDetail;

