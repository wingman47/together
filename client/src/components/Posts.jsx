import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { setFriends, setPost } from "state";
import CommentIcon from "@mui/icons-material/Comment";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Posts = ({
  handleFriend,
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  // State to hold like counts
  const [likeCounts, setLikeCounts] = useState({});
  const [liked, setLiked] = useState(Boolean(likes[loggedInUserId]));
  const likeCount = likeCounts[_id] || Object.keys(likes).length;
  const [comment, setComment] = useState(false);
  const [comm, setComm] = useState(comments);

  const firstNames = [
    "John",
    "Emma",
    "Liam",
    "Olivia",
    "Noah",
    "Ava",
    "William",
    "Isabella",
    "James",
    "Sophia",
    "Oliver",
    "Charlotte",
    "Benjamin",
    "Amelia",
    "Elijah",
    "Mia",
  ];

  const lastNames = [
    "Smith",
    "Johnson",
    "Brown",
    "Williams",
    "Jones",
    "Miller",
    "Davis",
    "Garcia",
    "Rodriguez",
    "Martinez",
    "Wilson",
    "Anderson",
    "Taylor",
    "Thomas",
    "Jackson",
    "White",
  ];

  function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  function generateRandomName() {
    const randomFirstName = getRandomElement(firstNames);
    const randomLastName = getRandomElement(lastNames);
    return `${randomFirstName} ${randomLastName}`;
  }

  useEffect(() => {
    setComm(comments);
  }, [comments]);

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${_id}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    console.log(updatedPost);
    if (response.ok) {
      // Update the like count in the state
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [_id]: Object.keys(updatedPost.likes).length,
      }));
    }
    liked ? setLiked(false) : setLiked(true);
  };

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${_id}/comment`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comm: e.target.comm.value }),
        }
      );
      const data = await response.json();
      setComm(data);
      e.target.comm.value = "";
      console.log("comments ", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <article class="mb-5 break-inside break-inside-avoid mx-auto p-3 md:p-6 border-4 border-blue-300 rounded-lg bg-gray-100 flex flex-col bg-clip-border max-w-md">
        <div class="flex pb-6 items-center justify-between ">
          <div class="flex items-center">
            <div class="inline-block mr-4 cursor-pointer">
              <Avatar
                onClick={() => navigate(`/profile/${userId}`)}
                sx={{ bgcolor: red[500] }}
                alt={`${firstName} ${lastName}`}
                src={`http://localhost:3001/assets/${userPicturePath}`}
              />
            </div>
            <div class="flex flex-col">
              <div>
                <div class="inline-block text-lg font-bold">
                  {`${firstName} ${lastName}`}
                </div>
              </div>
              <div class="text-slate-500">{location}</div>
            </div>
          </div>
          <IconButton aria-label="add friend" onClick={handleFriend}>
            <PersonAddIcon className="text-gray-900" />
          </IconButton>
        </div>
        {/* <h2 class="text-3xl font-extrabold">Web Design templates Selection</h2> */}
        <div>
          <div class="flex justify-between gap-1 mb-1">
            <div class="flex">
              {picturePath ? (
                <img
                  class="max-w-full rounded-lg"
                  src={`http://localhost:3001/assets/${picturePath}`}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <p>{`${description}`}</p>
        <div class="py-4">
          <div class="inline-flex items-center">
            <span class="mr-1">
              <IconButton
                aria-label="add to favorites"
                onClick={() => patchLike()}
              >
                {liked ? (
                  <FavoriteIcon sx={{ color: "red" }} />
                ) : (
                  <FavoriteIcon />
                )}
              </IconButton>
            </span>
            <span class="text-lg font-bold mr-3">{`${likeCount}`}</span>
            <IconButton aria-label="comment">
              <CommentIcon
                className="mx-auto"
                onClick={() => {
                  comment ? setComment(false) : setComment(true);
                }}
              />
            </IconButton>
          </div>
        </div>
        <div class="relative">
          <form action="" method="PATCH" onSubmit={postComment}>
            <input
              class="pt-2 pb-2 pl-3 w-full h-11 bg-slate-200 rounded-lg placeholder:text-slate-600 font-medium pr-20 !outline-none"
              type="text"
              name="comm"
              placeholder="Write a comment"
            />
            <button type="submit">
              <span className="flex absolute right-3 top-2/4 -mt-3 items-center">
                <svg
                  className="fill-blue-500"
                  style={{ width: "26px", height: "26px" }}
                  viewBox="0 0 24 24"
                >
                  <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
                </svg>
              </span>
            </button>
          </form>
        </div>
        {/* <!-- Comments content --> */}
        {comment ? (
          comm.map((comment, index) => (
            <>
              <div class="pt-6">
                <div class="media flex pb-4">
                  <div class="inline-block mr-4">
                    <img
                      class="rounded-full max-w-none w-12 h-12"
                      src={`https://randomuser.me/api/portraits/women/${
                        Math.floor(Math.random() * 99) + 1
                      }.jpg`}
                    />
                  </div>
                  <div class="media-body">
                    <div>
                      <div class="inline-block text-base font-bold mr-2">
                        {generateRandomName()}
                      </div>
                      <span class="text-slate-500">
                        {Math.floor(Math.random() * 59) + 0} minutes ago
                      </span>
                    </div>
                    <p>{comment}</p>
                    <div class="mt-2 flex items-center">
                      <div class="inline-flex items-center py-2 mr-3 cursor-pointer">
                        <span class="mr-2">
                          <svg
                            class="fill-rose-600"
                            style={{ width: "26px", height: "26px" }}
                            viewBox="0 0 24 24"
                          >
                            <path d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"></path>
                          </svg>
                        </span>
                        <span class="text-base font-bold">
                          {Math.floor(Math.random() * 59) + 1}
                        </span>
                      </div>
                      <button class="py-2 px-4 font-medium hover:bg-slate-50 rounded-lg transition">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <></>
        )}
      </article>
    </>
  );
};

export default Posts;

{
  /* <Card key={_id} sx={{ maxWidth: 345 }}>
  <IconButton aria-label="add friend" onClick={handleFriend}>
    <PersonAddIcon />
  </IconButton>
  <CardHeader
    onClick={() => navigate(`/profile/${userId}`)}
    sx={{
      "&:hover": {
        cursor: "pointer",
      },
    }}
    avatar={
      <Avatar
        sx={{ bgcolor: red[500] }}
        alt={`${firstName} ${lastName}`}
        src={`http://localhost:3001/assets/${userPicturePath}`}
      />
    }
    title={`${firstName} ${lastName}`}
    subheader={location}
  />
  {picturePath ? (
    <CardMedia
      component="img"
      height="194"
      image={`http://localhost:3001/assets/${picturePath}`}
      alt="Paella dish"
    />
  ) : (
    <></>
  )}
  <CardContent>
    <Typography variant="body2" color="text.secondary">
      {`${description}`}
    </Typography>
  </CardContent>
  <CardActions disableSpacing>
    <IconButton aria-label="add to favorites" onClick={() => patchLike()}>
      {liked ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteIcon />}
    </IconButton>
    <Typography variant="body2" color="text.secondary">
      {`${likeCount}`}
    </Typography>
    <IconButton aria-label="comment">
      <CommentIcon
        onClick={() => {
          comment ? setComment(false) : setComment(true);
        }}
      />
    </IconButton>
  </CardActions>
  {comment ? (
    <form action="" method="PATCH" onSubmit={postComment}>
      <TextField
        id="standard-multiline-flexible"
        label="Write Comment"
        multiline
        maxRows={4}
        name="comm"
        variant="standard"
      />
      <Button
        variant="contained"
        type="submit"
        sx={{
          width: "100%",
        }}
      >
        Submit
      </Button>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        {comm.map((coment, index) => (
          <>
            <ListItem alignItems="flex-start">
              <ListItemText secondary={<>{coment}</>} />
            </ListItem>
            {index !== comm.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </>
        ))}
      </List>
    </form>
  ) : (
    <p></p>
  )}
</Card>; */
}
