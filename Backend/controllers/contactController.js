import ContactMessageModel from '../models/contactMessageModel.js';
import * as emailService from '../services/emailService.js';

// Send contact message
 const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }
    
    // Save message to database
    const newMessage = new ContactMessageModel({
      name,
      email,
      message
    });
    
    await newMessage.save();
    
    // Send notification email to admin
    await emailService.sendAdminNotification(name, email, message);
    
    // Send confirmation email to user
    await emailService.sendContactConfirmation(name, email, message);
    
    res.status(200).json({ 
      success: true, 
      message: 'Your message has been sent successfully. We\'ll get back to you soon!' 
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error, please try again later' 
    });
  }
};

export {sendMessage}