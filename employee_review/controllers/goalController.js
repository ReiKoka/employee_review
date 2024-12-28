import { Goal, User } from '../models/index.js';

export const getAllGoals = async (req, res) => {
    try {
        const goals = await Goal.findAll();
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch goals', details: error.message });
    }
};

export const getGoalById = async (req, res) => {
    try {
        const { id } = req.params;
        const goal = await Goal.findByPk(id);

        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }

        res.status(200).json(goal);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch goal', details: error.message });
    }
};

export const createGoal = async (req, res) => {
    try {
        const { title, description, dueDate, status, employeeId } = req.body;

        if (!title || !description || !dueDate || !status || !employeeId) {
            res.status(400).json({ message: 'Some data is missing' });
        }
        const checkRole = await User.findByPk(employeeId);
        if (checkRole.role !== "employee") {
            return res.status(400).json({ message: 'user is not employee' });
        }

        const goal = await Goal.create({ title, description, dueDate, status, employeeId });
        res.status(201).json({ message: 'Goal created successfully', goal });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create goal', details: error.message });
    }
};

export const updateGoal = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate, status } = req.body;

        const goal = await Goal.findByPk(id);
        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }

        await goal.update({ title, description, dueDate, status });
        res.status(200).json({ message: 'Goal updated successfully', goal });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update goal', details: error.message });
    }
};

export const deleteGoal = async (req, res) => {
    try {
        const { id } = req.params;

        const goal = await Goal.findByPk(id);
        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }

        await goal.destroy();
        res.status(200).json({ message: 'Goal deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete goal', details: error.message });
    }
};


/** Employee controllers */

export const getAllGoalsEmployee = async (req, res) => {
    try {
        const goals = await Goal.findAll({ where: { employeeId: req.user.data.id } });
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch goals', details: error.message });
    }
};

export const updateGoalEmploye = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const goal = await Goal.findByPk(id);
        if (!goal) {
            return res.status(404).json({ error: 'Goal not found' });
        }

        await goal.update({ status });
        res.status(200).json({ message: 'Goal updated successfully', goal });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update goal', details: error.message });
    }
}

/** End Employee controllers */