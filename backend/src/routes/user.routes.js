import { Router } from "express";
import {
  changePassword,
  fetchAllUsers,
  getUserDetails,
  loginUser,
  logOutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
const router = Router();

// router.post(
//   "/register",
//   upload.fields([
//     {
//       name: "avatar",
//       maxCount: 1,
//     },
//   ]),
//   registerUser
// );
// router.post("/sendCode", sendCode)
// router.post("/verifyCode", verifyCode)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Step 1: Validate the input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Step 2: Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Step 3: Compare the provided password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Step 4: Create a JWT token for the user
    const payload = {
      userId: user._id,
      role: user.role, // You can add more data to the payload as needed
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Step 5: Send the response with token
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        fullName: user.fullname, // Assuming you have a fullname field
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post("/logout", verifyJWT, logOutUser);
router.get("/user-details", verifyJWT, getUserDetails);
router.post("/refresh-token", refreshAccessToken);
router.post("/change-password", verifyJWT, changePassword);
router.patch(
  "/change-avatar",
  verifyJWT,
  upload.single("avatar"),
  updateUserAvatar
);
router.patch("/update-details", verifyJWT, updateAccountDetails);
router.get("/getAllUsers", fetchAllUsers);
router.post('/register', async (req, res) => {
  const { fullName, email, password, role } = req.body;
  console.log(req.body)
  // Validate request body
  // if (!fullname || !email || !password || !role) {
  //   return res.status(400).json({ message: 'All fields are required' });
  // }

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullname: fullName,
      email,
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
