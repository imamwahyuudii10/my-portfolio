import { type FormEvent, useState } from "react";
import { Loader2, AlertCircle, Building2 } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { submitLead } from "../services/leadService";
import type {
  LeadFormErrors,
  LeadFormTouched,
  LeadFormValues,
  LeadSubmissionStatus,
} from "../types/lead";
import SuccessState from "./SuccessState";

// Inisialisasi Supabase Client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

const INITIAL_VALUES: LeadFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  companyName: "",
  companyDomain: "",
  phone: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DOMAIN_PATTERN = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i;
const PHONE_PATTERN = /^[+]?[\d\s().-]{7,20}$/;

function validateField(
  name: keyof LeadFormValues,
  values: LeadFormValues
): string | undefined {
  const value = values[name].trim();

  switch (name) {
    case "firstName":
      return value.length === 0 ? "First name is required." : undefined;
    case "lastName":
      return value.length === 0 ? "Last name is required." : undefined;
    case "email":
      if (value.length === 0) return "Work email is required.";
      if (!EMAIL_PATTERN.test(value)) return "Enter a valid email address.";
      return undefined;
    case "companyName":
      return value.length === 0 ? "Company name is required." : undefined;
    case "companyDomain":
      if (value.length === 0) return "Company domain is required.";
      if (!DOMAIN_PATTERN.test(value))
        return "Enter a valid domain, e.g. company.com.";
      return undefined;
    case "phone":
      if (value.length === 0) return undefined;
      return PHONE_PATTERN.test(value) ? undefined : "Enter a valid phone number.";
    case "message":
      return undefined;
    default:
      return undefined;
  }
}

function validateAll(values: LeadFormValues): LeadFormErrors {
  const errors: LeadFormErrors = {};
  (Object.keys(values) as (keyof LeadFormValues)[]).forEach((key) => {
    const error = validateField(key, values);
    if (error) errors[key] = error;
  });
  return errors;
}

export default function LeadForm() {
  const [values, setValues] = useState<LeadFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [touched, setTouched] = useState<LeadFormTouched>({});
  const [status, setStatus] = useState<LeadSubmissionStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isSubmitting = status === "submitting";

  function handleChange(name: keyof LeadFormValues, value: string) {
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, nextValues) }));
    }
  }

  function handleBlur(name: keyof LeadFormValues) {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, values) }));
  }

  function resetForm() {
    setValues(INITIAL_VALUES);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setSubmitError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const allErrors = validateAll(values);
    setErrors(allErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      companyName: true,
      companyDomain: true,
      phone: true,
      message: true,
    });

    if (Object.keys(allErrors).length > 0) {
      return;
    }

    setStatus("submitting");
    setSubmitError(null);

    // --- FITUR BARU: PENGECEKAN EMAIL DUPLIKAT ---
    if (supabase) {
      const { data: existingLead, error: checkError } = await supabase
        .from("leads")
        .select("id")
        .eq("email", values.email.trim())
        .maybeSingle();

      if (checkError) {
        console.error("Error checking existing lead:", checkError);
      }

      if (existingLead) {
        setStatus("error");
        setSubmitError("Email ini sudah pernah terdaftar. Silakan gunakan email lain.");
        return; // Hentikan pendaftaran jika email ditemukan
      }
    }
    // ----------------------------------------------

    const result = await submitLead(values);

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setSubmitError(result.errorMessage ?? "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/5">
        <SuccessState firstName={values.firstName || "there"} onReset={resetForm} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5 sm:p-8">
      <div className="mb-6 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F172A]">
          <Building2 className="h-4.5 w-4.5 text-white" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#0F172A]">Get started</h3>
          <p className="text-sm text-[#64748B]">
            Tell us about your team. We'll follow up within 1 business day.
          </p>
        </div>
      </div>

      <form noValidate onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            label="First name"
            name="firstName"
            value={values.firstName}
            error={touched.firstName ? errors.firstName : undefined}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="given-name"
            required
          />
          <Field
            label="Last name"
            name="lastName"
            value={values.lastName}
            error={touched.lastName ? errors.lastName : undefined}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="family-name"
            required
          />
        </div>

        <Field
          label="Work email"
          name="email"
          type="email"
          value={values.email}
          error={touched.email ? errors.email : undefined}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="email"
          placeholder="alex.wright@nexuslabs.io"
          required
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            label="Company name"
            name="companyName"
            value={values.companyName}
            error={touched.companyName ? errors.companyName : undefined}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="organization"
            placeholder="Nexus Labs"
            required
          />
          <Field
            label="Company domain"
            name="companyDomain"
            value={values.companyDomain}
            error={touched.companyDomain ? errors.companyDomain : undefined}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="nexuslabs.io"
            required
          />
        </div>

        {/* <Field
          label="Phone number"
          name="phone"
          type="tel"
          value={values.phone}
          error={touched.phone ? errors.phone : undefined}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="tel"
          placeholder="+1 (234) 567-890"
          optional
        /> */}

       
        {status === "error" && submitError && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-lg border border-red-100 bg-red-50 px-3.5 py-3 text-sm text-red-700"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0F172A] px-5 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#1E293B] focus:outline-none focus:ring-4 focus:ring-[#0F172A]/20 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Request a demo"
          )}
        </button>

        <p className="text-center text-xs leading-relaxed text-[#94A3B8]">
          By submitting, you agree to be contacted about your request. We
          never share your information with third parties.
        </p>
      </form>
    </div>
  );
}

interface FieldProps {
  label: string;
  name: keyof LeadFormValues;
  value: string;
  error?: string;
  onChange: (name: keyof LeadFormValues, value: string) => void;
  onBlur: (name: keyof LeadFormValues) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
}

function Field({
  label,
  name,
  value,
  error,
  onChange,
  onBlur,
  type = "text",
  autoComplete,
  placeholder,
  required,
  optional,
}: FieldProps) {
  const errorId = `${name}-error`;

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-[#0F172A]"
      >
        {label}
        {optional && (
          <span className="font-normal text-[#94A3B8]"> (optional)</span>
        )}
        {required && <span className="ml-0.5 text-[#1E3A8A]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur(name)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-[15px] text-[#0F172A] placeholder:text-[#94A3B8] transition-colors focus:outline-none focus:ring-4 ${
          error
            ? "border-red-300 focus:border-red-400 focus:ring-red-100"
            : "border-slate-200 focus:border-[#1E3A8A] focus:ring-[#1E3A8A]/10"
        }`}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}