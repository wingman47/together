import React from "react";
import { useSelector } from "react-redux";

const Profile = ({ info }) => {
  const {
    email,
    firstName,
    impressions,
    lastName,
    location,
    occupation,
    viewedProfile,
  } = info;
  const friends = useSelector((state) => state.user.friends);
  
  return (
    <div className="max-w-md">
      {/* <!-- Profile Card --> */}
      <div class="p-3 rounded-lg bg-gray-100 border-4 border-blue-300">
        <h1 class="text-gray-900 font-bold text-xl px-3 leading-8 my-1">
          {firstName} {lastName}
        </h1>
        <h3 class="text-gray-700 font-medium text-base px-3 leading-6">
          {occupation}
        </h3>
        <p class="text-sm text-gray-500 hover:text-gray-600 px-3 pt-3 leading-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non
          deserunt
        </p>
        <ul class="bg-blue-200 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
          <li class="flex items-center py-3">
            <span class="font-medium">Profile Views</span>
            <span class="ml-auto">
              <span class="bg-gray-200 py-1 px-2 rounded text-gray-800 font-bold text-sm">
                {viewedProfile}
              </span>
            </span>
          </li>
          <li class="flex items-center py-3">
            <span class="font-medium">Location</span>
            <span class="ml-auto">{location}</span>
          </li>
        </ul>
      </div>
      {/* <!-- End of profile card --> */}
      <div class="my-5"></div>
      {/* <!-- Friends card --> */}
      <div class="rounded-lg border-4 border-blue-300 bg-gray-100 p-3 mb-5 hover:shadow">
        <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8 px-3">
          <span class="text-blue-300">
            <svg
              class="h-5 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </span>
          <span>Friends</span>
        </div>
        <div class="grid grid-cols-3 mt-5">
          {/* <div class="text-center my-2"> */}
          {friends && friends.length > 0 ? (
            friends.map((friend) => (
              <div class="text-center my-2" key={friend.id}>
                <img
                  class="h-16 w-16 rounded-full mx-auto"
                  src={`https://randomuser.me/api/portraits/women/${
                    Math.floor(Math.random() * 99) + 1
                  }.jpg`}
                  alt=""
                />
                <div class="text-main-color">
                  {friend.firstName} {friend.lastName}
                </div>
              </div>
            ))
          ) : (
            <h1 class="text-gray-700 text-base font-semibold px-3 pb-4">
              No friends
            </h1>
          )}
        </div>
      </div>
      {/* <!-- End of friends card --> */}
      {/* 
      <h3>{email}</h3>
      <h3>
        {firstName} {lastName}
      </h3>
      {friends.map((friend) => (
        <h1>
          {friend.firstName} {friend.lastName}
        </h1>
      ))}
      <h3>{impressions}</h3>
      <h3>{location}</h3>
      <h3>{occupation}</h3>
      <h3>{viewedProfile}</h3> */}
    </div>
  );
};

export default Profile;
