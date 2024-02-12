import { z } from "zod";

export const CreateUser = z.object({
  orgId: z.string(),
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email is required",
  }).email(),
  username: z.string({
    required_error: "Username is required"
  }).min(5, "5 characters minimum")
  
});