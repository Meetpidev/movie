import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AuthForm() {
  const labelStyle = { mt: 1, mb: 1 };
  const [isSignup, setIsSignup] = useState(false);
  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleInputValue = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType === "") {
      alert("Something went wrong");
    } else if (isSignup && userType === 'Admin') {
      alert(`Your Secret Key is: ${input.name}`);
      setUsers([...users, { ...input, userType, secretKey: input.name }]); 
    } else if (isSignup && userType === 'User') {
      console.log("User");
      setUsers([...users, { ...input, userType }]); 
    } else {
      console.log("Form submitted");
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const user = users.find(user => user.email === input.email && user.password === input.password);
    if (user) {
      if (userType === 'Admin' && user.secretKey === secretKey) {
        console.log("Admin");
      } else if (userType === 'User') {
        console.log("User");
      } else {
        alert("Invalid secretKey");
      }
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <Dialog open={true} PaperProps={{ style: { borderRadius: 20, overflow: 'hidden' } }}>
        <Box sx={{ ml: 'auto', padding: 1 }}>
          <IconButton component={Link} to="/">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box>
          <Box display={'flex'}>
            <Typography padding={3} variant='h5' textAlign={'left'}>
              {isSignup ? "Sign Up as" : "Login as"}
            </Typography>

            <Typography variant='h6' sx={{ paddingRight: '1.4rem', marginBottom: '1rem' }}>
              <input
                type="radio"
                name="UserType"
                value="User"
                checked={userType === 'User'}
                onChange={(e) => setUserType(e.target.value)}
                style={{ marginTop: '2rem' }}
              /> User
            </Typography>

            <Typography variant='h6'>
              <input
                type="radio"
                name="UserType"
                value="Admin"
                checked={userType === 'Admin'}
                onChange={(e) => setUserType(e.target.value)}
                style={{ marginTop: '2rem' }}
              /> Admin
            </Typography>
          </Box>
          <Typography paddingLeft={3} variant='h6' display={"flex"} textAlign={'left'}>
            {isSignup ? "" : "Don't have an account"}
            <Typography variant='h6' paddingLeft={2}>
              <Button sx={{ borderRadius: 10 }} fullWidth variant='standard' onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? "Login" : "Sign Up"}
              </Button>
            </Typography>
          </Typography>
        </Box>

        <form onSubmit={isSignup ? handleSubmit : handleLoginSubmit}>
          <Box padding={6} display={"flex"} justifyContent={"center"} flexDirection="column" width={400} margin="auto" alignContent={"center"}>
            {isSignup && (
              <>
                <FormLabel>Name</FormLabel>
                <TextField
                  type={'text'}
                  value={input.name}
                  onChange={handleInputValue}
                  name='name'
                  variant='standard'
                  margin='normal'
                  sx={{ mb: 4 }}
                />
              </>
            )}
            <FormLabel>Email</FormLabel>
            <TextField
              type={'email'}
              value={input.email}
              onChange={handleInputValue}
              name='email'
              variant='standard'
              margin='normal'
              sx={{ mb: 4 }}
            />
            <FormLabel sx={labelStyle}>Password</FormLabel>
            <TextField
              type={'password'}
              value={input.password}
              onChange={handleInputValue}
              name='password'
              variant='standard'
              margin='normal'
            />
            {isSignup && (
              <>
                <FormLabel>Phone</FormLabel>
                <TextField
                  type={'text'}
                  value={input.phone}
                  onChange={handleInputValue}
                  name='phone'
                  variant='standard'
                  margin='normal'
                  sx={{ mb: 4 }}
                />
              </>
            )}

            {!isSignup && userType === 'Admin' && (
              <>
                <FormLabel>Secret Key</FormLabel>
                <TextField
                  type={'password'}
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  name='secretKey'
                  variant='standard'
                  margin='normal'
                  sx={{ mb: 4 }}
                />
              </>
            )}

            <Button 
              type='submit' 
              sx={{ mt: 5, borderRadius: 10 }} 
              fullWidth 
              variant='contained' 
              bgcolor='#1b1b1b'
            >
              {isSignup ? "Sign Up" : "Login"}
            </Button>
          </Box>
        </form>
      </Dialog>
    </>
  );
}
