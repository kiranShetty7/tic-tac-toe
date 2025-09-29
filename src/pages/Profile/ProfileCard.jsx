import React from "react";

const profileFields = [
  {
    label: "Number of matches",
    valueKey: "matches",
    prefix: "",
    color: "text-black-600",
  },
  {
    label: "Win percentage",
    valueKey: "winRate",
    prefix: "",
    color: "text-black-600",
  },
  {
    label: "Weekly Ranking",
    valueKey: "ranking.weekly",
    prefix: "#",
    color: "text-black-600",
  },
  {
    label: "All Time Ranking",
    valueKey: "ranking.allTime",
    prefix: "#",
    color: "text-black-600",
  },
];

const getValue = (obj, key) =>
  key.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);

const ProfileCard = ({ name, email, ranking, matches, winRate }) => (
  <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center border border-gray-100">
    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-5xl font-bold mb-4 text-blue-600 border-4 border-blue-200 shadow">
      {name[0]}
    </div>
    <h1 className="text-2xl font-bold mb-1 text-gray-900">{name}</h1>
    <p className="text-gray-500 mb-6 text-base">{email}</p>
    <div className="w-full flex flex-col gap-4">
      {profileFields.map(({ label, valueKey, prefix, color }) => (
        <div
          key={label}
          className="flex justify-between items-center bg-gray-50 rounded-lg p-4 border border-gray-200"
        >
          <span className="font-medium text-gray-700">{label}</span>
          <span className={`font-bold text-lg ${color}`}>
            {prefix}
            {getValue({ ranking, matches, winRate }, valueKey)}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default ProfileCard;
