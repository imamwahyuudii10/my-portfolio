import type {
  LeadFormValues,
  LeadSubmissionPayload,
  LeadSubmissionResult,
} from "../types/lead";

/**
 * Webhook URL is injected via environment variable -- never hardcoded.
 * Vite exposes client-safe env vars under import.meta.env with a VITE_ prefix.
 */
const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined;

const DEFAULT_TIMEOUT_MS = Number(
  import.meta.env.VITE_LEAD_SUBMIT_TIMEOUT_MS ?? 15000
);

const GENERIC_ERROR_MESSAGE =
  "Something went wrong on our end. Please try again in a moment.";

const NETWORK_ERROR_MESSAGE =
  "We couldn't reach our servers. Check your connection and try again.";

const TIMEOUT_ERROR_MESSAGE =
  "That took longer than expected. Please try again.";

/**
 * Maps client-side form values (camelCase, UI-friendly) to the exact
 * snake_case payload contract the n8n webhook expects.
 */
function toPayload(values: LeadFormValues): LeadSubmissionPayload {
  return {
    first_name: values.firstName.trim(),
    last_name: values.lastName.trim(),
    email: values.email.trim(),
    company_name: values.companyName.trim(),
    company_domain: values.companyDomain.trim().toLowerCase(),
    phone: values.phone.trim(),
    message: values.message.trim(),
    source: "website",
  };
}

/**
 * Submits a lead to the n8n webhook.
 *
 * Handles:
 * - Missing webhook configuration (fails fast with a clear dev-facing error)
 * - Network failures (fetch rejects)
 * - Client-side timeout via AbortController
 * - Non-2xx responses (400/500) without leaking internal error details
 *
 * Never throws -- always resolves to a LeadSubmissionResult so callers can
 * render UI state without try/catch scattered through components.
 */
export async function submitLead(
  values: LeadFormValues
): Promise<LeadSubmissionResult> {
  if (!WEBHOOK_URL) {
    // Configuration error -- surfaced clearly for developers, generic for users.
    console.error(
      "[leadService] Missing VITE_N8N_WEBHOOK_URL environment variable."
    );
    return {
      success: false,
      errorMessage: GENERIC_ERROR_MESSAGE,
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toPayload(values)),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      return { success: true, statusCode: response.status };
    }

    if (response.status >= 400 && response.status < 500) {
      return {
        success: false,
        statusCode: response.status,
        errorMessage:
          "We couldn't process your request. Please check your details and try again.",
      };
    }

    return {
      success: false,
      statusCode: response.status,
      errorMessage: GENERIC_ERROR_MESSAGE,
    };
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof DOMException && error.name === "AbortError") {
      return { success: false, errorMessage: TIMEOUT_ERROR_MESSAGE };
    }

    console.error("[leadService] Network error submitting lead:", error);
    return { success: false, errorMessage: NETWORK_ERROR_MESSAGE };
  }
}
