import cookModel from "../../Backend/models/cookModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import bookingModel from "../../Backend/models/bookingModel.js";

const changeAvailability = async (req, res, next) => {
  try {
    const { cookId } = req.body;
    const cookData = await cookModel.findById(cookId);
    await cookModel.findByIdAndUpdate(cookId, {
      available: !cookData.available,
    });
    res.json({ success: true, message: "Availability changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const cookList = async (req, res) => {
  try {
    const cooks = await cookModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, cooks });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//cook login

const cookLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const cook = await cookModel.findOne({ email });
    if (!cook) {
      return res.json({ success: false, message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, cook.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid email or password" });
    }
    if (isMatch) {
      const token = jwt.sign({ id: cook._id }, process.env.JWT_SECRET);

      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// api to get cook bookings for cook portal

const cookBookings = async (req, res) => {
  try {
    const { cookId } = req.body;
    const bookings = await bookingModel.find({ cookId });
    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// api to mark booking coompleted  IN COOK PANEL

const markBookingCompleted = async (req, res) => {
  try {
    const { cookId, bookingId } = req.body;
    const bookindData = await bookingModel.findById(bookingId);
    if (bookindData && bookindData.cookId === cookId) {
      await bookingModel.findByIdAndUpdate(bookingId, { isCompleted: true });
      res.json({
        success: true,
        message: "Booking marked completed successfully",
      });
    } else {
      res.json({ success: false, message: " access fAILED" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const markBookingCancelled = async (req, res) => {
  try {
    const { cookId, bookingId } = req.body;
    const bookindData = await bookingModel.findById(bookingId);
    if (bookindData && bookindData.cookId === cookId) {
      await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true });
      res.json({
        success: true,
        message: "Booking cancelled ",
      });
    } else {
      res.json({ success: false, message: " cancelleation failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const markBookingConfirmed = async (req, res) => {
  try {
    const { cookId, bookingId } = req.body;
    const bookindData = await bookingModel.findById(bookingId);
    if (bookindData && bookindData.cookId === cookId) {
      await bookingModel.findByIdAndUpdate(bookingId, { isconfirmed: true });
      res.json({
        success: true,
        message: "Booking Confirmed ",
      });
    } else {
      res.json({ success: false, message: " Confirmation failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const CookDashboard = async (req, res) => {
  try {
    const { cookId } = req.body;

    // Ensure cookId is valid
    if (!cookId) {
      return res.status(400).json({ success: false, message: "cookId is required" });
    }

    // Fetch all bookings for the cookId
    const bookings = await bookingModel.find({ cookId });

    let earnings = 0;
    let customers = new Set(); // Use Set to avoid duplicates

    bookings.forEach((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
      customers.add(item.userId);
    });

    // Create dashboard data
    const dashData = {
      earnings,
      bookings: bookings.length,
      customers: customers.length,
      latestBookings: bookings.slice(-5).reverse(), // Get the last 5 bookings in reverse order
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// api for getting cook profile


const getCookProfile = async (req, res) => {
  try {
    const { cookId } = req.body;
    const profileData = await cookModel.findById(cookId).select("-password");
    res.json({ success: true, profileData });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// api for updating cook profile

const updateCookProfile = async (req, res) => {
  try {
    const { cookId, fees, address , available ,signatureDish , about,name,experience  } = req.body;
    await cookModel.findByIdAndUpdate(cookId, {fees,address,available,signatureDish, about, name ,experience});
    res.json({ success: true, message: "Profile updated successfully" });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  cookList,
  cookLogin,
  cookBookings,
  markBookingCompleted,
  markBookingCancelled,
  markBookingConfirmed,
  CookDashboard,
  getCookProfile,
  updateCookProfile,
};
