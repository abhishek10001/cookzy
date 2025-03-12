// API for adding cook
import validator from 'validator';

import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary';
import cookModel from '../models/cookModel.js';
import jwt from 'jsonwebtoken';
const addCook = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      image,
      speciality,
      signatureDish,
      review,
      experience,
      about,
      available,
      fees,
      address,
      date,
      slots_booked,
    } = req.body;

    const imageFile = req.file;
//checking for all data to add cook

if(!email || !name || !password || !speciality || !signatureDish || !experience  || !address || !about  || !fees ){

  return res.json({success:false , message:"Missing Details"})
}

if (!validator.isEmail(email)) {
  return res.json({success:false , message:"Please enter a valid email address"})
}

// validating stron pass

if(password.length<8){

  return res.json({success:false , message:"Please enter a strong password"})
}

const salt = await bcrypt.genSalt(10)

const hashedPassword = await bcrypt.hash(password, salt);

// upload image to cloudinary

const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
const imagUrl = imageUpload.secure_url

const cookData = {
  name,
  email,
  password: hashedPassword,
  image: imagUrl,
  speciality,
  signatureDish:JSON.parse(signatureDish),
  review,
  experience,
  about,
  available,
  fees,
  address:JSON.parse(address),
  date:Date.now(),
}

const newCook = new cookModel(cookData);
await newCook.save();

res.json({success:true , message:"Cook added successfully"});
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//api for admin login

const adminLogin = async(req, res)=>{
  try {
    const {email, password} = req.body;
    if (email===process.env.ADMIN_EMAIL && password==process.env.ADMIN_PASSWORD){

      const token = jwt.sign(email+password , process.env.JWT_SECRET);
      res.json({success: true, token});
    }
    else{
      res.json({success: false , message:"invalid credentials"});
    }
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export { addCook, adminLogin };
