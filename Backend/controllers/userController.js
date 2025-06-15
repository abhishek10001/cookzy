import validator from "validator";
import bycrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import cookModel from "../models/cookModel.js";
import bookingModel from "../models/bookingModel.js";
import razorpay from "razorpay";
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
    
    // Find cook data
    const cookData = await cookModel.findById(cookId).select("-password");
    if (!cookData) {
      return res.json({ success: false, message: "Cook not found" });
    }
    
    if (!cookData.available) {
      return res.json({ success: false, message: "Cook is not available" });
    }

    let slots_booked = cookData.slots_booked;

    // Check if the slot is already booked for the same date and time
    if (slots_booked[bookingDate]?.includes(bookingTime)) {
      return res.json({ success: false, message: "Slot not available" });
    }

    // Initialize the array for the date if it doesn't exist
    if (!slots_booked[bookingDate]) {
      slots_booked[bookingDate] = [];
    }

    // Add the new booking time
    slots_booked[bookingDate].push(bookingTime);

    // Get user data
    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Create a clean version of cookData without slots_booked
    const cleanCookData = cookData.toObject();
    delete cleanCookData.slots_booked;

    // Create booking record
    const bookingData = {
      userId,
      cookId,
      userData,
      cookData: cleanCookData,
      amount: cookData.fees,
      bookingDate,
      bookingTime,
      date: Date.now(),
    };

    // Save booking and update cook's slots in parallel
    const [newBooking] = await Promise.all([
      new bookingModel(bookingData).save(),
      cookModel.findByIdAndUpdate(cookId, { slots_booked }, { new: true })
    ]);

    if (!newBooking) {
      throw new Error("Failed to create booking");
    }

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Failed to book appointment"
    });
  }
};

//api logic tp get my bookings

const listBookings = async (req, res) => {
  try {
    const { userId } = req.body;
    const bookings = await bookingModel.find({ userId });
    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const cancelBookings = async (req, res) => {
  try {
    const { userId, bookingId } = req.body;
    const bookingData = await bookingModel.findById(bookingId);
    console.log(bookingData);
    if (bookingData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized" });
    }
    await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true });

    //releasing slots booked
    const { cookId, bookingDate, bookingTime } = bookingData;
    const cookData = await cookModel.findById(cookId);
    let slots_booked = cookData.slots_booked;
    slots_booked[bookingDate] = slots_booked[bookingDate].filter(
      (e) => e !== bookingTime
    );
    await cookModel.findByIdAndUpdate(cookId, { slots_booked });
    res.json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//confirm booking

const confirmBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const bookingData = await bookingModel.findById(bookingId);

    if (!bookingData || bookingData.cancelled) {
      return res.json({
        success: false,
        message: "Booking not found or Cancelled",
      });
    }

    // Simply return the current isconfirmed status rather than updating it
    res.json({
      success: true,
      isConfirmed: bookingData.isconfirmed,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// making payments using razorpay
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_TEST_KEY_ID,
  key_secret: process.env.RAZORPAY_TEST_KEY_SECRET,
});

const makePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const bookingData = await bookingModel.findById(bookingId);
    console.log(bookingData);
    if (!bookingData || bookingData.cancelled) {
      return res.json({
        success: false,
        message: "Boking not found or Cancelled",
      });
    }
    // creating options
    const options = {
      amount: bookingData.amount,
      currency: "INR",
      receipt: bookingId,
    };
    // creating order
    const order = await razorpayInstance.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const verifyRazorPay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    console.log(orderInfo);
    if (orderInfo.status === "paid") {
      await bookingModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });
      res.json({ success: true, message: "Payment successful" });
    } else {
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  reigisterUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  bookCook,
  listBookings,
  cancelBookings,
  confirmBooking,
  makePayment,
  verifyRazorPay,
};
