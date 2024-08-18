import ApiError from "../Utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import User from "../models/User.js"
import { sendVerificationEmail } from "../services/User-service.js"
import { login, register, verifyUser } from "../services/auth-service.js"
import StatusCode from "../Utils/StatusCode.js"


/**
 * 
 * @param {import("express").Request} req 
 * @param {*} res 
 */
export const registerController = asyncHandler(async (req, res) => {
    const avatar = req.file;
    if (!avatar) {
        throw new ApiError(StatusCode.BAD_REQUEST, "Avatar is required", ["Avatar is required",])
    }
    const {name, username, email, password, age, gender, height, weight, activityLevel, dietaryPreferences, bmi, healthIssues, calorieLimit, carbLimit, proteinLimit, bmr } = req.body;

        const token = await register({
           name, username, email, password, age, gender, height, weight, activityLevel, dietaryPreferences, bmi, healthIssues, calorieLimit, carbLimit, proteinLimit, bmr,
            avatar: avatar.path,
        })

        res.status(201).json(
            new ApiResponse(StatusCode.CREATED,"User registered successfully", {token})
        )
})
export const loginController = async (req, res) => {
    try{
        const response = req.body
        const token = await login(response)
        res
        .status(StatusCode.OK)
        .json(new ApiResponse(StatusCode.OK, " Logged in successfully" , {token}))
    } catch(err){
        res.status(400).json({
            message: err.message,
            stack: err.stack,
        })
    }
}

export const currentUserController = asyncHandler(async (req, res) => {
    const user = req.user
    const userFromDb = await User.findById(user._id).select(
        "-password -verificationToken -resetToken"
    )
    res
    .status(200)
    .json(new ApiResponse(StatusCode.OK,"You've logged in", req.user))
})

export const verifyUserController = asyncHandler(async (req, res) => {
    const user = req.user;
    const email = user.email;
    const {token} = req.body
    // console.log(token)
    await verifyUser({token, email})
    return res.status(StatusCode.OK).json(new ApiResponse(StatusCode.OK, "User verified successfully"))
})

export const resendVerificationEmailController = asyncHandler(async (req, res) => {
    const user = req.user;
    const email = user.email;
    const name = user.name;
    await sendVerificationEmail({
        name,
        email,
    })
    return res
    .status(StatusCode.OK)
    .json(new ApiResponse(StatusCode.OK,"Verification email sent successfully"))
})
