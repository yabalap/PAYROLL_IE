import multer from "multer"
import Employee from "../models/Employee.js"
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import path from "path"
import fs from 'fs'
import Department from "../models/Department.js"; // add if not imported

// Ensure upload folder exists
const uploadPath = "public/uploads"
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
}

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath)  // ✅ FIXED
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

// Add Employee Controller
const addEmployee = async (req, res) => {
    try {
        const {
            firstName,
            middleName,
            lastName,
            employeeID,
            email,
            dob,
            gender,
            maritalStatus,
            position,
            department,
            salaryMon,
            salaryDay,
            password,
            role
        } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "User already registered in Employee" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ");

        const newUser = new User({
            name: fullName, // ✅ Add the required `name` field
            firstName,
            middleName,
            lastName,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : ""
        });

        const savedUser = await newUser.save();

        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeID,
            dob,
            gender,
            maritalStatus,
            position,
            department,
            salaryMon,
            salaryDay
        });

        await newEmployee.save();

        return res.status(200).json({ success: true, message: "Employee Created" });

    } catch (error) {
        console.error("Add Employee Error:", error.message);
        if (error.name === 'ValidationError') {
            for (let field in error.errors) {
                console.error(`${field}: ${error.errors[field].message}`);
            }
        }
        return res.status(500).json({ success: false, message: "Server Error in Adding Employee" });
    }
}
 

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate("userId",{password: 0}).populate("department")
        
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        return res.status(500).json({ success: false, error: "get Employee server error" });
    }
};

const getEmployee = async (req, res) => {
    const { id } = req.params;  // Correctly extracting the 'id' from the URL
    try {
        const employee = await Employee.findById(id).populate('userId', { password: 0 }).populate("department");

        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        return res.status(200).json({ success: true, employee });
    } catch (error) {
        console.error(error);  // For debugging purposes
        return res.status(500).json({ success: false, error: "Server error while fetching employee" });
    }
};




export { addEmployee, upload, getEmployees , getEmployee}
