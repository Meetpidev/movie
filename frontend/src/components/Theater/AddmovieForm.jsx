
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AddmovieForm({ open, handleClose, handleAddMovie, handleAddMovieChange, newMovie }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Movie</DialogTitle>
      <form onSubmit={handleAddMovie}>
        <DialogContent>
          <TextField
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            value={newMovie.title}
            onChange={handleAddMovieChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="image"
            label="Image URL"
            type="text"
            fullWidth
            value={newMovie.image}
            onChange={handleAddMovieChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="language"
            label="Language"
            type="text"
            fullWidth
            value={newMovie.language}
            onChange={handleAddMovieChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="genre"
            label="Genre"
            type="text"
            fullWidth
            value={newMovie.genre}
            onChange={handleAddMovieChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="trailer"
            label="Trailer URL"
            type="text"
            fullWidth
            value={newMovie.trailer}
            onChange={handleAddMovieChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={newMovie.description}
            onChange={handleAddMovieChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="duration"
            label="Duration"
            type="text"
            fullWidth
            value={newMovie.duration}
            onChange={handleAddMovieChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="startDate"
            label="Start Date"
            type="date"
            fullWidth
            value={newMovie.startDate}
            onChange={handleAddMovieChange}
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="endDate"
            label="End Date"
            type="date"
            fullWidth
            value={newMovie.endDate}
            onChange={handleAddMovieChange}
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button type="submit" color="primary">Add Movie</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

