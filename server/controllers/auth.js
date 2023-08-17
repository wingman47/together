import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* ----------- controller stores function to handle all the routes ---------- */

/* -------------------------------------------------------------------------- */
/*                                REGISTER USER                               */
/* -------------------------------------------------------------------------- */

// get request body from frontend
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    // encrypt the pw to store in database
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    /* 
      flow of JWT:
      user registers the password, we salt it and store in our database
      user logs in -> we salt it again and match it with the salted pw in db
      if successful, we provide JWT and verify when needed
    */

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    // 201: creation successful
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("controller: auth.js", err);
  }
};

/* -------------------------------------------------------------------------- */
/*                                 LOGGING IN                                 */
/* -------------------------------------------------------------------------- */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "USER NOT FOUND" });

    // using same salt to compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "INVALID CREDENTIALS" });

    // if correct credentials, sign the token containing the payload (user._id in this case)
    // the first argument is payload which contains the information
    // whenever jwt is verified in verifyToken middleware it will return this payload
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    console.log(user);
    // client can include this token in subsequent requests to access protected routes, and the
    // server can verify the token's authenticity to give access to different api
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
