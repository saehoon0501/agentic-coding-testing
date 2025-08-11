import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  Alert
} from '@mui/material';
import { Edit, ArrowBack } from '@mui/icons-material';
import entityService from '../../services/entityService';

const EntityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entity, setEntity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEntity();
  }, [id]);

  const loadEntity = async () => {
    try {
      setLoading(true);
      const data = await entityService.getEntityById(id);
      setEntity(data);
      setError(null);
    } catch (err) {
      setError('Failed to load entity');
      console.error('Error loading entity:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return (
      <Alert severity="error">
        {error}
      </Alert>
    );
  }

  if (!entity) {
    return (
      <Alert severity="warning">
        Entity not found
      </Alert>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/entities')}
        >
          Back to List
        </Button>
        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={() => navigate(`/entities/${entity.id}/edit`)}
        >
          Edit Entity
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {entity.name}
        </Typography>
        
        <Box mb={2}>
          <Chip
            label={entity.status}
            color={entity.status === 'active' ? 'success' : 'default'}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box mb={2}>
          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {entity.description || 'No description provided'}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box mb={2}>
          <Typography variant="h6" gutterBottom>
            Metadata
          </Typography>
          <Typography variant="body2" component="pre" sx={{ backgroundColor: '#f5f5f5', p: 1, borderRadius: 1 }}>
            {JSON.stringify(entity.metadata, null, 2)}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="body2" color="text.secondary">
              Created: {new Date(entity.createdAt).toLocaleString()}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Updated: {new Date(entity.updatedAt).toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default EntityDetail;
