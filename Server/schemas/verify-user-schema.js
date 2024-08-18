import z from "zod"

const verifyUserSchema = z.object({
    token: z
    .string({
        required_error: "Token is required",
    })
    .length(6,{
        message: "Token must be at least 6 characters",
    })
})

export default verifyUserSchema