import ApiError from "../Utils/ApiError.js"
import StatusCode from "../Utils/StatusCode.js"
import User from "../models/User.js"
import {
    createUser,
    findUserByEmail,
    getUser,
    verifyUserPassword,
    sendVerificationEmail,
    sendWelcomeEmail,
} from "../services/User-service.js"
import jwt from "jsonwebtoken"
import axios from 'axios';

export const register = async (userData) => {
    const user = await findUserByEmail(userData.email)
    if (user) {
        throw new ApiError(StatusCode.BAD_REQUEST,"User already exists", ["email already in use",])
    }
    const newUser = await createUser(userData)

    await sendVerificationEmail({
        name: userData.name,
        email: userData.email,
    }
    )

    return generateJWT(newUser)
}

export const verifyUser = async ({token, email}) => {
    const user = await findUserByEmail(email)
    if(!user) {
        throw new ApiError(StatusCode.BAD_REQUEST,"User not found")
    }
    if(user.verifiedAt) {
        throw new ApiError(StatusCode.BAD_REQUEST,"User already verified")
    }
    // console.log({user, token, email})
    if(user.verificationToken !== token) {
        throw new ApiError(StatusCode.BAD_REQUEST,"Invalid token")
    }
    
    const updatedUser = await User.findByIdAndUpdate(user.userId, {
        verifiedAt: new Date(),
    })
    await sendWelcomeEmail({
        name: userData.name,
        email: userData.email,
    }
    )
    return updatedUser
}

// export const generateJWT = (user) => {
//     const userData = getUser(user)
//     return jwt.sign(userData, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRE_IN,
//     })
// }

export const verifyJWT = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

export const login = async (userData) => {
    const user = await findUserByEmail(userData.email)
    if(!user) {
        throw new ApiError(StatusCode.BAD_REQUEST, "User not found")
    }
    const isPasswordValid = await verifyUserPassword(
        userData.password,
        user.password,
    )
    console.log(userData.password)
    console.log(user.password)
    if (!isPasswordValid) {
        throw new Error("Invalid password")
    }
    
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // if (typeof window !== 'undefined') {
    //     localStorage.setItem('authToken', token);
    //   }
    // localStorage.setItem('authToken',token);
    // res.json({ token });
    return (token)

}

export const fetchMealData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error("No token found");
  
      const response = await axios.get('http://localhost:3000/fetchmeal', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          bmr: 2530,
          ftype: 'nonveg',
          diab: 0,
          lbp: 1,
          hbp: 0
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching meal data:", error);
    }
  };


 export default verifyJWT