import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from './routes/booksRoutes.js';
import cors from 'cors';

const app = express();

// mongo connection
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connection to database is succsessfull!");
    // server
    app.listen(PORT, () => {
      console.log(`Server rodando na porta:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });


// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// opção 1 - permite acesso de todas as origens com Default cors (*)
app.use(cors());
// opção 2  - permite custom origens
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );
app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome to MERN Stack tutorial');
})

// use routes
app.use('/books', bookRoute);