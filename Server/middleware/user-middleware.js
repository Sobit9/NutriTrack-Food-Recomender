import verifyJWT from "../services/auth-service.js"
 
const userAttachMiddleware = ( req, res, next ) => {
    const authToken = req.headers.authorization
    if(authToken) {
        const token = authToken.split(" ")[1]
        console.log("token: ", token)
        if(token && token !=="null") {
            const user = verifyJWT(token)
            if(user) {
                req.user = user
            }
        }
    }
    next()
}

export default userAttachMiddleware