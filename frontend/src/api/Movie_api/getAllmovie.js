import axios from "axios";

export const getAllMovies = async () => {
    const res = await axios.get("http://localhost:5000/api/movies/")
    .catch((err) => console.log(err));
  
    if (res.status !== 200) {
      return console.log("No Data");
    }
  
    const data = await res.data;
    return data;
  };


  export const getMovieById = async (movieId) => {
    const res = await axios.get(`http://localhost:5000/api/movies/${movieId}`); 
    return res.data;
  };

  export const addMovie = async (theatreId, movieData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...movieData, theaterId: theatreId })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
  
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error('Error adding movie:', error.message);
      throw error;
    }
  }