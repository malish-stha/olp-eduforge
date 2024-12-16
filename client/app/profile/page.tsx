"use client";

import { useState } from "react";

import Heading from "../utils/Heading";
import Header from "../components/Header";
import { useSelector } from "react-redux";

import Profile from "../components/Profile/Profile";
import Protected from "../hooks/useProtected";
import Footer from "../components/Footer";

type Props = {};

const Page: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");

  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="min-h-screen">
      <Protected>
        <Heading
          title={`${user?.name} Profile - EduForge online courses`}
          description="
        Elevate Learning, 
        Anywhere, Anytime. 
        Explore a world of knowledge with our EduForge eLearning platform. 
        Join educators and learners worldwide on a journey of discovery."
          keywords="Learning, Online courses, Programming, Coding, MERN"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Profile user={user} />
        <Footer />
      </Protected>
    </div>
  );
};

export default Page;
