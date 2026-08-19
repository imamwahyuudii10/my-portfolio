/**
 * Domain types for the lead capture flow.
 *
 * Flow: Visitor fills LeadForm -> client validates -> leadService posts to the
 * n8n webhook -> n8n runs AI qualification + Supabase write -> human approval
 * -> automated outreach. The frontend only ever sees the request payload and
 * a generic success/error response; it never sees internal scoring fields.
 */

/**
 * Exact payload shape expected by the n8n webhook.
 * Field names are snake_case to match the automation/backend contract.
 */
export interface LeadSubmissionPayload {
  first_name: string;
  last_name: string;
  email: string;
  company_name: string;
  company_domain: string;
  phone: string;
  message: string;
  source: string;
}

/**
 * Shape of the values held by the LeadForm component while the visitor
 * is typing. Optional fields are represented as empty strings rather than
 * undefined so inputs stay controlled.
 */
export interface LeadFormValues {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  companyDomain: string;
  phone: string;
  message: string;
}

/**
 * Field-level validation error messages. A key is only present when that
 * field currently has an error.
 */
export type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

/**
 * Tracks which fields the visitor has interacted with, so errors only
 * surface after a field has been touched (or after a submit attempt).
 */
export type LeadFormTouched = Partial<Record<keyof LeadFormValues, boolean>>;

/** Lifecycle state of the form submission. */
export type LeadSubmissionStatus = "idle" | "submitting" | "success" | "error";

/**
 * Normalized result returned by leadService.submitLead().
 * The frontend intentionally never reads or stores backend-internal fields
 * such as lead_id or ai_score -- only what's needed to render UI state.
 */
export interface LeadSubmissionResult {
  success: boolean;
  /** Human-readable message safe to show in the UI on failure. */
  errorMessage?: string;
  /** HTTP status code, useful for logging/telemetry, not shown to the user. */
  statusCode?: number;
}
