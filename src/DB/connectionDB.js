import mongoose from 'mongoose';
export const connectionDB = async () => {
    const connectDB = await mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("MongoDB failed to connect with error: ", err.message);
    });
}