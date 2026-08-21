import {
  type FormEvent,
  useState,
} from "react";

import {
  AlertCircle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Loader2,
  LockKeyhole,
  Mail,
  Sparkles,
} from "lucide-react";

import { submitLead } from "../services/leadService";

import type {
  LeadFormErrors,
  LeadFormTouched,
  LeadFormValues,
  LeadSubmissionStatus,
} from "../types/lead";

import SuccessState from "./SuccessState";

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

const DOMAIN_PATTERN =
  /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i;

const PHONE_PATTERN = /^[+]?[\d\s().-]{7,20}$/;

function validateField(
  name: keyof LeadFormValues,
  values: LeadFormValues
): string | undefined {
  const value = values[name].trim();

  switch (name) {
    case "firstName":
      return value.length === 0
        ? "First name is required."
        : undefined;

    case "lastName":
      return value.length === 0
        ? "Last name is required."
        : undefined;

    case "email":
      if (value.length === 0) {
        return "Work email is required.";
      }

      if (!EMAIL_PATTERN.test(value)) {
        return "Enter a valid work email address.";
      }

      return undefined;

    case "companyName":
      return value.length === 0
        ? "Company name is required."
        : undefined;

    case "companyDomain":
      if (value.length === 0) {
        return "Company domain is required.";
      }

      if (!DOMAIN_PATTERN.test(value)) {
        return "Enter a valid domain, e.g. company.com.";
      }

      return undefined;

    case "phone":
      if (value.length === 0) {
        return undefined;
      }

      return PHONE_PATTERN.test(value)
        ? undefined
        : "Enter a valid phone number.";

    case "message":
      return undefined;

    default:
      return undefined;
  }
}

function validateAll(
  values: LeadFormValues
): LeadFormErrors {
  const errors: LeadFormErrors = {};

  (
    Object.keys(values) as (keyof LeadFormValues)[]
  ).forEach((key) => {
    const error = validateField(key, values);

    if (error) {
      errors[key] = error;
    }
  });

  return errors;
}

