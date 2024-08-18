import {
    loginController,
    registerController,
    currentUserController,
    verifyUserController,
    resendVerificationEmailController,
} from "../controllers/auth-controller.js"
import isLoggedIn from "../middleware/is-logged-in-middleware.js"
import schemaValidator from "../middleware/schema-validator.js"
// import userAttachMiddleware from "../middleware/user-middleware"
import loginSchema from "../schemas/login-schema.js"
import { validateRegisterInput } from "../schemas/register-schema.js"
import verifyUserSchema from "../schemas/verify-user-schema.js"
import upload from "../utils/multer.js";
import express from "express";


const router = express.Router()
router.post("/login",schemaValidator(loginSchema), loginController)
router.post("/register",upload.single("avatar") ,validateRegisterInput ,registerController)
router.get("/me", isLoggedIn ,currentUserController)
router.post('/verify', isLoggedIn, schemaValidator(verifyUserSchema), verifyUserController)
router.get('/resend-verification-email', isLoggedIn, resendVerificationEmailController)
router.get("/user/profile/uploads/:path", (req,res) => {
    return res.sendFile(req.params.path, {
        root: "uploads",
    })
} )

export default router