import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import departmentRouter from './routes/department.js';
import employeeRouter from './routes/employee.js';
import path from 'path';
import connectToDatabase from './db/db.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Fix for __dirname with ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize environment variables and DB connection
dotenv.config();
connectToDatabase();

const app = express();

app.use(express.json());
app.use(cors());

// Routes setup
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);

// Serve static files (images) from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
