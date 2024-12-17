// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';

// import Loader from '@/app/components/Loader/Loader';
// import CourseCard from '@/app/components/course/CourseCard';
// import { Course } from '@/app/components/course/Courses';
// import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi';
// import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';

// const CoursesPage = () => {
//   const searchParams = useSearchParams();
//   const search = searchParams?.get('title') || '';
//   const [courses, setCourses] = useState([]);
//   const [category, setCategory] = useState('All');

//   const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
//   const { data: categoriesData } = useGetHeroDataQuery('Categories', {});

//   useEffect(() => {
//     if (category === 'All') {
//       setCourses(data?.courses);
//     }

//     if (category !== 'All') {
//       setCourses(
//         data?.courses.filter(
//           (course: Course) => course?.categories === category
//         )
//       );
//     }

//     if (search) {
//       setCourses(
//         data?.courses.filter((course: Course) =>
//           course?.name.toLowerCase().includes(search.toLowerCase())
//         )
//       );
//     }
//   }, [data, category, search]);

//   const categories = categoriesData?.layout.categories;

//   return (
//     <div>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="w-[80%] mx-auto">
//           <div className="w-full flex items-center flex-wrap">
//             <div
//               className={`h-[35px] m-2 px-3 rounded-3xl flex items-center justify-center font-Poppins cursor-pointer ${
//                 category === 'All'
//                   ? 'bg-[#f32a52c5] text-white'
//                   : 'bg-gray-400 text-white'
//               }`}
//             >
//               All
//             </div>
//             {categories &&
//               categories.map((cat: any, index: number) => (
//                 <div key={index}>
//                   <div
//                     className={`h-[35px] m-1 px-3 rounded-3xl text-white flex items-center justify-center font-Poppins cursor-pointer ${
//                       category === cat.title ? 'bg-[#f32a52c5]' : 'bg-gray-400'
//                     }`}
//                     onClick={() => setCategory(cat.title)}
//                   >
//                     {cat.title}
//                   </div>
//                 </div>
//               ))}
//           </div>
//           {courses && courses.length === 0 && (
//             <div className="flex flex-col items-center justify-center mt-14">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-16 h-16 text-gray-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 14l9-5-9-5-9 5 9 5z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 14l9-5-9-5-9 5 9 5z"
//                 />
//               </svg>
//               <p className="text-xl text-gray-600 mb-4">No courses found.</p>
//             </div>
//           )}
//           <br />
//           <br />
//           <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
//             {courses &&
//               courses.map((course: Course, index: number) => (
//                 <CourseCard course={course} key={index} />
//               ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CoursesPage;

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Loader from "@/app/components/Loader/Loader";
import CourseCard from "@/app/components/course/CourseCard";
import { Course } from "@/app/components/course/Courses";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";

// Scoring function for complex name-based matching
const calculateNameScore = (query: string, name: string): number => {
  if (!query || !name) return 0;

  query = query.toLowerCase();
  name = name.toLowerCase();

  // Assign scores based on match type
  if (name === query) return 1.0; // Exact match
  if (name.startsWith(query)) return 0.8; // Starts with
  if (name.includes(query)) return 0.6; // Partial match

  // No match
  return 0;
};

// Search algorithm for complex name matching
const complexNameSearch = (courses: Course[], query: string): Course[] => {
  if (!query) return courses; // If no query, return all courses

  // Apply scoring to courses based on name relevance
  const scoredCourses = courses.map((course) => {
    const score = calculateNameScore(query, course.name);
    return { ...course, score };
  });

  // Filter out courses with zero score and sort by score in descending order
  return scoredCourses
    .filter((course) => course.score > 0)
    .sort((a, b) => b.score - a.score);
};

const CoursesPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title") || "";
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});

  useEffect(() => {
    if (!data?.courses) return;

    // Use the complex name search algorithm
    const filteredCourses = complexNameSearch(data.courses, searchQuery);
    setCourses(filteredCourses);
  }, [data, searchQuery]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[80%] mx-auto">
          {/* Search Input */}
          <div className="w-full flex items-center mt-4">
            <input
              type="text"
              placeholder="Search courses by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* No Courses Found */}
          {courses && courses.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-14">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <p className="mt-4 text-gray-500">No courses found</p>
            </div>
          )}

          {/* Course List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {courses &&
              courses.map((course: Course) => (
                <CourseCard key={course._id} course={course} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
