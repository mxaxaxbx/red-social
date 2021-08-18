const express        = require('express');
const cors           = require('cors');
const {dbconnection} = require('./db/db');

const authRoutes = require('./routes/auth.router');
const postRoutes = require('./routes/posts.router');
const userRoutes = require('./routes/users.route');

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.listen( process.env.PORT, () =>
    console.log("Backend server running on port: " + process.env.PORT )
);

dbconnection();
