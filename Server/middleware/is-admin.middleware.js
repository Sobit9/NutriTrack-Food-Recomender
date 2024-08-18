import ApiError from "../Utils/ApiError"
import StatusCode from "../Utils/StatusCode"
import isLoggedIn from "./is-logged-in-middleware"

const isAdmin = (req, res, next) => {
    return isLoggedIn(req, res, () => {
        if (req.user.role === "admin")  
    {
        next()
    }else {
        next(new ApiError(StatusCode.FORBIDDEN, "You are not authorized to access this routes"))
    }
    })
}

export default isAdmin