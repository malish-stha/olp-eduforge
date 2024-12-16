import CourseModel from "../models/course.model";

export const getRecommendations = async () => {
  try {
    // Fetch all courses
    const allCourses = await CourseModel.find();
    console.log("All courses:", allCourses);

    // Create a map to store course ratings
    const courseRatings: { [key: string]: number[] } = {};

    // Populate the courseRatings map from the reviews array
    allCourses.forEach((course) => {
      if (!courseRatings[course._id]) {
        courseRatings[course._id] = [];
      }
      course.reviews.forEach((review: any) => {
        courseRatings[course._id].push(review.rating);
      });
    });
    console.log("Course ratings:", courseRatings);

    // Calculate the average rating for each course
    const averageRatings: { [key: string]: number } = {};
    for (const courseId in courseRatings) {
      const ratings = courseRatings[courseId];
      if (ratings.length > 0) {
        const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
        const averageRating = totalRating / ratings.length;
        averageRatings[courseId] = averageRating;
      } else {
        averageRatings[courseId] = 0;
      }
    }
    console.log("Average ratings:", averageRatings);

    // Filter courses with an average rating greater than 3
    const filteredCourses = Object.keys(averageRatings).filter((courseId) => {
      const averageRating = averageRatings[courseId];
      return averageRating > 3;
    });
    console.log("Filtered courses:", filteredCourses);

    // Sort filtered courses by average rating
    const sortedCourses = filteredCourses.sort((a, b) => {
      const ratingA = averageRatings[a];
      const ratingB = averageRatings[b];
      if (ratingA > ratingB) {
        return -1;
      } else if (ratingA < ratingB) {
        return 1;
      } else {
        return 0;
      }
    });
    console.log("Sorted courses:", sortedCourses);

    // Recommend top 5 courses
    const recommendedCourses = sortedCourses
      .slice(0, 5)
      .map((courseId) =>
        allCourses.find((course) => course._id.toString() === courseId)
      );
    console.log("Recommended courses:", recommendedCourses);

    return recommendedCourses;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};
