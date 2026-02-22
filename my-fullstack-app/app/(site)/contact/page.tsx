// app/(site)/contact/page.tsx
"use client";

import * as React from "react";
import { Box, Container } from "@mui/material";
import ContactHero from "./_components/ContactHero";
import ContactForm from "./_components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <ContactForm />
    </>
  );
}
