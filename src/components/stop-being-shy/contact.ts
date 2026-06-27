import { socials } from "@/content";

/** The single contact address this squeeze page funnels everything toward. */
export const CONTACT_EMAIL = socials.email;

/**
 * Builds a Gmail web "compose" URL with the recipient (and optional subject/
 * body) pre-filled. Used instead of a bare `mailto:` so the button reliably
 * opens Gmail rather than whatever default mail handler the visitor has.
 * Open with target="_blank".
 */
export function gmailCompose(subject: string, body: string) {
  const to = encodeURIComponent(CONTACT_EMAIL);
  const su = encodeURIComponent(subject);
  const bd = encodeURIComponent(body);
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${su}&body=${bd}`;
}

export const ACCESS_SUBJECT = "Stop Being Shy — early access";
export const ACCESS_BODY =
  "Hey Rohit — I'd like in on the early Stop Being Shy sessions. A little about me:";
