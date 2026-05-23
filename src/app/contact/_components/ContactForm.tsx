"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { submitContactForm } from "@/actions/submitContactForm";

import { ContactChip } from "./ContactChip";

const inputBaseClass =
  "bg-transparent border-0 outline-none text-white placeholder:text-white/50 leading-none h-[1.1em] pb-0 flex-shrink transition-colors";
const rowClass =
  "flex flex-wrap items-baseline gap-x-4 gap-y-1 text-2xl md:text-3xl font-light tracking-tight leading-[1.05] text-white";
const labelClass = "inline-block w-[13.5rem] text-right md:w-[16rem]";

const serviceOptions = [
  { label: "Brand Design", value: "brand" },
  { label: "Web Design", value: "web-design" },
  { label: "Web Development", value: "web-dev" },
] as const;

const budgetOptions = [
  { label: "Under £5,000", value: "<5k" },
  { label: "£5,000 - £10,000", value: "5-10k" },
  { label: "£10,000+", value: "10k+" },
] as const;

const initialActionState = {
  success: null,
  message: "",
};

export const ContactForm: React.FC = () => {
  const [actionState, formAction, isPending] = useActionState(
    submitContactForm,
    initialActionState
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: [] as string[],
    budget: "",
  });

  useEffect(() => {
    if (!actionState.message) {
      return;
    }

    if (actionState.success) {
      toast.success("Message sent", {
        description: actionState.message,
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        service: [],
        budget: "",
      });
      return;
    }

    toast.error("Message not sent", {
      description: actionState.message,
    });
  }, [actionState]);

  return (
    <form action={formAction} className="mx-auto w-full space-y-4">
      <div className="space-y-3">
        <div className={rowClass}>
          <span className={labelClass}>Hello, my name is</span>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((p) => ({ ...p, name: e.target.value }))
            }
            required
            maxLength={100}
            placeholder="Your Name"
            className={`${inputBaseClass} min-w-[160px] ${formData.name ? "text-[#F25C3D]" : ""}`}
          />
        </div>

        <div className={rowClass}>
          <span className={labelClass}>and my email is</span>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((p) => ({ ...p, email: e.target.value }))
            }
            required
            maxLength={255}
            placeholder="Email Address"
            className={`${inputBaseClass} min-w-[200px] ${formData.email ? "text-[#F25C3D]" : ""}`}
          />
        </div>

        <div className={rowClass}>
          <span className={labelClass}>I represent</span>
          <input
            name="company"
            type="text"
            value={formData.company}
            onChange={(e) =>
              setFormData((p) => ({ ...p, company: e.target.value }))
            }
            maxLength={100}
            placeholder="Company"
            className={`${inputBaseClass} min-w-[140px] ${formData.company ? "text-[#F25C3D]" : ""}`}
          />
          <span>.</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-2xl md:text-3xl font-light tracking-tight leading-[1.05] text-white">
          <span className={labelClass}>We are looking for</span>
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {serviceOptions.map((service) => (
              <ContactChip
                key={service.value}
                label={service.label}
                selected={formData.service.includes(service.value)}
                onClick={() =>
                  setFormData((p) => ({
                    ...p,
                    service: p.service.includes(service.value)
                      ? p.service.filter((v) => v !== service.value)
                      : [...p.service, service.value],
                  }))
                }
              />
            ))}
          </div>
        </div>
      </div>

      {formData.service.map((service) => (
        <input key={service} type="hidden" name="service" value={service} />
      ))}
      {formData.budget ? (
        <input type="hidden" name="budget" value={formData.budget} />
      ) : null}

      <div className={rowClass}>
        <span className={`${labelClass} whitespace-nowrap`}>
          Our budget is around
        </span>
        <div className="flex flex-wrap items-center gap-3">
          {budgetOptions.map((range) => (
            <ContactChip
              key={range.value}
              label={range.label}
              selected={formData.budget === range.value}
              onClick={() =>
                setFormData((p) => ({ ...p, budget: range.value }))
              }
            />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-12">
        <button type="submit" className="cta-submit" disabled={isPending}>
          {isPending ? "Sending..." : "Send an enquiry"}
        </button>
        <a
          href="mailto:hello@pendolo.studio"
          className="text-sm text-white underline underline-offset-4 transition-colors hover:text-white"
        >
          or send us an email
        </a>
      </div>
    </form>
  );
};
