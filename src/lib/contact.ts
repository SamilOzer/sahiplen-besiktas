export const contactSubjects = {
  adoption: "Sahiplendirme hakkında bilgi",
  "lost-animal": "Kayıp veya bulunan hayvan bildirimi",
  services: "Hayvan hizmetleri hakkında bilgi",
  other: "Diğer talep ve öneriler",
} as const;

export interface ContactFields {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
}

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  if (fields.name.trim().length < 2 || fields.name.length > 100) {
    errors.name = "Adınızı ve soyadınızı 2–100 karakter arasında yazın.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || fields.email.length > 254) {
    errors.email = "Geçerli bir e-posta adresi yazın.";
  }
  if (!Object.hasOwn(contactSubjects, fields.subject)) {
    errors.subject = "Mesajınız için bir konu seçin.";
  }
  if (fields.message.trim().length < 20 || fields.message.length > 1500) {
    errors.message = "Mesajınızı 20–1500 karakter arasında yazın.";
  }
  return errors;
}

export function prepareContactDraft(fields: ContactFields, recipient: string) {
  if (Object.keys(validateContact(fields)).length > 0) return null;
  const subject = contactSubjects[fields.subject as keyof typeof contactSubjects];
  const body = `${fields.message.trim()}\n\nAd soyad: ${fields.name.trim()}\nYanıt e-postası: ${fields.email.trim()}`;
  return {
    href: `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    text: `Konu: ${subject}\n\n${body}`,
  };
}
