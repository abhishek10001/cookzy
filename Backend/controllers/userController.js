import validator from "validator";
import bycrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import cookModel from "../models/cookModel.js";
import bookingModel from "../models/BookingModel.js";
const reigisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Miissing Details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "enter a strong password" });
    }

    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const ismatch = await bycrypt.compare(password, user.password);
    if (ismatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId);
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    console.log("hello", userId);
    console.log(req.body);
    const imgFile = req.file;
    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      dob,
      gender,
      address: JSON.parse(address),
    });
    if (imgFile) {
      const imgUpload = await cloudinary.uploader.upload(imgFile.path, {
        resource_type: "image",
      });
      const imgURL = imgUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imgURL });
    }
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// logic to book a cook

const bookCook = async (req, res) => {
  try {
    const { userId, cookId, bookingDate, bookingTime } = req.body;
    const cookData = await cookModel.findById(cookId).select("-password");
    if (!cookData.available) {
      return res.json({ success: false, message: "Cook is not available" });
    }

    let slots_booked = cookData.slots_booked;

    // check if the slot is already booked for the same date and time

    if (slots_booked[bookingDate]) {
      if (slots_booked[bookingDate].includes(bookingTime)) {
        return res.json({ success: false, message: "slot not available" });
      } else {
        slots_booked[bookingDate].push(bookingTime);
        cookModel.findByIdAndUpdate(cookId, { slots_booked }, (err, doc) => {
          if (err) return res.json({ success: false, message: err.message });
          res.json({ success: true, message: "Slot booked successfully" });
        });
      }
    } else {
      slots_booked[bookingDate] = [];
      slots_booked[bookingDate].push(bookingTime);
    }
    const userData = await userModel.findById(userId).select("-password");
    delete cookData.slots_booked;
    const bookingData = {
      userId,
      cookId,
      userData,
      cookData,
      amount: cookData.fees,
      bookingDate,
      bookingTime,
      date: Date.now()
    };
    const newBooking = new bookingModel(bookingData);
    await newBooking.save();

    //saing in cooks data
    await cookModel.findByIdAndUpdate(cookId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api logic tp get my bookings

const listBookings =async (req, res) => {
  try {
    const { userId } = req.body;
    const bookings = await bookingModel.find({ userId })
    res.json({ success: true, bookings });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
}



export {
  reigisterUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  bookCook,listBookings
};
