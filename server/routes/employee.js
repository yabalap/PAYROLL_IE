import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addEmployee, upload , getEmployees} from '../controllers/employeeController.js'

const router = express.Router()

// Add Employee Route
router.get('/', authMiddleware, getEmployees)
router.post('/add', authMiddleware, upload.single('image'), addEmployee)

export default router
