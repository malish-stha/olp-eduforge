"use client";

import Heading from "@/app/utils/Heading";
import EditCourse from "@/app/components/Admin/course/EditCourse";
import Topbar from "@/app/components/Admin/topbar/Topbar";
import { useState } from "react";

const Page = ({ params }: any) => {
  const courseId = params?.id;

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Heading
        title="Admin - EduForge"
        description="Empower students to learn and teachers to assist effortlessly with our intuitive EduForge dashboard, designed to enhance the online learning experience."
        keywords="Learning, Online courses, Programming, Coding, MERN"
      />
      <Topbar open={open} setOpen={setOpen} />
      <EditCourse courseId={courseId} />
    </div>
  );
};

export default Page;
