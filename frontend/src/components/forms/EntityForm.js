import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import entityService from '../../services/entityService';

const EntityForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active',
    metadata: {}
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [metadataText, setMetadataText] = useState('{}');

  useEffect(() => {
    if (isEdit) {
      loadEntity();
    }
  }, [id, isEdit]);

  const loadEntity = async () => {
    try {
      setLoading(true);
      const entity = await entityService.getEntityById(id);
      setFormData({
        name: entity.name,
        description: entity.description,
        status: entity.status,
        metadata: entity.metadata
      });
      setMetadataText(JSON.stringify(entity.metadata, null, 2));
      setError(null);
    } catch (err) {
      setError('Failed to load entity');
      console.error('Error loading entity:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMetadataChange = (event) => {
    const value = event.target.value;
    setMetadataText(value);
    
    try {
      const parsed = JSON.parse(value);
      setFormData(prev => ({
        ...prev,
        metadata: parsed
      }));
    } catch (err) {
      // Invalid JSON, don't update formData.metadata
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Validate metadata JSON
      try {
        JSON.parse(metadataText);
      } catch (err) {
        throw new Error('Invalid JSON in metadata field');
      }
      
      const submitData = {
        ...formData,
        metadata: JSON.parse(metadataText)
      };
      
      if (isEdit) {
        await entityService.updateEntity(id, submitData);
      } else {
        await entityService.createEntity(submitData);
      }
      
      navigate('/entities');
    } catch (err) {
      setError(err.message || 'Failed to save entity');
      console.error('Error saving entity:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/entities');
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {isEdit ? 'Edit Entity' : 'Create New Entity'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              variant="outlined"
            />
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              variant="outlined"
            />
          </Box>

          <Box mb={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                label="Status"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              label="Metadata (JSON)"
              value={metadataText}
              onChange={handleMetadataChange}
              multiline
              rows={6}
              variant="outlined"
              helperText="Enter valid JSON for metadata"
            />
          </Box>

          <Box display="flex" gap={2}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Save />}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EntityForm;
