import { useState, useEffect } from 'react';
import { getAllTheatres, updateTheatre, deleteTheatre } from '../../api/getAllmovie';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';

function Theater() {
  const [theatres, setTheatres] = useState([]);
  const [editTheatre, setEditTheatre] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const data = await getAllTheatres();
        setTheatres(data);
      } catch (error) {
        console.error('Error fetching theatres:', error);
      }
    };
    fetchTheatres();
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTheatre({
      ...editTheatre,
      [name]: value,
    });
  };

  const handleUpdateTheatre = async (e) => {
    e.preventDefault();
    try {
      const updatedTheatre = await updateTheatre(editTheatre._id, editTheatre);
      setTheatres(theatres.map(theatre => theatre._id === editTheatre._id ? updatedTheatre : theatre));
      setIsEditing(false);
      setEditTheatre(null);
    } catch (error) {
      console.error('Error updating theatre:', error);
    }
  };

  const handleDeleteTheatre = async (id) => {
    try {
      await deleteTheatre(id);
      setTheatres(theatres.filter(theatre => theatre._id !== id));
    } catch (error) {
      console.error('Error deleting theatre:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTheatre(null);
  };

  return (
    <Box p={2}>
      <Typography variant="h4" color="white" gutterBottom>Theaters</Typography>
      <Grid container spacing={2}>
        {theatres.map(theatre => (
          <Grid item xs={12} sm={6} md={4} key={theatre._id}>
            <Card sx={{ backgroundColor: '#333', color: 'white' }}>
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:5000/${theatre.image}`}
                alt={theatre.name}
              />
              <CardContent>
                <Typography variant="h6">{theatre.name}</Typography>
                <Typography variant="body2">City: {theatre.city}</Typography>
                <Typography variant="body2">Ticket Price: {theatre.ticketPrice}</Typography>
                <Typography variant="body2">Seats: {theatre.seats}</Typography>
                <Button variant="contained" color="primary" onClick={() => { setIsEditing(true); setEditTheatre(theatre); }}>Edit</Button>
                <Button variant="contained" color="error" onClick={() => handleDeleteTheatre(theatre._id)} sx={{ ml: 1 }}>Delete</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {isEditing && (
        <Box component="form" onSubmit={handleUpdateTheatre} sx={{ mt: 4 }}>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={editTheatre.name}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="city"
            label="City"
            type="text"
            fullWidth
            variant="standard"
            value={editTheatre.city}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="ticketPrice"
            label="Ticket Price"
            type="text"
            fullWidth
            variant="standard"
            value={editTheatre.ticketPrice}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="seats"
            label="Seats"
            type="text"
            fullWidth
            variant="standard"
            value={editTheatre.seats}
            onChange={handleEditChange}
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="space-between">
            <Button type="submit" variant="contained" color="primary">Save</Button>
            <Button variant="contained" color="secondary" onClick={handleCancelEdit}>Cancel</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Theater;
