import LoadingSpinner from "@/components/Profile/LoadingSpinner";
import Profile, { ProfileProps } from "@/components/Profile/Profile";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
// 


const ProfilePage: NextPage = () => {
  const [user, setUser] = useState<ProfileProps | undefined>();
  useEffect(() => {
    const userProfile = localStorage.getItem("user");
    if (userProfile) {
      try {
        const parsedUser = JSON.parse(userProfile);
        if (parsedUser && typeof parsedUser === 'object') {
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Failed to parse user profile:", error);
      }
    }
  }, []);
  
  if (!user) {
    return <div><LoadingSpinner/></div>; // or some other fallback UI
  }
  
  return (
    <div>
      <Profile
        firstName={user.firstName}
        profileImage={user.profileImage || "https://marketplace.canva.com/EAE-xnqWvJk/1/0/1600w/canva-retro-smoke-and-round-light-desktop-wallpapers-JLofAI27pCg.jpg"}
        lastName={user.lastName}
        email={user.email}
      />
    </div>
  );
};

export default ProfilePage;
