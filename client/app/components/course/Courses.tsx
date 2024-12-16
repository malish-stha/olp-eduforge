"use client";

import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import axios from "axios";

interface Thumbnail {
  public_id: string;
  url: string;
}
interface Benefit {
  title: string;
  _id: string;
}

interface CourseData {
  title: string;
  description: string;
  videoSection: string;
  videoLength: number;
  _id: string;
}

interface Prerequisite {
  title: string;
  _id: string;
}

export interface Course {
  _id: string;
  thumbnail: Thumbnail;
  benefits: Benefit[];
  categories: string;
  courseData: CourseData[];
  createdAt: string;
  demoUrl: string;
  description: string;
  estimatedPrice: number;
  level: string;
  name: string;
  prerequisites: Prerequisite[];
  price: number;
  purchased: number;
  ratings: number;
  reviews: any[];
  tags: string;
  updatedAt: string;
  __v: number;
  success: boolean;
}

const Courses = () => {
  const { data, isLoading } = useGetUsersAllCoursesQuery({});
  const [courses, setCourses] = useState<Course[]>([]);

  const [recommendations, setRecommendations] = useState([]);

  // useEffect(() => {
  //   setCourses(data?.courses);
  // }, [data]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URI}recommendations`
        );
        setRecommendations(response.data.recommendations);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className={`w-[90%] 800px:w-[80%] m-auto`}>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 mb-12">
        <article>
          <h2 className="text-2xl font-Poppins font-extrabold text-gray-900 dark:text-white">
            <span className="text-gradient">Recommended</span> Courses
          </h2>
          <section className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
            {/* {courses &&
              courses.map((course: Course, index: number) => (
                <CourseCard course={course} key={index} />
              ))} */}
            {recommendations.map((course, index) => (
              <CourseCard course={course} key={index} />
            ))}
          </section>
        </article>
      </section>
    </div>
  );
};

export default Courses;
