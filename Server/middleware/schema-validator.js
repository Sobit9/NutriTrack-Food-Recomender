// import ApiError from "../Utils/ApiError.js"
// import StatusCode from "../Utils/StatusCode.js"
// const schemaValidator = (schema) => {
//     return async (req, res, next) => {
//         try {
//             const data = await schema.parse(req.body)
//             req.body = data
//             next()
//         } catch (err) {
//             next(new ApiError(StatusCode.BAD_REQUEST, err))
//         }
//     }
// }

// export default schemaValidator

// import ApiError from "../Utils/ApiError.js";
// import StatusCode from "../Utils/StatusCode.js";

// const schemaValidator = (schema) => {
//     return async (req, res, next) => {
//         try {
//             const data = await schema.parseAsync(req.body);
//             req.body = data;
//             next();
//         } catch (err) {
//             const validationErrors = err.errors.map(error => ({
//                 path: error.path,
//                 message: error.message,
//             }));
//             next(new ApiError(StatusCode.BAD_REQUEST, validationErrors));
//         }
//     }
// }

// export default schemaValidator;

import ApiError from "../Utils/ApiError.js";
import StatusCode from "../Utils/StatusCode.js";

const schemaValidator = (schema) => {
    return async (req, res, next) => {
        try {
            const data = await schema.parseAsync(req.body);
            req.body = data;
            next();
        } catch (err) {
            if (err.errors) {
                // Format the errors to be more readable
                const validationErrors = err.errors.map(error => ({
                    path: error.path.join('.'),
                    message: error.message,
                }));

                // Convert the array of errors to a string, or handle it in a way the ApiError class can manage
                const errorMessage = validationErrors.map(error => `${error.path}: ${error.message}`).join(', ');

                // Pass the structured error message string to ApiError
                next(new ApiError(StatusCode.BAD_REQUEST, errorMessage));
            } else {
                // If it's not a validation error, pass it as it is
                next(new ApiError(StatusCode.BAD_REQUEST, err.message));
            }
        }
    }
}

export default schemaValidator;
