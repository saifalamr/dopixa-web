"use client";

import { useState, type FormEvent } from "react";
import { getCopy, type Locale } from "@/lib/content";

const controlClass = "field-control";

export function ContactForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const copy = getCopy(locale).contact;

  function errorFor(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
    if (field.validity.valueMissing) return copy.validation.required;
    if (field instanceof HTMLInputElement && field.type === "email" && field.validity.typeMismatch) return copy.validation.email;
    return "";
  }

  function bindValidation(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
    const error = document.getElementById(`${field.name}-error`);
    if (error) error.textContent = errorFor(field);
    field.setAttribute("aria-invalid", String(!field.checkValidity()));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const invalid = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>("input, textarea, select")).find((field) => !field.checkValidity());
    if (invalid) {
      bindValidation(invalid);
      invalid.focus();
      return;
    }
    form.querySelectorAll<HTMLElement>('[aria-invalid="true"]').forEach((field) => field.setAttribute("aria-invalid", "false"));
    form.querySelectorAll<HTMLElement>(".field-error").forEach((node) => { node.textContent = ""; });
    setStatus("sending");
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...payload, locale }) });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function input(name: string, label: string, required = true, type = "text") {
    return <label className="form-field" key={name}><span>{label}{required && <span className="required-mark" aria-hidden="true"> *</span>}</span><input name={name} type={type} required={required} maxLength={name === "email" ? 254 : 120} autoComplete={name === "name" ? "name" : name === "email" ? "email" : name === "company" ? "organization" : undefined} onBlur={(event) => bindValidation(event.currentTarget)} aria-describedby={`${name}-error`} className={controlClass} /><span className="field-error" id={`${name}-error`} aria-live="polite" /></label>;
  }

  function select(name: string, label: string, options: readonly string[]) {
    return <label className="form-field" key={name}><span>{label}<span className="required-mark" aria-hidden="true"> *</span></span><select name={name} required defaultValue="" className={controlClass} aria-describedby={`${name}-error`} onBlur={(event) => bindValidation(event.currentTarget)}><option value="" disabled>{options[0]}</option>{options.slice(1).map((option) => <option key={option}>{option}</option>)}</select><span className="field-error" id={`${name}-error`} aria-live="polite" /></label>;
  }

  function textarea(name: string, label: string) {
    return <label className="form-field form-wide" key={name}><span>{label}<span className="required-mark" aria-hidden="true"> *</span></span><textarea name={name} required maxLength={2000} rows={4} className={controlClass} aria-describedby={`${name}-error`} onBlur={(event) => bindValidation(event.currentTarget)} /><span className="field-error" id={`${name}-error`} aria-live="polite" /></label>;
  }

  return <form className="contact-form" onSubmit={submit} noValidate>
    <label className="contact-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <div className="form-grid">
      {input("name", copy.fields.name)}{input("company", copy.fields.company, false)}
      {select("businessType", copy.fields.businessType, copy.options.business)}{input("country", copy.fields.country)}
      {input("email", copy.fields.email, true, "email")}{input("phone", copy.fields.phone, false, "tel")}
      {textarea("workflow", copy.fields.workflow)}{textarea("improvement", copy.fields.improvement)}
      {select("timeline", copy.fields.timeline, copy.options.timeline)}{input("budget", copy.fields.budget, false)}
      <label className="form-field"><span>{copy.fields.language}<span className="required-mark" aria-hidden="true"> *</span></span><select name="preferredLanguage" required defaultValue={locale} className={controlClass}><option value="tr">Türkçe</option><option value="ar">العربية</option></select></label>
    </div>
    <div className="form-submit-row"><div className="form-consent"><span className="privacy-lock" aria-hidden="true">◇</span><p>{copy.privacy}</p></div><button className="button button-primary" type="submit" disabled={status === "sending"}>{status === "sending" ? copy.sending : copy.submit}<span aria-hidden="true">↗</span></button></div>
    <p className={`form-status ${status === "error" ? "is-error" : status === "success" ? "is-success" : ""}`} role="status" aria-live="polite">{status === "error" ? copy.error : status === "success" ? copy.success : ""}</p>
  </form>;
}
