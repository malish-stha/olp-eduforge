// // import mongoose, { Document, Model, Schema } from "mongoose";

// // const progressSchema = new mongoose.Schema({
// //   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// //   courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
// //   completedVideos: [String], // Array of video IDs
// //   isCompleted: { type: Boolean, default: false },
// // });

// // const Progress = mongoose.model("Progress", progressSchema);

// import mongoose, { Document, Model, Schema } from "mongoose";

// interface IProgress extends Document {
//   userId: mongoose.Schema.Types.ObjectId;
//   courseId: mongoose.Schema.Types.ObjectId;
//   completedVideos: string[]; // Array of video IDs
//   isCompleted: boolean;
// }

// const progressSchema: Schema<IProgress> = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     courseId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Course",
//       required: true,
//     },
//     completedVideos: { type: [String], default: [] },
//     isCompleted: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// const Progress: Model<IProgress> = mongoose.model<IProgress>(
//   "Progress",
//   progressSchema
// );

// export default Progress;

import mongoose, { Document, Model, Schema } from "mongoose";

interface IProgress extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  courseId: mongoose.Schema.Types.ObjectId;
  completedVideos: string[];
  isCompleted: boolean;
}

const progressSchema: Schema<IProgress> = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedVideos: { type: [String], default: [] },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Progress: Model<IProgress> = mongoose.model<IProgress>(
  "Progress",
  progressSchema
);

export default Progress;
