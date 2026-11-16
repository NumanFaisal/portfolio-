"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import profileData from "@/data/profile.json";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { toast } from "@/components/ui/Toaster";

const contactSchema = z.object({
  name: z.string().min(2, "Name needs at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  message: z.string().min(10, "Message needs at least 10 characters.").max(2000),
  _honey: z.string().max(0, "Bot detected."),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ChapterSayHi() {
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
      toast("Message sent successfully. I'll get back to you shortly!", "success");
    } catch {
      setStatus("idle");
      toast("Error sending message. Please email directly.", "error");
    }
  };

  return (
    <section id="contact" className="section-editorial relative" aria-label="Chapter 04: Say hi">
      <div className="container">
        {/* Chapter Header */}
        <div className="flex items-baseline gap-4 mb-12 border-b border-[var(--color-border)] pb-6">
          <span className="font-serif-display text-4xl sm:text-5xl text-[var(--color-red)]">
            04
          </span>
          <h2 className="text-3xl sm:text-4xl">Say hi</h2>
          <span className="mono-label ml-auto text-[var(--color-red)]">
            Direct Line
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          {/* Direct Channels */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="font-serif-display text-3xl leading-snug">
              Let&apos;s build something that actually ships.
            </h3>
            <p className="text-[16px] text-[var(--color-ink-muted)] leading-[1.6]">
              I reply to every genuine message within 24 hours. Open to full-stack engineering roles,
              AI agent infrastructure, and technical consulting.
            </p>

            <div className="flex flex-col gap-3 pt-2">
              <a
                href={`mailto:${profileData.email}`}
                className="card-paper p-4 flex items-center justify-between hover:border-[var(--color-red)] transition-colors group"
              >
                <div>
                  <span className="mono-label text-[10px] block">Email</span>
                  <span className="text-[15px] font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-red)] transition-colors">
                    {profileData.email}
                  </span>
                </div>
                <span className="mono-label text-[12px]">↗</span>
              </a>

              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="card-paper p-4 flex items-center justify-between hover:border-[var(--color-red)] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <LinkedinIcon className="w-4 h-4 text-[var(--color-ink)]" />
                  <div>
                    <span className="mono-label text-[10px] block">LinkedIn</span>
                    <span className="text-[15px] font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-red)] transition-colors">
                      /in/numanfaisal
                    </span>
                  </div>
                </div>
                <span className="mono-label text-[12px]">↗</span>
              </a>

              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="card-paper p-4 flex items-center justify-between hover:border-[var(--color-red)] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-4 h-4 text-[var(--color-ink)]" />
                  <div>
                    <span className="mono-label text-[10px] block">GitHub</span>
                    <span className="text-[15px] font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-red)] transition-colors">
                      /NumanFaisal
                    </span>
                  </div>
                </div>
                <span className="mono-label text-[12px]">↗</span>
              </a>

              <a
                href={profileData.cal_url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-paper p-4 flex items-center justify-between hover:border-[var(--color-red)] transition-colors group"
              >
                <div>
                  <span className="mono-label text-[10px] block">Booking</span>
                  <span className="text-[15px] font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-red)] transition-colors">
                    30 Min Intro Call
                  </span>
                </div>
                <span className="mono-label text-[12px]">↗</span>
              </a>
            </div>
          </div>

          {/* Paper Form Card */}
          <div className="lg:col-span-7 card-paper p-8 bg-[#FFFFFF] relative">
            <div className="tape-top" aria-hidden="true" />

            {status === "success" ? (
              <div className="text-center py-12">
                <span className="font-serif-display text-4xl text-[var(--color-red)] block mb-3">
                  Message Delivered.
                </span>
                <p className="text-[16px] text-[var(--color-ink-muted)] mb-6">
                  Thank you for reaching out. I will be in touch shortly.
                </p>
                <button onClick={() => setStatus("idle")} className="btn-paper text-sm">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <input
                  {...register("_honey")}
                  type="text"
                  tabIndex={-1}
                  style={{ position: "absolute", left: "-9999px" }}
                  autoComplete="off"
                />

                <div>
                  <label htmlFor="name" className="mono-label text-[11px] block mb-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[var(--color-border)] rounded-[4px] text-[15px] focus:outline-none focus:border-[var(--color-red)]"
                  />
                  {errors.name && (
                    <span className="mono-label text-[11px] text-[var(--color-red)] block mt-1">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mono-label text-[11px] block mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    {...register("email")}
                    type="email"
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[var(--color-border)] rounded-[4px] text-[15px] focus:outline-none focus:border-[var(--color-red)]"
                  />
                  {errors.email && (
                    <span className="mono-label text-[11px] text-[var(--color-red)] block mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="mono-label text-[11px] block mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    {...register("message")}
                    rows={4}
                    placeholder="Tell me about what you're building, the problem you're solving, or just say hi..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F6] border border-[var(--color-border)] rounded-[4px] text-[15px] focus:outline-none focus:border-[var(--color-red)] resize-none"
                  />
                  {errors.message && (
                    <span className="mono-label text-[11px] text-[var(--color-red)] block mt-1">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-paper-red self-start mt-2"
                >
                  {status === "loading" ? "Sending..." : "Send Note →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
