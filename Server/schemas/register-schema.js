import z from "zod";

const registerSchema = z.object({
    name: z.string({
        required_error: "name is required",
    }),
    username: z.string().min(2, "Username must be at least 2 characters long").max(100, "Username must be less than 100 characters"),
    email: z.string().email("Invalid email format").max(50, "Email must be less than 50 characters"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    age: z.string().min(1, "Age is required"),
    gender: z.enum(['male', 'female', 'other'], "Invalid gender"),
    height: z.number().min(0, "Height must be a positive number"),
    weight: z.number().min(0, "Weight must be a positive number"),
    activityLevel: z.enum(['sedentary', 'lightly active', 'moderately active', 'very active', 'super active'], "Invalid activity level"),
    dietaryPreferences: z.array(z.enum(['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'none'])).default(['none']),
    // bmi: z.number().optional(),
    healthIssues: z.string().optional(),
    // calorieLimit: z.number().optional(),
    // carbLimit: z.number().optional(),
    // proteinLimit: z.number().optional(),
    // bmr: z.number().optional()
});

export default registerSchema;

export const validateRegisterInput = (req, res, next) => {
    try {
        // Parse and validate the request body using the Zod schema
        req.body = registerSchema.parse({
            ...req.body,
            height: req.body.height ? parseFloat(req.body.height) : undefined,
            weight: req.body.weight ? parseFloat(req.body.weight) : undefined,
            // calorieLimit: req.body.calorieLimit ? parseFloat(req.body.calorieLimit) : undefined,
            // carbLimit: req.body.carbLimit ? parseFloat(req.body.carbLimit) : undefined,
            // proteinLimit: req.body.proteinLimit ? parseFloat(req.body.proteinLimit) : undefined,
            // bmr: req.body.bmr ? parseFloat(req.body.bmr) : undefined,
            // bmi: req.body.bmi ? parseFloat(req.body.bmi) : undefined,
            dietaryPreferences: Array.isArray(req.body.dietaryPreferences)
                ? req.body.dietaryPreferences
                : req.body.dietaryPreferences ? req.body.dietaryPreferences.split(',') : []
        
        });
        next(); // Proceed to the next middleware or controller
    } catch (error) {
        // Handle validation errors
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                status: 'fail',
                errors: error.errors,
            });
        }
        // Handle other errors
        next(error);
    }
};
