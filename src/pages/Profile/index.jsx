import React from "react";
import Header from "../../components/Header";
import ProfileCard from "./ProfileCard";
import Footer from "../../components/Footer";

const mockProfile = {
  name: "Kiran Shetty",
  email: "kiran.shetty@email.com",
  ranking: {
    weekly: 5,
    allTime: 12,
  },
};

const Profile = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header userName={mockProfile.name} />
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <ProfileCard
          name={mockProfile.name}
          email={mockProfile.email}
          ranking={mockProfile.ranking}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
