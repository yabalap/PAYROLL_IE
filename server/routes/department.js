import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addDepartment , getDepartment} from '../middleware/departmentController.js'

const router = express.Router()

router.get('/', authMiddleware, getDepartment)
router.post('/add',authMiddleware, addDepartment)

export default router