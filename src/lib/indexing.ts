import { GoogleAuth } from "google-auth-library";
import { prisma } from "@/lib/prisma";

const SCOPES = ["https://www.googleapis.com/auth/indexing"];

export async function submitUrlToIndex(url: string, type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED") {
  try {
    const settings = await prisma.settings.findUnique({ where: { id: "default" } });

    if (!settings || !settings.googleServiceAccountKey) {
      console.log("[Indexing API] Skipping auto-indexing: Google Service Account key not found in settings. Please see docs for setup.");
      return false; // Silently skip if no service account
    }

    const credentials = JSON.parse(settings.googleServiceAccountKey);

    const auth = new GoogleAuth({
      credentials,
      scopes: SCOPES,
    });

    const client = await auth.getClient();
    const targetUrl = "https://indexing.googleapis.com/v3/urlNotifications:publish";

    // Prepare indexing body
    const body = JSON.stringify({
      url: url,
      type: type, // "URL_UPDATED" for new/updated, "URL_DELETED" for removals
    });

    // Call Google Indexing API
    const response = await client.request({
      url: targetUrl,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    console.log(`[Indexing API] Submitted URL to Google: ${url}`, response.status);
    return true;

  } catch (error: any) {
    console.error(`[Indexing API] Error submitting ${url}:`, error?.message || error);
    return false;
  }
}
