import mongoose from 'mongoose';
import { dbURI } from './load.js';

const connectDB = async () => {
    await mongoose.connect(dbURI).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err)=>{
        console.log('Something went wrong:',err);
        
    })
};

export {
    connectDB,
}