import { Department, User } from '../models/index.js';


/** Admin Controllers */

export const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll({
            attributes: ['id', 'name'],
            include: [
                {
                    model: User,
                    attributes: ['name', 'id', 'email', 'role'],
                    as: "manager"
                },
                {
                    model: User,
                    attributes: ['name', 'email', 'id'],
                    as: "employees"
                },
            ]

        });
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch departments', details: error.message });
    }
};

export const createDepartment = async (req, res) => {
    try {
        const { name, manager_id } = req.body;
        if (!name || !manager_id) {
            return res.status(400).json({ message: 'Name or manager id is missing' });
        }

        const existingDepartment = await Department.findOne({ where: { name } });
        if (existingDepartment) {
            return res.status(400).json({ message: `There is already a named department  ${name} ` });
        }

        const manager = await User.findOne({ where: { id: manager_id, role: 'manager' } });
        if (!manager) {
            return res.status(400).json({ message: 'The provided manager ID does not correspond to a valid manager.' });
        }

        const department = await Department.create({ name, managerId: manager_id });
        res.status(201).json({ message: 'Department created successfully', department });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create department', details: error.message });
    }
};

export const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, manager_id } = req.body;

        const department = await Department.findByPk(id);
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        const manager = await User.findOne({ where: { id: manager_id, role: 'manager' } });
        if (!manager) {
            return res.status(400).json({ message: 'The provided manager ID does not correspond to a valid manager.' });
        }

        await department.update({ name, managerId: manager_id });
        res.status(200).json({ message: 'Department updated successfully', department });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update department', details: error.message });
    }
};

export const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        const department = await Department.findByPk(id);
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        await department.destroy();
        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete department', details: error.message });
    }
};


/** End Admin Controllers  */



/** Manager Controllers */

export const getAllDepartmentsManager = async (req, res) => {
    try {
        const departments = await Department.findAll({
            attributes: ['id', 'name'],
            where: { managerId: req.user.data.id },
            
        });
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch departments', details: error.message });
    }
};






/** End Manager Controllers  */
