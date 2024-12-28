import { Goal, Review } from "@/utils/types";

export function filterUserGoals(allGoals: Goal[], userId: number) {
  return allGoals?.filter((goal) => goal.employeeId === userId) || [];
}

export function filterUserReviews(allReviews: Review[], userId: number) {
  return allReviews?.filter((review) => review.employeeId === userId) || [];
}

export function computeAverageRating(reviews: Review[]) {
  return reviews?.length
    ? reviews.reduce((acc, cur) => acc + cur.rating, 0) / reviews.length
    : 0;
}

export function completedGoalsCount(goals: Goal[]) {
  return goals?.filter((goal) => goal.status === "completed").length || 0;
}
