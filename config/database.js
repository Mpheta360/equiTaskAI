const mongoose = require('mongoose');
 
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  try {
    if (cached.conn) return cached.conn;

    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not set');
    }

    if (!cached.promise) {
      cached.promise = mongoose.connect(process.env.MONGO_URI, {
        bufferCommands: false,
      });
    }

    const conn = await cached.promise;
    cached.conn = conn;
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};
 
module.exports = connectDB;
