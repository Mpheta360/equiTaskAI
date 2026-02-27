const mongoose = require('mongoose');
 
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  try {
    if (cached.conn) return cached.conn;

    const mongoUri = process.env.MONGO_URI || process.env.DB_URL;

    if (!mongoUri) {
      throw new Error('Mongo connection string is not set (use MONGO_URI or DB_URL)');
    }

    if (!cached.promise) {
      cached.promise = mongoose.connect(mongoUri, {
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
