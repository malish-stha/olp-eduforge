// import express from "express";
// import { isAuthenticated } from "../middleware/auth";
// import { addProgress, getProgress } from "../controllers/progress.controller";

// const progressRouter = express.Router();

// // Add a video to progress
// progressRouter.post("/:courseId/:videoId", isAuthenticated, addProgress);

// // Get progress for a course
// progressRouter.get("/:courseId", isAuthenticated, getProgress);

// export default progressRouter;

import express from "express";
import { isAuthenticated } from "../middleware/auth";
import { addProgress, getProgress } from "../controllers/progress.controller";

const progressRouter = express.Router();

// Add a video to progress
progressRouter.post("/:courseId/:videoId", isAuthenticated, addProgress);

// Get progress for a course
progressRouter.get("/:courseId", isAuthenticated, getProgress);

export default progressRouter;
