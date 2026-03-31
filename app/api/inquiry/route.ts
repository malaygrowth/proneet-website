import { z } from "zod";
import { Resend } from "resend";

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  course: z.string().min(1, "Please select a course"),
  message: z.string().max(500, "Message must be under 500 characters").optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = inquirySchema.safeParse(body);

    if (!result.success) {
      const fieldErrors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      return Response.json({ error: "Validation failed", fieldErrors }, { status: 400 });
    }

    const { name, phone, course, message } = result.data;

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey && apiKey !== "re_xxxxxxxxxxxxx") {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: "ProNEET Inquiry <onboarding@resend.dev>",
        to: process.env.NOTIFICATION_EMAIL || "info@proneet.in",
        subject: `New Inquiry: ${name} — ${course}`,
        html: `
          <h2>New Student Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Course:</strong> ${course}</p>
          ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
        `,
      });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
