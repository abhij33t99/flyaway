"use server";

import { createUser, getUserByEmail } from "@/data/user";
import { RegisterSchema } from "@/schemas/formSchema";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already exists!" };
  }

  await createUser({ name, email, password });

  return { success: "User registered successfully!" };
};
