import jwt from "jsonwebtoken";

/* -------------------------------------------------------------------------- */
/*                                AUTHORIZATION                               */
/* -------------------------------------------------------------------------- */

export const verifyToken = async (req, res, next) => {
  // when i login in the frontend, i get a signed jwt conatining the payload it signed. now, when i try to access /posts,
  // the middleware verifyToken is called in the process router.get("/:userId/posts", verifyToken, getUserPosts).
  // now, verifyToken access the token from request header and verifies it. if the verification is unsuccessful, error is thrown
  // otherwise next middleware i.e getUserPosts is called.
  try {
    // access JWT from request header
    // Authorization header stores the authentication token
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("Access Denied");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    // after verification, it will generate user._id which is stored as payload in login controller
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/*  
    We can insert this middleware in any request handler to verify token. 
    Ex: app.post("/profile/", verifyToken, profileHandle);
 
    When a client sends an HTTP request to the server, it can include additional 
    information, such as headers, in the request. The Authorization header is commonly
    used to send authentication information, including JWTs, with the request. JWTs are
    typically included in the Authorization header
*/
