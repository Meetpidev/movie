import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';

function Header() {
  const [value, setValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [theater, setTheater] = useState({
    name: '',
    city: '',
    ticketPrice: '',
    seats: '',
    image: null,
  });
  const userEmail = localStorage.getItem("userEmail") || "";
  const userInitial = userEmail ? userEmail.charAt(0).toUpperCase() : "";
  const userType = localStorage.getItem("userType") || ""; 
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.inert = openDialog ? 'true' : 'false';
    return () => {
      document.body.style.inert = 'false';
    };
  }, [openDialog]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token"); 
    localStorage.removeItem("userType");
    navigate("/");
    window.location.reload();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTheater({
      ...theater,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setTheater({
      ...theater,
      image: e.target.files[0],
    });
  };

  const handleSave = async () => {
    if (!theater.name || !theater.city || !theater.ticketPrice || !theater.seats || !theater.image) {
      alert("Please fill all the fields and provide an image URL.");
      return;
    }
  
    const theaterData = {
      name: theater.name,
      city: theater.city,
      ticketPrice: parseFloat(theater.ticketPrice),
      seats: theater.seats.split(',').map(Number),  // Assuming seats are entered as a comma-separated string
      image: theater.image,  // URL as a string
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/theatres/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(theaterData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add theater: ${errorText}`);
      }
  
      const result = await response.json();
      console.log('Theater added:', result);
      handleCloseDialog();
    } catch (error) {
      console.error('Error:', error);
      alert(error.message); // Display the error to the user
    }
  };
  


  return (
    <>
      <AppBar position='sticky' sx={{background:"black"}}>
        <Toolbar>
          <Box width={"20%"}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height='40'>
              <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm.001 6c-.001 0-.001 0 0 0h-.465l-2.667-4H20l.001 4zM15.5 15 10 18v-6l5.5 3zm-.964-6-2.667-4h2.596l2.667 4h-2.596zm-2.404 0H9.536L6.869 5h2.596l2.667 4zM4 5h.465l2.667 4H4V5z" fill="#ffffff" className="fill-000000"></path>
            </svg>
          </Box>
          <Box display={'flex'} marginLeft={'auto'}>
            <Tabs textColor='inherit' indicatorColor='secondary' value={value} onChange={(e,val)=>setValue(val)}>
              <Tab label="Home" component={Link} to="/" sx={{color:"white"}} />
              <Tab label="Theater" component={Link} to="/theater" sx={{color:"white"}} />
              <Tab label="Movies" component={Link} to="/movie" sx={{color:"white"}} />
              {userType === 'Admin' && (
                <Tab label="Add Your Theater" onClick={handleOpenDialog} sx={{ color: "white" }} />
              )}
              {userInitial ? (
                <Box display="flex" alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: '#1b1b1b',
                      color: 'white',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      marginRight: 2,
                    }}
                  >
                    {userInitial}
                  </Box>
                  <Button
                    variant="outlined"
                    sx={{ color: "white", borderColor: "white" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Box>
              ) : (
                <Tab label="Sign Up" component={Link} to="/register" sx={{ color: "white" }} />
              )}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
      
      
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>
          Add Theater
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="city"
            label="City"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="ticketPrice"
            label="Ticket Price"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="seats"
            label="Seats"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
           margin="dense"
           name="image"
           label="Image URL"
           type="text"
           fullWidth
           variant="standard"
           onChange={handleChange}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Header;
