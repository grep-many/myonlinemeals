import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export const dbURI = process.env.MONGO_URI;
export const jwtSecret = process.env.JWT_SECRET;
export const stripeSecret = process.env.STRIPE_SECRET_KEY;
export const frontend_url = process.env.FRONTEND_URL;
export const port = process.env.PORT;