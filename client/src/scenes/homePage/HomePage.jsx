import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, setPosts } from "state";
import Posts from "components/Posts";
import Profile from "components/Profile";
import Navbar from "scenes/navbar/Navbar";

const HomePage = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);
  const { _id } = useSelector((state) => state.user);
  const loggedInUserId = useSelector((state) => state.user._id);
  const [info, setInfo] = useState(null);

  const getFriends = async () => {
    const response = await fetch(`http://localhost:3001/users/${_id}/friends`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
    console.log("getFriends ", data);
  };

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: {
        // send token inside Authorization header,
        // required by verifyToken middleware
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    console.log("posts ", data);
  };

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${_id}`, {
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

  useEffect(() => {
    getUser();
    getFriends();
    getPosts();
  }, []);
  const handleFriend = async (userId) => {
    const response = await fetch(
      `http://localhost:3001/users/${loggedInUserId}/${userId}`,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", e.target.description.value);
    if (e.target.picture.files[0]) {
      formData.append("picture", e.target.picture.files[0]);
      formData.append("picturePath", e.target.picture.files[0].name);
    }

    const response = await fetch("http://localhost:3001/posts", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    });
    const data = await response.json();
    e.target.description.value = "";
    dispatch(setPosts({ posts: data }));
    getPosts();
    if (response.ok || data.statusCode === 201) {
      alert("Successful");
    } else {
      alert("Unsuccessful");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col md:flex-row mx-5 gap-5">
        <div className="flex flex-col items-center">
          <form
            action="/posts"
            onSubmit={handleSubmit}
            method="post"
            className="flex mx-auto flex-col gap-3 mb-5"
          >
            <div class="w-full rounded-lg bg-gray-100">
              <div class="p-4 bg-gray-100 rounded-t-lg">
                <label for="comment" class="sr-only">
                  Your comment
                </label>
                <textarea
                  name="description"
                  id="comment"
                  rows="4"
                  class="w-full font-medium text-base outline-none border-none bg-transparent px-0 text-gray-900 bg-gray-100 border-0 focus:ring-0"
                  placeholder="What's on your mind?"
                  required
                />
              </div>
              <div class="flex items-center rounded-b-lg justify-between px-5 py-4 bg-slate-200">
                <button
                  type="submit"
                  class="inline-flex items-center py-2 px-4 text-base font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                >
                  Post
                </button>
                <div class="flex pl-0 space-x-1 sm:pl-2">
                  <input
                    accept="image/*"
                    type="file"
                    id="select-image"
                    style={{ display: "none" }}
                    name="picture"
                  />
                  <label htmlFor="select-image">
                    <svg
                      class="w-5 h-5 text-black cursor-pointer"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                    <span class="sr-only">Upload image</span>
                  </label>
                </div>
              </div>
            </div>
            <p class="text-xs text-gray-900">
              Remember, contributions to this topic should follow our{" "}
              <span class="text-blue-600 cursor-pointer">
                Community Guidelines
              </span>
              .
            </p>
          </form>
          {info ? <Profile info={info} /> : <p>Loading</p>}
        </div>

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

export default HomePage;

{
  /* <form
  action="/posts"
  onSubmit={handleSubmit}
  method="post"
  className="flex mx-auto flex-col gap-5 max-w-xs md:max-w-md"
>
  <TextField
    label="Post"
    multiline
    rows={2}
    placeholder="Write something..."
    variant="filled"
    name="description"
    required
  />
  <input
    accept="image/*"
    type="file"
    id="select-image"
    style={{ display: "none" }}
    name="picture"
  />
  <label htmlFor="select-image">
    <Button variant="contained" color="primary" component="span">
      Upload Image
    </Button>
  </label>
  <Button
    variant="contained"
    type="submit"
    sx={{
      width: "100%",
    }}
  >
    Submit
  </Button>
</form>; */
}