export default function LeadForm() {
  const [values, setValues] =
    useState<LeadFormValues>(INITIAL_VALUES);

  const [errors, setErrors] =
    useState<LeadFormErrors>({});

  const [touched, setTouched] =
    useState<LeadFormTouched>({});

  const [status, setStatus] =
    useState<LeadSubmissionStatus>("idle");

  const [submitError, setSubmitError] =
    useState<string | null>(null);

  const isSubmitting = status === "submitting";

  function handleChange(
    name: keyof LeadFormValues,
    value: string
  ) {
    const nextValues = {
      ...values,
      [name]: value,
    };

    setValues(nextValues);

    /*
     * Kalau sebelumnya form gagal submit,
     * hilangkan global error saat user mulai memperbaiki data.
     */
    if (status === "error") {
      setStatus("idle");
      setSubmitError(null);
    }

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, nextValues),
      }));
    }
  }

  function handleBlur(
    name: keyof LeadFormValues
  ) {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, values),
    }));
  }

  function resetForm() {
    setValues(INITIAL_VALUES);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setSubmitError(null);
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    /*
     * Guard tambahan supaya user tidak melakukan
     * double submit.
     */
    if (isSubmitting) {
      return;
    }

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

    /*
     * IMPORTANT:
     *
     * Frontend TIDAK melakukan duplicate checking
     * langsung ke Supabase.
     *
     * Semua business logic tetap berada di n8n:
     *
     * Frontend
     *    ↓
     * n8n Webhook
     *    ↓
     * Duplicate Check
     *    ↓
     * INSERT / UPDATE
     *    ↓
     * AI
     *    ↓
     * Supabase
     */

    try {
      const result = await submitLead(values);

      if (result.success) {
        setStatus("success");
        return;
      }

      setStatus("error");

      setSubmitError(
        result.errorMessage ??
          "We couldn't process your request. Please try again."
      );
    } catch {
      setStatus("error");

      setSubmitError(
        "We couldn't connect to the service. Please try again in a moment."
      );
    }
  }

  /*
   * Success screen hanya muncul setelah
   * n8n benar-benar mengembalikan success.
   */
  if (status === "success") {
    return (
      <div className="mx-auto max-w-2xl">
        <SuccessState
          firstName={values.firstName || "there"}
          onReset={resetForm}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* =========================================================
          FORM INTRODUCTION
      ========================================================= */}

      <div className="mb-8 flex flex-col gap-5 border-b border-white/[0.07] pb-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300 shadow-lg shadow-indigo-950/20">
            <Building2
              className="h-5 w-5"
              strokeWidth={1.9}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold tracking-tight text-white">
                Tell us about your team
              </h3>

              <span className="hidden rounded-full border border-indigo-400/15 bg-indigo-500/[0.08] px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-indigo-300 sm:inline-flex">
                Secure
              </span>
            </div>

            <p className="mt-1.5 max-w-lg text-sm leading-6 text-slate-500">
              Submit your information and see how the
              automated lead workflow processes your request.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-xs text-slate-500">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />

            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>

          System online
        </div>
      </div>

      {/* =========================================================
          FORM
      ========================================================= */}

      <form
        noValidate
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Personal information */}

        <FormGroup
          eyebrow="01"
          title="Contact information"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field
              label="First name"
              name="firstName"
              value={values.firstName}
              error={
                touched.firstName
                  ? errors.firstName
                  : undefined
              }
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="given-name"
              placeholder="Alexander"
              required
            />

            <Field
              label="Last name"
              name="lastName"
              value={values.lastName}
              error={
                touched.lastName
                  ? errors.lastName
                  : undefined
              }
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="family-name"
              placeholder="Wright"
              required
            />
          </div>

          <Field
            label="Work email"
            name="email"
            type="email"
            value={values.email}
            error={
              touched.email
                ? errors.email
                : undefined
            }
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="email"
            placeholder="alex.wright@nexuslabs.io"
            required
          />
        </FormGroup>

        {/* Company */}

        <FormGroup
          eyebrow="02"
          title="Company information"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field
              label="Company name"
              name="companyName"
              value={values.companyName}
              error={
                touched.companyName
                  ? errors.companyName
                  : undefined
              }
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
              error={
                touched.companyDomain
                  ? errors.companyDomain
                  : undefined
              }
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="nexuslabs.io"
              required
            />
          </div>

          <Field
            label="Phone number"
            name="phone"
            type="tel"
            value={values.phone}
            error={
              touched.phone
                ? errors.phone
                : undefined
            }
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="tel"
            placeholder="+1 234 567 890"
            optional
          />
        </FormGroup>

        {/* Requirements */}

        <FormGroup
          eyebrow="03"
          title="What are you looking to improve?"
        >
          <TextAreaField
            label="Requirements"
            name="message"
            value={values.message}
            error={
              touched.message
                ? errors.message
                : undefined
            }
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tell us about your current lead process, sales workflow, or what you'd like to automate..."
            optional
          />
        </FormGroup>

        {/* =========================================================
            ERROR
        ========================================================= */}

        {status === "error" &&
          submitError && (
            <div
              role="alert"
              aria-live="polite"
              className="flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-500/[0.08] px-4 py-3.5 text-sm text-red-200"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />

              <div>
                <p className="font-medium">
                  We couldn't submit your request.
                </p>

                <p className="mt-1 text-xs leading-5 text-red-300/70">
                  {submitError}
                </p>
              </div>
            </div>
          )}

        {/* =========================================================
            SUBMIT
        ========================================================= */}

        <div className="border-t border-white/[0.07] pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-white/20 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60 sm:text-[15px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />

                Processing your request...
              </>
            ) : (
              <>
                Submit Lead

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>

          {/* Trust footer */}

          <div className="mt-5 flex flex-col items-center justify-center gap-3 text-center text-xs text-slate-600 sm:flex-row">
            <span className="inline-flex items-center gap-1.5">
              <LockKeyhole className="h-3.5 w-3.5 text-emerald-400" />

              Secure submission
            </span>

            <span className="hidden text-slate-800 sm:inline">
              •
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-400" />

              AI-assisted qualification
            </span>

            <span className="hidden text-slate-800 sm:inline">
              •
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-slate-500" />

              Human-reviewed outreach
            </span>
          </div>

          <p className="mx-auto mt-4 max-w-xl text-center text-[11px] leading-5 text-slate-600">
            By submitting this form, you agree to be
            contacted regarding your request.
          </p>
        </div>
      </form>
    </div>
  );
}

