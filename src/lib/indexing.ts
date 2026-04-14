import { GoogleAuth } from "google-auth-library";
import fs from "fs";
import path from "path";

const SCOPES = ["https://www.googleapis.com/auth/indexing"];
const KEY_FILE_PATH = path.join(process.cwd(), "google-service-account.json");

export async function submitUrlToIndex(url: string, type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED") {
  try {
    // Check if user set up the service account
    if (!fs.existsSync(KEY_FILE_PATH)) {
      console.log(`[Indexing API] Skipping auto-indexing: ${KEY_FILE_PATH} not found. Please see docs for setup.`);
      return false; // Silently skip if no service account
    }

    const auth = new GoogleAuth({
      keyFile: KEY_FILE_PATH,
      scopes: SCOPES,
    });

    const client = await auth.getClient();
    const targetUrl = 'https://indexing.googleapis.com/v3/urlNotifications:publish';

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
