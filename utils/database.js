// connect to our DB
import mongoose from 'mongoose';

let isConnected = false; // check if we are connected to the DB

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  // if we are not already connected, establish connection.
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'Prompty',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true;

    console.log('MongoDB is connected');
  } catch (error) {
    console.log(error);
  }
}