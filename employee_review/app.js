import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/db.js';
import routes from './routes/index.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);


sequelize.sync({ alter: true }).then(() => {
  console.log('Database connected and synced.');
}).catch((error) => {
  console.error('Database connection error:', error);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
