import ApiError from "../Utils/ApiError.js"
import StatusCode from "../Utils/StatusCode.js"
const schemaValidator = (schema) => {
    return async (req, res, next) => {
        try {
            const data = await schema.parse(req.body)
            req.body = data
            next()
        } catch (err) {
            next(new ApiError(StatusCode.BAD_REQUEST, err))
        }
    }
}

export default schemaValidator