import type {
  LeadFormValues,
  LeadSubmissionPayload,
  LeadSubmissionResult,
} from "../types/lead";

/**
 * Webhook URL is injected via environment variable -- never hardcoded.
 */
const WEBHOOK_URL =
  import.meta.env.VITE_N8N_WEBHOOK_URL as
    | string
    | undefined;

const DEFAULT_TIMEOUT_MS = Number(
  import.meta.env.VITE_LEAD_SUBMIT_TIMEOUT_MS ?? 15000
);

const GENERIC_ERROR_MESSAGE =
  "Something went wrong on our end. Please try again in a moment.";

const NETWORK_ERROR_MESSAGE =
  "We couldn't reach our servers. Check your connection and try again.";

const TIMEOUT_ERROR_MESSAGE =
  "That took longer than expected. Please try again.";

const DUPLICATE_EMAIL_MESSAGE =
  "This email is already registered. Please use a different email address.";

interface WebhookErrorResponse {
  success?: boolean;
  code?: string;
  message?: string;
}

/**
 * Converts UI form values to the payload expected by n8n.
 */
function toPayload(
  values: LeadFormValues
): LeadSubmissionPayload {
  return {
    first_name: values.firstName.trim(),
    last_name: values.lastName.trim(),
    email: values.email.trim().toLowerCase(),
    company_name: values.companyName.trim(),
    company_domain: values.companyDomain
      .trim()
      .toLowerCase(),
    phone: values.phone.trim(),
    message: values.message.trim(),
    source: "website",
  };
}

/**
 * Safely reads JSON returned by n8n.
 */
async function readResponseJson(
  response: Response
): Promise<WebhookErrorResponse | null> {
  try {
    return (await response.json()) as WebhookErrorResponse;
  } catch {
    return null;
  }
}

/**
 * Submit lead to n8n webhook.
 */
export async function submitLead(
  values: LeadFormValues
): Promise<LeadSubmissionResult> {
  if (!WEBHOOK_URL) {
    console.error(
      "[leadService] Missing VITE_N8N_WEBHOOK_URL environment variable."
    );

    return {
      success: false,
      errorMessage: GENERIC_ERROR_MESSAGE,
    };
  }

  const controller = new AbortController();

  const timeoutId = window.setTimeout(
    () => controller.abort(),
    DEFAULT_TIMEOUT_MS
  );

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(
        toPayload(values)
      ),

      signal: controller.signal,
    });

    window.clearTimeout(timeoutId);

    const responseBody =
      await readResponseJson(response);

    /* ============================================================
       SUCCESS
    ============================================================ */

    if (response.ok) {
      return {
        success: true,
        statusCode: response.status,
      };
    }

    /* ============================================================
       DUPLICATE EMAIL
    ============================================================ */

    if (
      response.status === 409 &&
      responseBody?.code ===
        "EMAIL_ALREADY_EXISTS"
    ) {
      return {
        success: false,
        statusCode: 409,
        errorMessage: DUPLICATE_EMAIL_MESSAGE,
      };
    }

    /* ============================================================
       OTHER CLIENT ERRORS
    ============================================================ */

    if (
      response.status >= 400 &&
      response.status < 500
    ) {
      return {
        success: false,
        statusCode: response.status,
        errorMessage:
          responseBody?.message ||
          "We couldn't process your request. Please check your details and try again.",
      };
    }

    /* ============================================================
       SERVER ERRORS
    ============================================================ */

    return {
      success: false,
      statusCode: response.status,
      errorMessage: GENERIC_ERROR_MESSAGE,
    };
  } catch (error) {
    window.clearTimeout(timeoutId);

    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      return {
        success: false,
        errorMessage: TIMEOUT_ERROR_MESSAGE,
      };
    }

    console.error(
      "[leadService] Network error submitting lead:",
      error
    );

    return {
      success: false,
      errorMessage: NETWORK_ERROR_MESSAGE,
    };
  }
}