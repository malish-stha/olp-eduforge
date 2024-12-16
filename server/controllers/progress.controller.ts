// import { Request, Response } from "express";
// import {
//   addVideoToProgress,
//   getProgressForCourse,
// } from "../services/progress.service";
// import CourseModel from "../models/course.model"; // Import your Course model

// export const addProgress = async (req: Request, res: Response) => {
//   const { courseId, videoId } = req.params;
//   const userId = req.user?.id; // Extracted from auth middleware

//   if (!userId) {
//     return res.status(400).json({ message: "User not authenticated" });
//   }

//   try {
//     // Get the course from the database and calculate the total number of videos
//     const course = await CourseModel.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     const totalVideos = course.courseData.length; // Assuming courseData contains video sections
//     await addVideoToProgress(userId, courseId, videoId, totalVideos);

//     res.status(200).json({ message: "Progress updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating progress", error });
//   }
// };

// export const getProgress = async (req: Request, res: Response) => {
//   const { courseId } = req.params;
//   const userId = req.user?.id;

//   if (!userId) {
//     return res.status(400).json({ message: "User not authenticated" });
//   }

//   try {
//     const progress = await getProgressForCourse(userId, courseId);
//     if (!progress) {
//       return res.status(404).json({ message: "Progress not found" });
//     }

//     res.status(200).json(progress);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching progress", error });
//   }
// };

import { Request, Response } from "express";
import {
  addVideoToProgress,
  getProgressForCourse,
} from "../services/progress.service";
import CourseModel from "../models/course.model";

export const addProgress = async (req: Request, res: Response) => {
  const { courseId, videoId } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ message: "User not authenticated" });
  }

  try {
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const totalVideos = course.courseData.length;
    await addVideoToProgress(userId, courseId, videoId, totalVideos);

    res.status(200).json({ message: "Progress updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating progress", error });
  }
};

export const getProgress = async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ message: "User not authenticated" });
  }

  try {
    const progress = await getProgressForCourse(userId, courseId);
    if (!progress) {
      return res.status(404).json({ message: "Progress not found" });
    }

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress", error });
  }
};
