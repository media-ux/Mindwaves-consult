// contact-modal.jsx — Pop-up contact form + localStorage inbox
const { useState: useStateCM, useEffect: useEffectCM, useRef: useRefCM } = React;

/* ============================================================
   Configuration
   ------------------------------------------------------------
   To send real emails server-side (no user mail client),
   replace FORM_ENDPOINT below with a Formspree, Getform, or
   Resend serverless endpoint URL. Until then, submissions
   fall back to mailto: (opens the user's mail app prefilled).
   ============================================================ */
const FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/xxxxxx"
const RECIPIENT_EMAIL = "consulting@mindwaves-consult.com";
const STORAGE_KEY = "mw_messages";

const SERVICE_OPTIONS = [
  "Digital Twin Systems",
  "Autonomous Laboratory",
  "On-Site / Edge AI",
  "Visual Agentic Memory",
  "Simulation & Testing",
  "Cybersecurity",
  "Custom AI Software",
  "Other / Not sure",
];

function saveMessage(msg) {
  try {
    const arr = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    arr.unshift({ ...msg, id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7), receivedAt: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch (e) {
    console.warn("Could not save message to localStorage", e);
  }
}

/* ============================================================
   ContactModal — controlled by `open` prop
   ============================================================ */
function ContactModal({ open, onClose, initialEmail }) {
  const [form, setForm] = useStateCM({
    name: "",
    email: "",
    company: "",
    service: SERVICE_OPTIONS[0],
    message: "",
  });

  // Prefill email when opened from a hero/footer capture field
  useEffectCM(() => {
    if (open && initialEmail) setForm((f) => (f.email ? f : { ...f, email: initialEmail }));
  }, [open, initialEmail]);
  const [status, setStatus] = useStateCM("idle"); // idle | sending | success | error
  const [errors, setErrors] = useStateCM({});
  const firstFieldRef = useRefCM(null);

  // Close on Esc; focus first field on open
  useEffectCM(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // Reset state shortly after close
  useEffectCM(() => {
    if (open) return;
    const t = setTimeout(() => {
      setStatus("idle");
      setErrors({});
    }, 300);
    return () => clearTimeout(t);
  }, [open]);

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Looks off";
    if (!form.message.trim()) errs.message = "Required";
    else if (form.message.trim().length < 12) errs.message = "A bit more detail?";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");

    // Always save locally so /messages.html shows it
    saveMessage(form);

    // Path A: server endpoint set → POST to it
    if (FORM_ENDPOINT) {
      try {
        const r = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({ ...form, _replyto: form.email, _subject: `Mindwaves enquiry — ${form.service}` }),
        });
        if (!r.ok) throw new Error("Non-OK response");
        setStatus("success");
        return;
      } catch (err) {
        console.warn("Endpoint failed, falling back to mailto", err);
      }
    }

    // Path B: fallback → open the user's mail client with prefilled content
    const subject = encodeURIComponent(`Mindwaves enquiry — ${form.service}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        form.company ? `Company: ${form.company}` : null,
        `Service area: ${form.service}`,
        "",
        "—",
        "",
        form.message,
      ].filter(Boolean).join("\n")
    );
    window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;
    setStatus("success");
  };

  const reset = () => {
    setForm({ name: "", email: "", company: "", service: SERVICE_OPTIONS[0], message: "" });
    setStatus("idle");
    setErrors({});
  };

  return (
    <div
      className={`cm-overlay ${open ? "cm-overlay--open" : ""}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
      aria-hidden={!open}
    >
      <div className="cm" role="dialog" aria-modal="true" aria-labelledby="cm-title">
        <button className="cm__close" onClick={onClose} aria-label="Close">
          <i data-lucide="x"></i>
        </button>

        <div className="cm__inner">
          <aside className="cm__aside">
            <span className="eyebrow accent">Get in touch</span>
            <h2 className="cm__title" id="cm-title">
              Build <span className="it">smarter.</span>
            </h2>
            <p className="cm__sub">
              Tell us what you're operating, what's reactive today, and what should be running on infrastructure. We'll reply within two working days.
            </p>

            <div className="cm__contacts">
              <a href={`mailto:${RECIPIENT_EMAIL}`}>
                <i data-lucide="mail"></i>
                <span>{RECIPIENT_EMAIL}</span>
              </a>
              <a href="tel:+4921619499043">
                <i data-lucide="phone"></i>
                <span>+49 2161 9499043</span>
              </a>
              <div className="cm__addr">
                <i data-lucide="map-pin"></i>
                <span>Hocksteiner Weg 33<br/>41189 Mönchengladbach · DE</span>
              </div>
            </div>

            <div className="cm__telemetry">
              <span><span className="dot" /> SYSTEM ONLINE · ACCEPTING ENQUIRIES</span>
              <span>BAFA · go-inno · WIPANO · BMBF</span>
            </div>
          </aside>

          <div className="cm__form-wrap">
            {status === "success" ? (
              <div className="cm__success">
                <div className="cm__success-icon"><i data-lucide="check"></i></div>
                <h3>Message dispatched.</h3>
                <p>
                  {FORM_ENDPOINT
                    ? "We received your message. Expect a reply within two working days."
                    : "We've opened your mail client with the message prefilled. Send it, and we'll reply within two working days."}
                </p>
                <p style={{ fontFamily: "var(--mw-font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mw-fg-3)" }}>
                  Logged · ID #{(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")[0] || {}).id || "—"}
                </p>
                <div className="cm__success-actions">
                  <button className="btn btn--ghost" onClick={() => { reset(); }}>
                    Send another <i data-lucide="rotate-cw"></i>
                  </button>
                  <button className="btn btn--primary" onClick={onClose}>
                    Done <i data-lucide="check"></i>
                  </button>
                </div>
              </div>
            ) : (
              <form className="cm__form" onSubmit={submit} noValidate>
                <div className="cm__row">
                  <Field
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={upd("name")}
                    error={errors.name}
                    refEl={firstFieldRef}
                    required
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={upd("email")}
                    error={errors.email}
                    required
                  />
                </div>

                <Field
                  label="Company"
                  name="company"
                  value={form.company}
                  onChange={upd("company")}
                  optional
                />

                <div className="cm-field">
                  <label className="cm-field__label">
                    System of interest <span className="cm-field__hint">Optional</span>
                  </label>
                  <div className="cm-select">
                    <select value={form.service} onChange={upd("service")}>
                      {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <i data-lucide="chevron-down"></i>
                  </div>
                </div>

                <div className="cm-field">
                  <label className="cm-field__label" htmlFor="cm-message">
                    What are you building? <span className="cm-field__required">Required</span>
                  </label>
                  <textarea
                    id="cm-message"
                    rows="5"
                    value={form.message}
                    onChange={upd("message")}
                    placeholder="Describe the operational system, the current reactive state, and what 'good' looks like."
                    className={`cm-input cm-input--ta ${errors.message ? "cm-input--err" : ""}`}
                  ></textarea>
                  {errors.message && <span className="cm-field__error">{errors.message}</span>}
                </div>

                <div className="cm__legal">
                  By submitting, you agree to be contacted regarding your enquiry. We don't share your data.
                </div>

                <div className="cm__actions">
                  <button type="button" className="btn btn--ghost" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
                    {status === "sending" ? <>Sending… <i data-lucide="loader"></i></> : <>Send message <i data-lucide="arrow-up-right"></i></>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", value, onChange, error, required, optional, refEl }) {
  return (
    <div className="cm-field">
      <label className="cm-field__label" htmlFor={`cm-${name}`}>
        {label}
        {required && <span className="cm-field__required">Required</span>}
        {optional && <span className="cm-field__hint">Optional</span>}
      </label>
      <input
        ref={refEl}
        id={`cm-${name}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`cm-input ${error ? "cm-input--err" : ""}`}
        autoComplete={name === "email" ? "email" : name === "name" ? "name" : "off"}
      />
      {error && <span className="cm-field__error">{error}</span>}
    </div>
  );
}

/* ============================================================
   ContactProvider — exposes openContactModal globally so any
   button can trigger it.
   ============================================================ */
function ContactProvider({ children }) {
  const [open, setOpen] = useStateCM(false);
  const [prefill, setPrefill] = useStateCM("");

  useEffectCM(() => {
    window.openContactModal = (email) => { setPrefill(typeof email === "string" ? email : ""); setOpen(true); };
    window.closeContactModal = () => setOpen(false);
    const onClick = (e) => {
      const t = e.target.closest('[data-action="contact"]');
      if (t) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffectCM(() => {
    if (window.lucide) window.lucide.createIcons();
  });

  return (
    <React.Fragment>
      {children}
      <ContactModal open={open} onClose={() => setOpen(false)} initialEmail={prefill} />
    </React.Fragment>
  );
}

Object.assign(window, { ContactModal, ContactProvider, saveMessage, RECIPIENT_EMAIL, STORAGE_KEY });
