import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/cookzy`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Failed:", error.message);
        process.exit(1); // Exit process if connection fails
    }
};

export default connectDB;
