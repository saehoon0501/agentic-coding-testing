import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  Chip,
  IconButton,
  TextField,
  TablePagination,
  Alert
} from '@mui/material';
import { Edit, Delete, Add, Visibility } from '@mui/icons-material';
import entityService from '../../services/entityService';

const EntityList = () => {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadEntities();
  }, [page, rowsPerPage, search]);

  const loadEntities = async () => {
    try {
      setLoading(true);
      const response = await entityService.getEntities({
        page: page + 1,
        limit: rowsPerPage,
        search: search || undefined
      });
      setEntities(response.data);
      setTotalCount(response.pagination.total);
      setError(null);
    } catch (err) {
      setError('Failed to load entities');
      console.error('Error loading entities:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entity?')) {
      try {
        await entityService.deleteEntity(id);
        loadEntities();
      } catch (err) {
        setError('Failed to delete entity');
        console.error('Error deleting entity:', err);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  if (loading && entities.length === 0) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Entities
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/entities/new')}
        >
          Create Entity
        </Button>
      </Box>

      <Box mb={2}>
        <TextField
          fullWidth
          label="Search entities"
          value={search}
          onChange={handleSearchChange}
          variant="outlined"
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entities.map((entity) => (
              <TableRow key={entity.id}>
                <TableCell>{entity.id}</TableCell>
                <TableCell>{entity.name}</TableCell>
                <TableCell>{entity.description}</TableCell>
                <TableCell>
                  <Chip
                    label={entity.status}
                    color={entity.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(entity.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => navigate(`/entities/${entity.id}`)}
                    size="small"
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    onClick={() => navigate(`/entities/${entity.id}/edit`)}
                    size="small"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(entity.id)}
                    size="small"
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default EntityList;
