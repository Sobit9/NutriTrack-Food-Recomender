import ApiError from "../Utils/ApiError.js";
import StatusCode from "../Utils/StatusCode.js";
import User from "../models/User.js";
import argon2 from "argon2"
import sendMail from "./mail-service.js"
import path from "path"
import fs from "fs"
import hbs from "handlebars"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { calculateBMR, calculateLimits } from '../controllers/calculator.js';
export const hashPassword = async (password) => {
    return argon2.hash(password)
}
const calculateBMI = (height, weight) => {
    if (height && weight) {
      const heightInMeters = height / 100; // convert cm to meters
      return (weight / (heightInMeters * heightInMeters)).toFixed(2);
    }
    return null;
  };

// export const createUser = async (userData) => {
//     const {
//         name,
//         username,
//         email,
//         password,
//         age,
//         gender,
//         height,
//         weight,
//         activityLevel,
//         dietaryPreferences,
//         healthIssues,
//         avatar,
//       } = userData;
//       console.log('userData received:', userData); // Debugging log
//     try {
//         const hashedPassword = await hashPassword(userData.password);

//     // Calculate BMI
//     const bmi = calculateBMI(height, weight);

//     // Calculate BMR and limits
//     const bmr = calculateBMR(weight, height, age, gender, activityLevel);
//     const { calorieLimit, carbLimit, proteinLimit, fatLimit } = calculateLimits(bmr, dietaryPreferences);

//     // Create new user
//     const user = new User({
        
//       username,
//       email,
//       password: hashedPassword,
//       age,
//       name,
//       gender,
//       height,
//       weight,
//       activityLevel,
//       dietaryPreferences,
//       bmi,
//       bmr, // Add BMR
//       healthIssues, //
//       calorieLimit, // Add daily calorie limit
//       carbLimit, // Add daily carbohydrate limit
//       proteinLimit,// Add daily protein limit
//       fatLimit,
//       avatar: process.env.API_URL + "/user/profile/" + userData.avatar,
//     });
//     console.log('user to be saved:', user); // Debugging log
//         await user.save();
//         return user.toObject();
//     } catch (error) {
//         if (error.name === 'ValidationError') {
//             throw new Error('Validation Error: ' + error.message);
//           } else if (error.code === 11000) {
//             throw new ApiError(StatusCode.CONFLICT, "Email already in use");
//         }
//         throw new Error(error);
//     }
// };

export const createUser = async (userData) => {
    const {
      name,
      username,
      email,
      password,
      age,
      gender,
      height,
      weight,
      activityLevel,
      dietaryPreferences,
      healthIssues,
      avatar,
    } = userData;
  
    console.log('userData received:', userData); // Debugging log
  
    try {
      const hashedPassword = await hashPassword(password);
  
      // Calculate BMI
      const bmi = calculateBMI(height, weight);
  
      // Calculate BMR and limits
      const bmr = calculateBMR(weight, height, age, gender, activityLevel);
      const { calorieLimit, carbLimit, proteinLimit, fatLimit } = calculateLimits(bmr, dietaryPreferences);
  
      // Create new user
      const user = new User({
        username,
        email,
        password: hashedPassword,
        age,
        name, // Ensure the name field is included
        gender,
        height,
        weight,
        activityLevel,
        dietaryPreferences,
        bmi,
        bmr, // Add BMR
        healthIssues, //
        calorieLimit, // Add daily calorie limit
        carbLimit, // Add daily carbohydrate limit
        proteinLimit, // Add daily protein limit
        fatLimit,
        avatar: process.env.API_URL + "/user/profile/" + avatar,
      });
  
      console.log('user to be saved:', user); // Debugging log
  
      await user.save();
      return user.toObject();
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new Error('Validation Error: ' + error.message);
      } else if (error.code === 11000) {
        throw new ApiError(StatusCode.CONFLICT, "Email already in use");
      }
      throw new Error(error);
    }
  };
  

export const generateVerificationToken = async ({email}) => {
    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error("User not found")
    }
    const token = generateToken()
    await User.findByIdAndUpdate(user._id,{
        verificationToken: token,
    })
    return token
}

export const sendVerificationEmail = async ({ name, email }) => {
    const token = await generateVerificationToken({email})
    const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
    const emailTemplateFilePath = path.join(__dirname,"../templetes/verify-email.hbs")
    const hbsContent = fs.readFileSync(emailTemplateFilePath,"utf8")
    const hbsHtml = hbs.compile(hbsContent)
    const html = hbsHtml({
        name,
        token,
    })
return sendMail({
    to: email,
    subject: "Verify your email",
    html,
})
}

export const sendWelcomeEmail = async ({ name, email }) => {
    const emailTemplateFilePath = path.join(__dirname,"../templetes/welcome-email.hbs")
    const hbsContent = fs.readFileSync(emailTemplateFilePath,"utf8")
    const hbsHtml = hbs.compile(hbsContent)
    const html = hbsHtml({
        name,
        token,
    })
return sendMail({
    to: email,
    subject: "Welcome to Devium.",
    html,
})
}

export const findUserByEmail = async (email) => {
    return User.findOne({
        email,
    })
}

export const getUser = (user) => {
    const {password, verificationToken, resetToken, ...rest} = user
    return rest
}


export const generateToken = () => {
    return Math.random().toString(36).substring(2,8)
}

export const verifyUserPassword = async (password, hashedPassword) => {
    return argon2.verify(hashedPassword, password)
}

