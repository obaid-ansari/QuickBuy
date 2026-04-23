const { z } = require("zod");

const registerSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name must be at most 50 characters" })
    .trim(),

  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .toLowerCase()
    .trim(),

  phone: z
    .string({ required_error: "Phone number is required" })
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must be at most 15 digits" })
    .regex(/^\+?[0-9\s\-()]+$/, {
      message: "Please enter a valid phone number",
    })
    .trim(),

  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password must be at most 32 characters" }),

  address: z
    .string()
    .max(200, { message: "Address must be at most 200 characters" })
    .trim()
    .optional(),

  role: z
    .enum(["customer", "admin"], {
      errorMap: () => ({ message: "Role must be either customer or admin" }),
    })
    .default("customer"),
});

const loginSchema = z.object({
  identifier: z
    .string({ required_error: "Email or phone number is required" })
    .min(1, { message: "Email or phone number cannot be empty" })
    .trim()
    .refine(
      (val) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        const isPhone = /^\+?[0-9\s\-()]{10,15}$/.test(val);
        return isEmail || isPhone;
      },
      { message: "Please enter a valid email address or phone number" },
    ),

  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(32, { message: "Password must be at most 32 characters" }),
});

module.exports = { registerSchema, loginSchema };
