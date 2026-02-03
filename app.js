const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

const cors = require('cors');

const routes = require('./Routes/index');

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://127.0.0.1:5500', // Reemplaza con el origen de tu frontend
    credentials: true // Permite el envío de cookies
}));
app.use(express.json());

app.use(cookieParser());


app.use('/', routes);





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
