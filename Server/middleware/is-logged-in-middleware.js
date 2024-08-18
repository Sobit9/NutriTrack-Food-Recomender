import ApiError from "../Utils/ApiError.js"
import StatusCode from "../Utils/StatusCode.js"
import userAttachMiddleware from "./user-middleware.js"

const isLoggedIn = (req, res, next) => {
    return userAttachMiddleware(req, res, () => {
        if (req.user) 
    {
        next()
    }else {
        next(new ApiError(StatusCode.UNAUTHORIZED, "You are not logged in"))
    }
    })
}

export default isLoggedIn