import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  environment:process.env.NODE_ENV,
  PORT: process.env.PORT,
  Database_Url: process.env.Database_Url!,
  bcrypt_salt_rounds:process.env.BCRYPT_SALT_ROUNDS,
  jwt_accessSecret:process.env.jwtAccessSecret,
  cludnaryApiSecret:process.env.CLOUDINARY_API_SECRET,
};
