import { connect, connection } from 'mongoose';

export async function connectToDb(mongoURI: string) {
  console.log('MongoDB connection...');
  try {
    await connect(mongoURI);
    console.log('Connected to MongoDB successfully!');
  } catch (err) {
    console.error(err);
    console.log('MongoDB connection error. Please make sure MongoDB is running');
    process.exit();
  }
}

export async function closeDbConnection() {
  await connection.close();
}
