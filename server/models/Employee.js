import mongoose from "mongoose"
const { Schema } = mongoose

const employeeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    employeeID: { type: String, required: true, unique: true },
    dob: { type: Date },
    gender: { type: String },
    maritalStatus: { type: String },
    position: { type: String },
    department: { type: Schema.Types.ObjectId, ref: "Department", required: true },
    salaryMon: { type: Number, required: true },
    salaryDay: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

const Employee = mongoose.model("Employee", employeeSchema)
export default Employee
