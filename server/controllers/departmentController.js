import Department from "../models/Department.js";


const getDepartment = async (req, res) => {
    try {
        const departments = await Department.find()
        return res.status(200).json({success: true, departments})
     } catch (error) {
        return res.status(500).json({success: false, error: " get department server error"})

    }
}


const addDepartment = async (req, res) => {

    try {
        const {dep_name, description} = req.body;
        const newDep = new Department({
            dep_name,
            description
        })

        await newDep.save()
        return res.status(200).json({success: true, department: newDep})
    } catch (error) {
        return res.status(500).json({success: false, error: " add department server error"})
    }

}

const getDepartments = async (req,res) =>{
    try{
        const {id} =req.params;
        const department = await Department.findById({_id: id})

    return res.status(200).json({success: true, department})
     } catch (error) {
        return res.status(500).json({success: false, error: " get department server error"})

    }
}

const updateDepartment = async (req, res) => {
    try {
        const{dep_name, description} = req.body;
        const{id} = req.params;
        const updateDep = await Department.findByIdAndUpdate({_id: id},{

            dep_name,
            description
        })
        return res.status(200).json({success: true, updateDep})
    } catch (error) {
       return res.status(500).json({success: false, error: " update department server error"})

   }
}

const deleteDepartment = async (req, res) => {

    try {
        const{id} = req.params;
        const deletedep = await Department.findByIdAndDelete({_id: id})
        return res.status(200).json({success: true, deletedep})
    } catch (error) {
       return res.status(500).json({success: false, error: " delete department server error"})

   }
}




export{addDepartment, getDepartment, getDepartments, updateDepartment,deleteDepartment }