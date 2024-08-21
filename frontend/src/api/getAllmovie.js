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

  const API_URL = 'http://localhost:5000/api/theatres';

  export const getAllTheatres = async () => {
    const res = await axios.get(API_URL);
    return res.data;
  };
  
  export const addTheatre = async (theatreData) => {
    const formData = new FormData();
    Object.keys(theatreData).forEach(key => formData.append(key, theatreData[key]));
    
    const res = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  };
  
  export const updateTheatre = async (id, theatreData) => {
    const res = await axios.put(`${API_URL}/${id}`, theatreData);
    return res.data;
  };
  
  export const deleteTheatre = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  };