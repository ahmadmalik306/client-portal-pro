import express, { Application, Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
import admin from 'firebase-admin';
import { schema } from './graphql/resolvers';
import { authenticateToken } from './middleware/auth';

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());

// Firebase Admin initialization (serviceAccountKey.json should be in src/config)
// import serviceAccount from './config/serviceAccountKey.json';
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount as any),
// });

// MongoDB connection
// mongoose.connect(process.env.MONGO_URI!, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// Sequelize (Postgres) connection
// const sequelize = new Sequelize(process.env.PG_URI!);
// sequelize.authenticate()
//   .then(() => console.log('Postgres connected'))
//   .catch(err => console.error('Postgres connection error:', err));

async function startApolloServer() {
  const server = new ApolloServer({ schema });
  await server.start();
  app.use('/graphql', authenticateToken, expressMiddleware(server));
}

startApolloServer();

app.get('/', (req: Request, res: Response) => {
  res.send('ClientPortalPro Backend API');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 