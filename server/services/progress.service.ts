// import Progress from "../models/progress.model";

// export const addVideoToProgress = async (
//   userId: string,
//   courseId: string,
//   videoId: string,
//   totalVideos: number
// ): Promise<void> => {
//   const progress = await Progress.findOne({ userId, courseId });

//   if (progress) {
//     if (!progress.completedVideos.includes(videoId)) {
//       progress.completedVideos.push(videoId);

//       // Check if the course is complete
//       if (progress.completedVideos.length >= totalVideos) {
//         progress.isCompleted = true;
//       }

//       await progress.save();
//     }
//   } else {
//     // Create a new progress record if one doesn't exist
//     const isCompleted = totalVideos === 1;
//     await Progress.create({
//       userId,
//       courseId,
//       completedVideos: [videoId],
//       isCompleted,
//     });
//   }
// };

// export const getProgressForCourse = async (
//   userId: string,
//   courseId: string
// ) => {
//   return (
//     (await Progress.findOne({ userId, courseId })) || {
//       completedVideos: [],
//       isCompleted: false,
//     }
//   );
// };

import Progress from "../models/progress.model";

export const addVideoToProgress = async (
  userId: string,
  courseId: string,
  videoId: string,
  totalVideos: number
): Promise<void> => {
  const progress = await Progress.findOne({ userId, courseId });

  if (progress) {
    if (!progress.completedVideos.includes(videoId)) {
      progress.completedVideos.push(videoId);

      // Check if the course is complete
      if (progress.completedVideos.length >= totalVideos) {
        progress.isCompleted = true;
      }

      await progress.save();
    }
  } else {
    // Create a new progress record if one doesn't exist
    const isCompleted = totalVideos === 1;
    await Progress.create({
      userId,
      courseId,
      completedVideos: [videoId],
      isCompleted,
    });
  }
};

export const getProgressForCourse = async (
  userId: string,
  courseId: string
) => {
  return (
    (await Progress.findOne({ userId, courseId })) || {
      completedVideos: [],
      isCompleted: false,
    }
  );
};
