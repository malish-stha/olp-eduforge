"use client";

import { useState } from "react";

import Heading from "@/app/utils/Heading";
import CreateCourse from "@/app/components/Admin/course/CreateCourse";
import Topbar from "@/app/components/Admin/topbar/Topbar";

const Page = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Heading
        title="Admin - EduForge"
        description="Empower students to learn and teachers to assist effortlessly with our intuitive EduForge dashboard, designed to enhance the online learning experience."
        keywords="Learning, Online courses, Programming, Coding, MERN"
      />
      <Topbar open={open} setOpen={setOpen} />
      <CreateCourse />
    </div>
  );
};

export default Page;
