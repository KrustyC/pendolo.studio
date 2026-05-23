"use server";

import { Resend } from "resend";

import { env } from "@/lib/env";

export interface SubmitContactFormState {
  success: boolean | null;
  message: string;
}

export async function submitContactForm(
  _previousState: SubmitContactFormState,
  formData: FormData
): Promise<SubmitContactFormState> {
  try {
    const data = parseContactFormData(formData);
    const validationMessage = validateContactFormData(data);

    if (validationMessage) {
      return { success: false, message: validationMessage };
    }

    const resend = new Resend(env.RESEND_API_KEY);

    await resend.emails.send({
      from: env.RESEND_FROM,
      to: env.CONTACT_EMAIL,
      replyTo: data.email,
      subject: `New enquiry from ${data.name}`,
      html: buildEmailHtml(data),
    });

    return {
      success: true,
      message: "Thank you. We'll be in touch within two working days.",
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again or email us directly.",
    };
  }
}

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: string[];
  budget: string;
}

function parseContactFormData(formData: FormData): ContactFormData {
  return {
    name: getStringValue(formData, "name"),
    email: getStringValue(formData, "email"),
    company: getStringValue(formData, "company"),
    service: formData
      .getAll("service")
      .filter((value): value is string => typeof value === "string")
      .map((value) => value.trim())
      .filter(Boolean),
    budget: getStringValue(formData, "budget"),
  };
}

function getStringValue(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

function validateContactFormData(data: ContactFormData) {
  if (!data.name) return "Please enter your name.";
  if (!data.email) return "Please enter your email.";
  if (!isValidEmail(data.email)) return "Please enter a valid email.";
  if (data.service.length === 0) return "Please select at least one service.";
  if (!data.budget) return "Please select a budget range.";
  return null;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildEmailHtml(data: ContactFormData): string {
  const services = data.service.join(", ");
  const company = data.company || "—";

  return `
    <table style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#0d0d0d">
      <tr><td style="padding:32px 0 16px">
        <h2 style="margin:0;font-size:20px;font-weight:600">New enquiry</h2>
      </td></tr>
      <tr><td style="border-top:1px solid #e5e5e5;padding:20px 0">
        <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#888">Name</p>
        <p style="margin:0;font-size:16px">${data.name}</p>
      </td></tr>
      <tr><td style="border-top:1px solid #e5e5e5;padding:20px 0">
        <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#888">Email</p>
        <p style="margin:0;font-size:16px"><a href="mailto:${data.email}" style="color:#F25C3D">${data.email}</a></p>
      </td></tr>
      <tr><td style="border-top:1px solid #e5e5e5;padding:20px 0">
        <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#888">Company</p>
        <p style="margin:0;font-size:16px">${company}</p>
      </td></tr>
      <tr><td style="border-top:1px solid #e5e5e5;padding:20px 0">
        <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#888">Services</p>
        <p style="margin:0;font-size:16px">${services}</p>
      </td></tr>
      <tr><td style="border-top:1px solid #e5e5e5;padding:20px 0">
        <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#888">Budget</p>
        <p style="margin:0;font-size:16px">${data.budget}</p>
      </td></tr>
      <tr><td style="border-top:1px solid #e5e5e5;padding:20px 0;color:#888;font-size:12px">
        Pendolo Studio · pendolo.studio
      </td></tr>
    </table>
  `;
}