/* ===============================================================
   FORM GROUP
================================================================ */

interface FormGroupProps {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}

function FormGroup({
  eyebrow,
  title,
  children,
}: FormGroupProps) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/10 text-[10px] font-bold text-indigo-300">
          {eyebrow}
        </span>

        <h4 className="text-sm font-semibold text-slate-200">
          {title}
        </h4>
      </div>

      <div className="space-y-5">
        {children}
      </div>
    </div>
  );
}

/* ===============================================================
   INPUT
================================================================ */

interface FieldProps {
  label: string;
  name: keyof LeadFormValues;
  value: string;
  error?: string;
  onChange: (
    name: keyof LeadFormValues,
    value: string
  ) => void;
  onBlur: (
    name: keyof LeadFormValues
  ) => void;
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
        className="mb-2 flex items-center gap-1 text-xs font-medium text-slate-300"
      >
        {label}

        {optional && (
          <span className="font-normal text-slate-600">
            (optional)
          </span>
        )}

        {required && (
          <span
            className="text-indigo-400"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(event) =>
          onChange(name, event.target.value)
        }
        onBlur={() => onBlur(name)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? errorId : undefined
        }
        className={`w-full rounded-xl border bg-[#080D17] px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder:text-slate-700 ${
          error
            ? "border-red-400/50 bg-red-500/[0.035] focus:border-red-400 focus:ring-4 focus:ring-red-500/10"
            : "border-white/[0.09] hover:border-white/[0.15] focus:border-indigo-400/60 focus:ring-4 focus:ring-indigo-500/10"
        }`}
      />

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 flex items-center gap-1.5 text-xs text-red-400"
        >
          <AlertCircle className="h-3 w-3 shrink-0" />

          {error}
        </p>
      )}
    </div>
  );
}

/* ===============================================================
   TEXTAREA
================================================================ */

interface TextAreaFieldProps {
  label: string;
  name: keyof LeadFormValues;
  value: string;
  error?: string;
  onChange: (
    name: keyof LeadFormValues,
    value: string
  ) => void;
  onBlur: (
    name: keyof LeadFormValues
  ) => void;
  placeholder?: string;
  optional?: boolean;
}

function TextAreaField({
  label,
  name,
  value,
  error,
  onChange,
  onBlur,
  placeholder,
  optional,
}: TextAreaFieldProps) {
  const errorId = `${name}-error`;

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 flex items-center gap-1 text-xs font-medium text-slate-300"
      >
        {label}

        {optional && (
          <span className="font-normal text-slate-600">
            (optional)
          </span>
        )}
      </label>

      <textarea
        id={name}
        name={name}
        value={value}
        rows={5}
        onChange={(event) =>
          onChange(name, event.target.value)
        }
        onBlur={() => onBlur(name)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? errorId : undefined
        }
        className={`w-full resize-none rounded-xl border bg-[#080D17] px-4 py-3 text-sm leading-6 text-white outline-none transition-all duration-200 placeholder:text-slate-700 ${
          error
            ? "border-red-400/50 focus:border-red-400 focus:ring-4 focus:ring-red-500/10"
            : "border-white/[0.09] hover:border-white/[0.15] focus:border-indigo-400/60 focus:ring-4 focus:ring-indigo-500/10"
        }`}
      />

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 flex items-center gap-1.5 text-xs text-red-400"
        >
          <AlertCircle className="h-3 w-3 shrink-0" />

          {error}
        </p>
      )}
    </div>
  );
}