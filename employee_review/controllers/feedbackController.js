import { Feedback } from '../models/index.js';

export const getAllFeedbacks = async (req, res) => {

    const { goalid } = req.params;

    try {
        const feedbacks = await Feedback.findAll({ where: { goalId: goalid } });
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch feedbacks', details: error.message });
    }
};

export const getFeedbackById = async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await Feedback.findByPk(id);

        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch feedback', details: error.message });
    }
};

export const createFeedback = async (req, res) => {
    try {
        const { text, goalId, reviewerId } = req.body;
        const { goalid } = req.params;

        const feedback = await Feedback.create({ text, goalId, reviewerId, goalId: Number(goalid) });
        res.status(201).json({ message: 'Feedback created successfully', feedback });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create feedback', details: error.message });
    }
};

export const updateFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        const feedback = await Feedback.findByPk(id);
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        await feedback.update({ text });
        res.status(200).json({ message: 'Feedback updated successfully', feedback });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update feedback', details: error.message });
    }
};

export const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;

        const feedback = await Feedback.findByPk(id);
        if (!feedback) {
            return res.status(404).json({ error: 'Feedback not found' });
        }

        await feedback.destroy();
        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete feedback', details: error.message });
    }
};
