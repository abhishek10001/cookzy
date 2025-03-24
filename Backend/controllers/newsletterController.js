import subscriberModel from "../models/subscriberModel.js"
import * as emailService from '../services/emailService.js';
const subscribeNewsletter = async (req,res)=>{
    try {
        const { email } = req.body;
        
        if (!email) {
          return res.status(400).json({ success: false, message: 'Email is required' });
        }
        
        // Check if email already exists
        const existingSubscriber = await subscriberModel.findOne({ email });
        
        if (existingSubscriber) {
          if (existingSubscriber.isActive) {
            return res.status(400).json({ 
              success: false, 
              message: 'This email is already subscribed to our newsletter' 
            });
          } else {
            // Reactivate subscription
            existingSubscriber.isActive = true;
            await existingSubscriber.save();
            
            // Send confirmation email
            await emailService.sendReactivationEmail(email);
            
            return res.status(200).json({ 
              success: true, 
              message: 'Your subscription has been reactivated' 
            });
          }
        }
        
        // Create new subscriber
        const newSubscriber = new subscriberModel({ email });
        await newSubscriber.save();
        
        // Send welcome email
        await emailService.sendWelcomeEmail(email);
        
        res.status(201).json({ 
          success: true, 
          message: 'Subscription successful. Welcome to our newsletter!' 
        });
        
      } catch (error) {
        console.error('Newsletter subscription error:', error);
        res.status(500).json({ 
          success: false, 
          message: 'Server error, please try again later' 
        });
      }
}


 const unsubscribeNewsletter = async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
      }
      
      const subscriber = await subscriberModel.findOne({ email });
      
      if (!subscriber || !subscriber.isActive) {
        return res.status(404).json({ 
          success: false, 
          message: 'Email not found in our subscription list' 
        });
      }
      
      // Soft delete - update isActive status instead of removing
      subscriber.isActive = false;
      await subscriber.save();
      
      // Send confirmation email
      await emailService.sendUnsubscribeEmail(email);
      
      res.status(200).json({ 
        success: true, 
        message: 'You have been successfully unsubscribed from our newsletter' 
      });
      
    } catch (error) {
      console.error('Newsletter unsubscribe error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Server error, please try again later' 
      });
    }
  };
  export { subscribeNewsletter, unsubscribeNewsletter };
  