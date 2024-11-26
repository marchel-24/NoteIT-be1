const User = require("../models/user");
const bcrypt = require("bcryptjs"); // For password hashing
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5000/auth/google/callback"
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const authorizationUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
});

exports.createUser = async (req, res) => {
  const { email, password } = req.body;

  const user = new User({
    email,
    password,
  });
  await user.save();
  res.status(200).json({
    message: "User created successfully!",
    data: email,
  });
};

exports.deleteUser = async (req, res) => {
  const { email } = req.params;

  User.findByIdAndDelete(email)
    .then(() => {
      res.status(200).json({
        message: "User deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide both name and password",
    });
  }

  // Find the user by name
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }

  // Compare the provided password with the hashed password in DB
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      status: "fail",
      message: "Incorrect password",
    });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  // Password is correct, login successful
  res.status(200).json({
    status: "success",
    message: "Login successful",
    data: {
      userId: user._id,
      email: user.email,
    },
  });
};

exports.googleLogin = async (req, res) => {
  res.redirect(authorizationUrl);
};

exports.googleCallback = async (req, res) => {
  const { code } = req.query;

  const { tokens } = await oauth2Client.getToken(code);

  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: "v2",
  });

  const { data } = await oauth2.userinfo.get();

  let user;

  if (data) {
    const email = data.email;

    user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email: email,
      });

      await user.save();

      return res.status(200).json({
        status: "success",
        message: "Login successful",
        data: {
          userId: user._id,
          email: user.email,
        },
      });
    }
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  // Password is correct, login successful
  res.status(200).json({
    status: "success",
    message: "Login successful",
    data: {
      userId: user._id,
      email: user.email,
    },
  });
};
