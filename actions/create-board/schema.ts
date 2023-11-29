import { z } from "zod";

export const CreateBoard = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title is required",
  }).min(3, {
    message: "Title is too short."
  }),
  image: z.string({
    required_error: "Image or color is required",
    invalid_type_error: "Image or color is required",
  }),
  color: z.string()
});