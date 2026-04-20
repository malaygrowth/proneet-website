"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackFormSubmit } from "@/lib/analytics";

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  course: z.string().min(1, "Please select a course"),
  message: z
    .string()
    .max(500, "Message must be under 500 characters")
    .optional(),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

const COURSES = [
  { value: "neet-regular", label: "NEET Regular (Class 11-12)" },
  { value: "jee-mains", label: "JEE Mains (Class 11-12)" },
  { value: "dropper-batch", label: "Dropper Batch (Post-12th)" },
  { value: "other", label: "Other / Not Sure" },
];

export function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      course: "",
      message: "",
    },
  });

  const onSubmit = async (data: InquiryFormData) => {
    setServerError("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        setServerError(json.error || "Something went wrong");
        trackFormSubmit("inquiry", false, "contact");
        return;
      }

      setSubmitted(true);
      trackFormSubmit("inquiry", true, "contact");
    } catch {
      setServerError("Network error. Please try again.");
      trackFormSubmit("inquiry", false, "contact");
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-6">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Thank you!</h3>
        <p className="mt-2 text-sm text-slate-500 max-w-sm">
          We have received your inquiry. Our team will call you within 24 hours
          to schedule your free demo class.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your full name"
          {...register("name")}
          className={cn(
            "w-full rounded-lg border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors",
            errors.name
              ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-slate-200 focus:border-brand focus:ring-1 focus:ring-brand"
          )}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="+91 XXXXX XXXXX"
          {...register("phone")}
          className={cn(
            "w-full rounded-lg border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors",
            errors.phone
              ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-slate-200 focus:border-brand focus:ring-1 focus:ring-brand"
          )}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* Course */}
      <div>
        <label
          htmlFor="course"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          Course Interested In
        </label>
        <select
          id="course"
          {...register("course")}
          className={cn(
            "w-full rounded-lg border px-4 py-3 text-sm text-slate-900 outline-none transition-colors bg-white",
            errors.course
              ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-slate-200 focus:border-brand focus:ring-1 focus:ring-brand"
          )}
        >
          <option value="">Select a course</option>
          {COURSES.map((course) => (
            <option key={course.value} value={course.value}>
              {course.label}
            </option>
          ))}
        </select>
        {errors.course && (
          <p className="mt-1 text-xs text-red-500">{errors.course.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          Message{" "}
          <span className="text-slate-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="message"
          rows={3}
          placeholder="Any specific questions or concerns?"
          {...register("message")}
          className={cn(
            "w-full rounded-lg border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-colors resize-none",
            errors.message
              ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              : "border-slate-200 focus:border-brand focus:ring-1 focus:ring-brand"
          )}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Server error */}
      {serverError && (
        <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-2">
          {serverError}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 shadow-glow-brand disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Send Inquiry
          </>
        )}
      </button>

      {/* Trust line */}
      <p className="text-center text-xs text-slate-400">
        No spam. We&apos;ll call you once to schedule your free class.
      </p>
    </form>
  );
}
