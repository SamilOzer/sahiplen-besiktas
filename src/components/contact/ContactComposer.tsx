"use client";

import Link from "next/link";
import { type FormEvent, useRef, useState } from "react";

import { municipality } from "@/config/municipality";
import { contactSubjects, prepareContactDraft, validateContact, type ContactErrors, type ContactFields } from "@/lib/contact";

export function ContactComposer() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [draft, setDraft] = useState<ReturnType<typeof prepareContactDraft>>(null);
  const [copyStatus, setCopyStatus] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const draftRef = useRef<HTMLDivElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fields: ContactFields = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? "").trim(),
    };
    const nextErrors = validateContact(fields);
    setErrors(nextErrors);
    setCopyStatus("");
    if (Object.keys(nextErrors).length > 0) {
      setDraft(null);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setDraft(prepareContactDraft(fields, municipality.email));
    requestAnimationFrame(() => draftRef.current?.focus());
  }

  async function copyDraft() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft.text);
      setCopyStatus("Metin kopyalandı. Kendi e-posta uygulamanıza yapıştırabilirsiniz.");
    } catch {
      setCopyStatus("Otomatik kopyalama kullanılamıyor. Aşağıdaki metni seçip kopyalayabilirsiniz.");
    }
  }

  return (
    <section className="contact-form-panel" aria-labelledby="contact-form-title">
      <p className="article-kicker">Yazılı iletişim</p>
      <h2 id="contact-form-title">Mesajınızı hazırlayın.</h2>
      <p id="contact-form-help" className="form-helper">
        Bu araç mesajınızı e-posta taslağına dönüştürür; site üzerinden göndermez.
        Son adımda kendi e-posta uygulamanızdan gönderimi siz tamamlarsınız.
      </p>
      <form
        className="contact-form"
        action={`mailto:${municipality.email}`}
        method="post"
        encType="text/plain"
        aria-describedby="contact-form-help contact-privacy-note"
        noValidate
        onSubmit={handleSubmit}
        onChange={() => { setDraft(null); setCopyStatus(""); }}
      >
        {Object.keys(errors).length > 0 ? (
          <div className="form-error-summary" ref={summaryRef} tabIndex={-1} role="alert">
            <h3>Lütfen işaretli alanları kontrol edin.</h3>
            <ul>{Object.entries(errors).map(([field, message]) => (
              <li key={field}><a href={`#contact-${field}`}>{message}</a></li>
            ))}</ul>
          </div>
        ) : null}
        <div className="form-field">
          <label htmlFor="contact-name">Ad soyad <span>(zorunlu)</span></label>
          <input id="contact-name" name="name" autoComplete="name" required maxLength={100} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
          {errors.name ? <p className="field-error" id="name-error">{errors.name}</p> : null}
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">E-posta <span>(zorunlu)</span></label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
          {errors.email ? <p className="field-error" id="email-error">{errors.email}</p> : null}
        </div>
        <div className="form-field form-field--message">
          <label htmlFor="contact-subject">Konu <span>(zorunlu)</span></label>
          <select id="contact-subject" name="subject" defaultValue="" required aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "subject-error" : undefined}>
            <option value="">Konu seçin</option>
            {Object.entries(contactSubjects).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          {errors.subject ? <p className="field-error" id="subject-error">{errors.subject}</p> : null}
        </div>
        <div className="form-field form-field--message">
          <label htmlFor="contact-message">Mesaj <span>(zorunlu)</span></label>
          <textarea id="contact-message" name="message" rows={6} required minLength={20} maxLength={1500} aria-invalid={Boolean(errors.message)} aria-describedby={`message-hint${errors.message ? " message-error" : ""}`} />
          <p className="form-helper" id="message-hint">20–1500 karakter. Kimlik numarası, şifre veya gereksiz kişisel bilgi paylaşmayın.</p>
          {errors.message ? <p className="field-error" id="message-error">{errors.message}</p> : null}
        </div>
        <p className="form-helper form-field--message" id="contact-privacy-note">
          Taslak bu sayfada hazırlanır ve sunucumuza kaydedilmez. <Link href="/gizlilik-politikasi">Gizlilik bilgilerini okuyun.</Link>
        </p>
        <button className="button button--primary" type="submit">E-posta taslağını hazırla</button>
      </form>
      {draft ? (
        <div className="contact-draft" ref={draftRef} tabIndex={-1}>
          <h3>Taslak hazır; henüz gönderilmedi.</h3>
          <p>Alıcı: <strong>{municipality.email}</strong>. E-posta uygulamanızda bilgileri kontrol ederek gönderin.</p>
          <div className="button-group">
            <a className="button button--primary" href={draft.href}>E-posta uygulamasında aç</a>
            <button className="button button--secondary" type="button" onClick={copyDraft}>Metni kopyala</button>
          </div>
          <p role="status">{copyStatus}</p>
          <details><summary>Hazırlanan metni göster</summary><pre>{draft.text}</pre></details>
        </div>
      ) : null}
      <noscript><p>Doğrudan <a href={`mailto:${municipality.email}`}>belediyeye e-posta yazabilirsiniz</a>. Mesajınızı e-posta uygulamanızda tamamlayın.</p></noscript>
    </section>
  );
}
