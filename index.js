import express from "express";
import mongoose from "mongoose";
import bookRoute from './routes/booksRoutes.js';
import cors from 'cors';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

// mongo connection
mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    console.log("Connection to database is succsessfull!");
    // server
    app.listen(process.env.PORT, () => {
      console.log(`Server rodando na porta:${process.env.PORT}`);
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