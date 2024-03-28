import { FieldError, UseFormRegister } from "react-hook-form";
import { z, ZodType } from "zod"; // Add new import

export type FormData = {
  name: string;
  email: string;
  opgg: string;
};

export type FormFieldProps = {
  inputDisabled: boolean;
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
};

export type ValidFieldNames = "name" | "email" | "opgg";
const invalid_type_error = "Invalid type provided for this field";
const required_error = "This field cannot be blank";
export const UserSchema: ZodType<FormData> = z.object({
  name: z
    .string({ invalid_type_error, required_error })
    .min(1, "Value is too short"),
  email: z
    .string({ invalid_type_error, required_error })
    .email("Please provide a valid email")
    .min(1, "Value is too short"),
  opgg: z
    .string({ invalid_type_error, required_error })
    .min(1, "Value is too short"),
});

export interface Billboard {
  id: string;
  imageUrl: string;
  label: string;
}
export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: Category;
}
export interface CartItem {
  product: Product;
  quantity: number;
}
