import nodemailer from "nodemailer";
import { prisma } from "@/lib/prisma";

export async function broadcastLatestPost() {
  const settings = await prisma.settings.findUnique({ where: { id: "default" } });
  
  if (!settings) return { success: false, message: "Settings not found" };
  if (!settings.newsletterEnabled) return { success: false, message: "Newsletter is disabled" };

  const latestPost = await prisma.post.findFirst({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { category: true }
  });

  if (!latestPost) return { success: false, message: "No posts available to broadcast" };

  const subscribers = await prisma.subscriber.findMany({
    where: { status: "active" }
  });

  if (subscribers.length === 0) return { success: false, message: "No active subscribers" };

  const emails = subscribers.map(s => s.email);

  if (settings.newsletterProvider === "smtp") {
    if (!settings.smtpHost || !settings.smtpUser || !settings.smtpPassword || !settings.smtpFromEmail) {
      return { success: false, message: "SMTP settings are incomplete" };
    }

    try {
      const transporter = nodemailer.createTransport({
        host: settings.smtpHost,
        port: settings.smtpPort || 587,
        secure: settings.smtpPort === 465,
        auth: {
          user: settings.smtpUser,
          pass: settings.smtpPassword,
        },
      });

      const siteName = settings.siteName || "";
      const siteUrl = settings.siteUrl || "http://localhost:3000";
      const postUrl = `${settings.siteUrl}/blog/${latestPost.slug}`;

      const mailOptions = {
        from: `"${siteName}" <${settings.smtpFromEmail}>`,
        to: emails, // Note: For a larger list, Bcc is better or batching. For now simple broadcast.
        bcc: emails,
        subject: `New Post: ${latestPost.title}`,
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; line-height: 1.6;">
            <h2>${latestPost.title}</h2>
            ${latestPost.featuredImage ? `<img src="${latestPost.featuredImage}" style="max-width: 100%; border-radius: 8px; margin-bottom: 20px;" />` : ""}
            <p>${latestPost.excerpt || latestPost.content.substring(0, 150) + "..."}</p>
            <div style="margin-top: 30px;">
              <a href="${postUrl}" style="background-color: ${settings.primaryColor || '#1a2b3c'}; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Read Full Article</a>
            </div>
            <hr style="margin-top: 40px; border: 0; border-top: 1px solid #eaeaea;" />
            <p style="font-size: 12px; color: #888;">You are receiving this email because you subscribed to ${siteName}. <a href="${siteUrl}/unsubscribe">Unsubscribe</a></p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      return { success: true, message: `Sent to ${emails.length} subscribers` };

    } catch (error: any) {
      console.error("SMTP Error:", error);
      return { success: false, message: `SMTP Error: ${error.message}` };
    }
  }

  if (settings.newsletterProvider === "mailchimp") {
    // Implement Mailchimp campaign logic using API key
    // Out of scope for simple version, fall back
    return { success: false, message: "Mailchimp integration requires custom campaign creation. Not yet implemented natively." };
  }

  return { success: false, message: "Local database selected. Emails saved as leads but no external sending configured." };
}