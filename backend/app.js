const express = require('express');
const connectDB = require('./config/db.js');
const movieRoutes = require('./routes/movieRoutes.js');
const theatreRoutes = require('./routes/theatreRoutes.js');
const showtimeRoutes = require('./routes/showtimeRoutes.js');
const reservationRoutes = require('./routes/reservationRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const addminRoutes = require("./routes/adminRoutes.js");
const cors = require('cors');

const app = express();
connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/movies', movieRoutes);
app.use('/api/theatres', theatreRoutes);
app.use('/api/showtimes', showtimeRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/users', userRoutes);
app.use("/api/admin",addminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
