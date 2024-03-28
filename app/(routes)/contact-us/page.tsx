import { Metadata } from "next";
import { FormEvent, useState } from "react";
import ContactUsForm from "./components/contact-us-form";

export const metadata: Metadata = {
  title: "Contact Us",
};

const ContactUsPage = () => {
  return <ContactUsForm />;
};

export default ContactUsPage;
