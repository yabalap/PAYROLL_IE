import multer from "multer"
import Employee from "../models/Employee.js"
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import path from "path"
import fs from 'fs'

// Ensure upload folder exists
const uploadPath = "public/uploads";
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);  // Directory where images will be uploaded
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Ensures unique filenames
    }
});

const upload = multer({ storage: storage })

// Add Employee Controller
const addEmployee = async (req, res) => {
    try {
        console.log("File received:", req.file); // This should log the file object

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

        // Check if the image is processed correctly
        if (req.file) {
            console.log("Image file:", req.file.filename); // Ensure filename is being extracted
        } else {
            console.log("No image file received");
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ");

        const newUser = new User({
            name: fullName,
            firstName,
            middleName,
            lastName,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : "", // Saving the image filename
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
            salaryDay,
        });

        await newEmployee.save();

        return res.status(200).json({ success: true, message: "Employee Created" });
    } catch (error) {
        console.error("Add Employee Error:", error.message);
        return res.status(500).json({ success: false, message: "Server Error in Adding Employee" });
    }
};

 

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate("userId",{password: 0}).populate("department")
        
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        return res.status(500).json({ success: false, error: "get Employee server error" });
    }
};

const getEmployee = async (req, res) => {
    const { id } = req.params;  
    try {
        let employee;
        employee = await Employee.findById({_id: id})
        .populate('userId', { password: 0 })
        .populate("department");

        if (!employee) {

        employee = await Employee.findOne({userId: id})
            .populate('userId', { password: 0 })
            .populate("department");

        }

        return res.status(200).json({ success: true, employee });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error while fetching  get employee" });
    }
};
const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;  // Extract employee ID from the URL parameters
        const {
            firstName,
            middleName,
            lastName,
            maritalStatus,
            position,
            department,
            salaryMon,
            salaryDay,
            role,
        } = req.body;  // Extract the update fields from the request body

        // Find the employee using the provided ID
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        // Find the associated user (since it's a separate model)
        const user = await User.findById(employee.userId);

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Construct the full name from the first, middle, and last names
        const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ");

        // Update the User record (name and other fields if necessary)
        const updatedUser = await User.findByIdAndUpdate(
            { _id: employee.userId },
            { name: fullName },  // Update name to the full name (combining first, middle, last)
            { new: true }  // Return the updated user document
        );

        // Update the Employee record with the new data
        const updatedEmployee = await Employee.findByIdAndUpdate(
            { _id: id },
            {
                maritalStatus,
                position,
                department,
                salaryMon,
                salaryDay,
                role
            },
            { new: true }  // Return the updated employee document
        );

        if (!updatedEmployee || !updatedUser) {
            return res.status(404).json({ success: false, error: "Update failed, document not found" });
        }

        // Send a success response
        return res.status(200).json({ success: true, message: "Employee updated successfully" });

    } catch (error) {
        console.error("Error updating employee:", error);
        return res.status(500).json({ success: false, error: "Server error while updating employee" });
    }
};



export { addEmployee, upload, getEmployees , getEmployee, updateEmployee}
