import mongoose from "mongoose";

const connectDb = async (url) => {
    if(mongoose.connection.readyState === 1) return;
    try {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, });
        console.log(`DB Connected on ${url}`)
    }
    catch (err) {
        console.log(`Error: ${err}`);
    }
}
export default connectDb;