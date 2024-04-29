import * as z from 'zod';

export const RegisterSchema = z.object({
    name: z.string()
        .min(1, "Name is required!"),
    email: z.string().email(),
    password: z.string().min(6, "Password should be atleast 6 characters long!")
})

export const LoginSchema = z.object(
    {
        email: z.string().email({
            message: "Email is required"
        }),
        password: z.string().min(6, "Password should be atleast 6 characters long"),
        // code: z.optional(z.string())
    }
)

export const RentSchema = z.object(
    {
        category: z.string(),
        location: z.string().optional(),
        guestCount: z.number(),
        roomCount: z.number(),
        bathroomCount: z.number(),
        imageSrc: z.string(),
        price: z.number(),
        title: z.string(),
        description: z.string()
    }
)