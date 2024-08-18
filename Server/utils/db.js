import mongoose from 'mongoose';

const connectToDB = async () => {
    mongoose.set("strictQuery", true)
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
        console.log("success: Connected to DB")
    } catch (error) {
        console.error("error:", error.message)
    }
}

export default connectToDB