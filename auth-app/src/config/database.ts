import mongoose from "mongoose";

export const connectDb = async () => {
    mongoose.connect(process.env.MONGODB_URI || '')
        .then(() => {
            console.log('Connected to MongoDB');
        }).catch((err) => {
            console.log(err);
        });

}