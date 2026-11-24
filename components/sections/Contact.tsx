"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Calendar, Send, CheckCircle, Loader2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/Toaster";

const contactSchema = z.object({
  name: z.string().min(2, "Name needs at least 2 characters."),
  email: z.string().email("That doesn't look like a valid email."),
  message: z
    .string()
    .min(10, "Message needs at least 10 characters.")
    .max(2000, "Let's keep it under 2000 characters."),
  _honey: z.string().max(0, "Bot detected."),
});

type ContactFormData = z.infer<typeof contactSchema>;

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("idle");
      toast("Something went wrong. Try emailing directly — numanfaisal980@gmail.com", "error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 flex flex-col items-center gap-4"
      >
        <div className="text-5xl" aria-hidden="true">🎉</div>
        <CheckCircle className="w-10 h-10 text-green-400" />
        <h3 className="font-display text-2xl font-bold">Message sent!</h3>
        <p className="text-[var(--color-muted)] max-w-sm">
          Thanks for reaching out. I&apos;ll typically get back within 24 hours —
          usually much sooner.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm text-[var(--color-accent)] hover:underline underline-offset-4"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact form"
      className="flex flex-col gap-5"
    >
      {/* Honeypot */}
      <input
        {...register("_honey")}
        type="text"
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px" }}
        autoComplete="off"
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-[var(--color-text)] mb-2"
          >
            Name
          </label>
          <input
            id="contact-name"
            {...register("name")}
            type="text"
            autoComplete="name"
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-[var(--radius-lg)] bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-[var(--color-text)] mb-2"
          >
            Email
          </label>
          <input
            id="contact-email"
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-[var(--radius-lg)] bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors"
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-[var(--color-text)] mb-2"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          {...register("message")}
          rows={5}
          placeholder="Tell me about your project, role, or just say hi. I reply to every message."
          className="w-full px-4 py-3 rounded-[var(--radius-lg)] bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors resize-none"
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={status === "loading"}
        size="lg"
        className="self-start"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" aria-hidden="true" />
            Send message
          </>
        )}
      </Button>
    </form>
  );
}

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "numanfaisal980@gmail.com",
    href: "mailto:numanfaisal980@gmail.com",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "/in/numanfaisal",
    href: "https://www.linkedin.com/in/numanfaisal/",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "/NumanFaisal",
    href: "https://github.com/NumanFaisal",
  },
  {
    icon: Calendar,
    label: "Book a call",
    value: "30 min intro",
    href: "[CAL_URL]",
  },
];

export function Contact() {
  return (
    <section id="contact" className="section" aria-label="Contact">
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left — info */}
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Contact"
              title="Let's work together."
              description="Whether it's a full-time role, a project, or just a chat — I'm always open to interesting conversations. I usually reply within 24 hours."
              className="mb-10"
            />

            <div className="flex flex-col gap-4">
              {contactLinks.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="flex items-center gap-4 p-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-surface)] transition-all group"
                >
                  <div className="w-9 h-9 rounded-[var(--radius-md)] bg-[var(--color-accent-dim)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-accent)] transition-colors">
                    <Icon className="w-4 h-4 text-[var(--color-accent)] group-hover:text-white transition-colors" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--color-muted)] uppercase tracking-wider">{label}</div>
                    <div className="text-sm font-medium text-[var(--color-text)]">{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8">
            <h3 className="font-display text-xl font-bold mb-6">Send a message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
