import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setFriends, setPosts } from "state";
import Posts from "components/Posts";
import Profile from "components/Profile";
import Navbar from "scenes/navbar/Navbar";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);
  const loggedInUserId = useSelector((state) => state.user._id);
  const [info, setInfo] = useState(null);

  // send token and id to get response from /users/id
  // same process for getUserFriends
  const fun = async () => {
    const response = await fetch(
      // this url is from where server extracts information using req.params
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    console.log("profileData ", data);
    // console.log("posts data ", posts);
  };

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setInfo(data);
    console.log("getUser ", data);
  };

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/friends`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
    console.log("getFriends ", data);
  };

  const handleFriend = async (userId) => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/${loggedInUserId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
    console.log("handleFriend ", data);
  };

  useEffect(() => {
    getUser();
    getFriends();
    fun();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col md:flex-row mx-5 gap-5">
        {info ? <Profile info={info} /> : <p>Loading</p>}
        <div>
          {posts ? (
            posts.map(
              ({
                _id,
                userId,
                firstName,
                lastName,
                description,
                location,
                picturePath,
                userPicturePath,
                likes,
                comments,
              }) => {
                return (
                  <Posts
                    handleFriend={() => handleFriend(userId)}
                    _id={_id}
                    postId={_id}
                    userId={userId}
                    firstName={firstName}
                    lastName={lastName}
                    description={description}
                    location={location}
                    picturePath={picturePath}
                    userPicturePath={userPicturePath}
                    likes={likes}
                    comments={comments}
                  />
                );
              }
            )
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
