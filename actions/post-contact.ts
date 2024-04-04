"use server";
import { Resend } from "resend";

interface ContactData {
  name: string;
  email: string;
  message: string;
}

const resend = new Resend(process.env.RESNED_API_KEY);

export const postContact = async (formData: FormData) => {
  console.log("formData", formData);
  console.log("formData", formData.get("name"));
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: "salahchriki1@gmail.com",
    subject: "Hello world",
    text: "Hello world!",
    // react: EmailTemplate({ firstName: 'John' }),
  });
};

export default postContact;
