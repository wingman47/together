import Post from "../models/Post.js";
import User from "../models/User.js";

/* --------------------------------- CREATE --------------------------------- */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    // grab all the posts and send
    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/* ---------------------------------- READ ---------------------------------- */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    // req.params are included in URL
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(201).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* --------------------------------- UPDATE --------------------------------- */
// performs like post action by user
// each post has information of who has liked that post
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    // post information
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    // check if the post is liked by the user. each post has information of who has liked it.
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    // update the post once liked/unliked
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { comm } = req.body;
    const post = await Post.findById(id);
    console.log("comment received ", comm);
    if (comm) {
      post.comments.push(comm);
    }
    const updatedPost = await post.save();
    res.status(201).json(updatedPost.comments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};