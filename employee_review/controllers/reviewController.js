import { Review, User } from '../models/index.js';


/** Admin controllers
 * 
 */

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reviews', details: error.message });
    }
};

export const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByPk(id);

        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch review', details: error.message });
    }
};

export const createReview = async (req, res) => {
    try {
        const { comments, rating, employeeId } = req.body;
        const checkRole = await User.findByPk(employeeId);
        if (checkRole.role !== "employee") {
            return res.status(400).json({ message: 'user is not employee' });
        }
        const review = await Review.create({ comments, rating, employeeId, reviewerId: req.user.data.id });
        res.status(201).json({ message: 'Review created successfully', review });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create review', details: error.message });
    }
};

export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { comments, rating } = req.body;

        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        await review.update({ comments, rating });
        res.status(200).json({ message: 'Review updated successfully', review });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update review', details: error.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        await review.destroy();
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete review', details: error.message });
    }
};


/** End Admin controllers
 * 
 */



/** Manager controllers
 * 
 */
export const getAllReviewsManager = async (req, res) => {
    try {
        const reviews = await Review.findAll({ where: { reviewerId: req.user.data.id } });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reviews', details: error.message });
    }
};


/** End Manager controllers
 * 
 */


/** Employee controllers
 * 
 */
export const getAllReviewsEmployees = async (req, res) => {
    try {
        const reviews = await Review.findAll({ where: { employeeId: req.user.data.id } });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reviews', details: error.message });
    }
};


/** End Employee controllers
 * 
 */