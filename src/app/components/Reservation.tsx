import { useState } from "react";
import { useWindowWidth } from "../hooks/useWindowWidth";
import { DatePicker } from "./DatePicker";
import { scrollToSection } from "./Nav";
import { useLanguage } from "../context/LanguageContext";

type Variant = "personal" | "business";

function ConfirmModal({ onConfirm, onCancel, modal }: {
  onConfirm: () => void;
  onCancel: () => void;
  modal: { title: string; body: string; cancel: string; confirm: string };
}) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={onCancel}
    >
      <div style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "40px 36px", maxWidth: 420, width: "100%", textAlign: "center" }}
        onClick={e => e.stopPropagation()}
      >
        <span style={{ color: "var(--primary)", fontSize: "28px", display: "block", marginBottom: 16 }}>✦</span>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 400, color: "var(--foreground)", marginBottom: 12 }}>
          {modal.title}
        </h3>
        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "14px", color: "var(--muted-foreground)", lineHeight: 1.7, marginBottom: 32 }}>
          {modal.body.split("\n").map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onCancel} style={{ flex: 1, fontFamily: "'Lato', sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", padding: "13px", background: "transparent", border: "1px solid var(--border)", color: "var(--foreground)", cursor: "pointer", transition: "all 0.18s ease" }}
            onMouseOver={e => (e.currentTarget.style.borderColor = "var(--primary)")}
            onMouseOut={e => (e.currentTarget.style.borderColor = "var(--border)")}
          >{modal.cancel}</button>
          <button onClick={onConfirm} style={{ flex: 1, fontFamily: "'Lato', sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", padding: "13px", background: "var(--primary)", border: "1px solid var(--primary)", color: "var(--primary-foreground)", cursor: "pointer", transition: "opacity 0.18s ease" }}
            onMouseOver={e => (e.currentTarget.style.opacity = "0.88")}
            onMouseOut={e => (e.currentTarget.style.opacity = "1")}
          >{modal.confirm}</button>
        </div>
      </div>
    </div>
  );
}

const MIN_DINING: Record<Variant, number> = { personal: 90, business: 120 };

function scheduleForDay(dow: number): { open: number; close: number } {
  if (dow === 0) return { open: 12, close: 21 };
  if (dow >= 1 && dow <= 4) return { open: 12, close: 22 };
  return { open: 12, close: 23 };
}

function getTimesForDate(dateStr: string, variant: Variant): string[] {
  const minMinutes = MIN_DINING[variant];
  let open: number, closeMinutes: number;
  if (dateStr) {
    const [y, m, d] = dateStr.split("-").map(Number);
    const { open: o, close } = scheduleForDay(new Date(y, m - 1, d).getDay());
    open = o;
    closeMinutes = close * 60;
  } else {
    open = 12;
    closeMinutes = 22 * 60;
  }
  const lastSlotMinutes = closeMinutes - minMinutes;
  const times: string[] = [];
  for (let mins = open * 60; mins <= lastSlotMinutes; mins += 30) {
    const h = Math.floor(mins / 60);
    const m2 = mins % 60;
    times.push(`${String(h).padStart(2, "0")}:${String(m2).padStart(2, "0")}`);
  }
  return times;
}

const GUESTS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

function formatDate(iso: string) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

type PersonalForm = { firstName: string; lastName: string; phone: string; email: string; date: string; time: string; guests: string; message: string };
type BusinessForm = { firstName: string; lastName: string; company: string; street: string; city: string; postal: string; phone: string; email: string; date: string; time: string; guests: string; message: string };
type PersonalErrors = Partial<Record<keyof PersonalForm, string>>;
type BusinessErrors = Partial<Record<keyof BusinessForm, string>>;

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RE_PHONE = /^[\d\s\+\-\(\)]{7,20}$/;

const EMPTY_PERSONAL: PersonalForm = { firstName: "", lastName: "", phone: "", email: "", date: "", time: "", guests: "2", message: "" };
const EMPTY_BUSINESS: BusinessForm = { firstName: "", lastName: "", company: "", street: "", city: "", postal: "", phone: "", email: "", date: "", time: "", guests: "2", message: "" };

function buildConsoleLog(variant: Variant, personal: PersonalForm, business: BusinessForm) {
  const formatDateStr = (iso: string) => iso ? formatDate(iso) : "—";
  if (variant === "personal") {
    const guestsLabel = `${personal.guests} ${personal.guests === "1" ? "person" : "persons"}`;
    return {
      type: "PERSONAL",
      date: formatDateStr(personal.date),
      time: personal.time,
      guests: guestsLabel,
      name: `${personal.firstName} ${personal.lastName}`,
      phone: personal.phone,
      email: personal.email,
      notes: personal.message || "—",
    };
  } else {
    const guestsLabel = `${business.guests} ${business.guests === "1" ? "person" : "persons"}`;
    return {
      type: "BUSINESS",
      date: formatDateStr(business.date),
      time: business.time,
      guests: guestsLabel,
      name: `${business.firstName} ${business.lastName}`,
      company: business.company,
      address: [business.street, `${business.postal} ${business.city}`].filter(Boolean).join(", ") || "—",
      phone: business.phone,
      email: business.email,
      notes: business.message || "—",
    };
  }
}

export function Reservation() {
  const [variant, setVariant] = useState<Variant>("personal");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [pendingVariant, setPendingVariant] = useState<Variant | null>(null);
  const width = useWindowWidth();
  const isMobile = width < 768;
  const { t } = useLanguage();
  const r = t.reservation;
  const f = r.form;

  const [personal, setPersonal] = useState<PersonalForm>(EMPTY_PERSONAL);
  const [business, setBusiness] = useState<BusinessForm>(EMPTY_BUSINESS);
  const [personalTouched, setPersonalTouched] = useState<Partial<Record<keyof PersonalForm, boolean>>>({});
  const [businessTouched, setBusinessTouched] = useState<Partial<Record<keyof BusinessForm, boolean>>>({});

  const errs = r.errors;
  const validatePersonal = (p: PersonalForm): PersonalErrors => {
    const e: PersonalErrors = {};
    if (!p.firstName.trim())           e.firstName = errs.firstName;
    if (!p.lastName.trim())            e.lastName  = errs.lastName;
    if (!p.phone.trim())               e.phone     = errs.phoneRequired;
    else if (!RE_PHONE.test(p.phone))  e.phone     = errs.phoneInvalid;
    if (!p.email.trim())               e.email     = errs.emailRequired;
    else if (!RE_EMAIL.test(p.email))  e.email     = errs.emailInvalid;
    if (!p.date)                       e.date      = errs.date;
    if (!p.time)                       e.time      = errs.time;
    return e;
  };
  const validateBusiness = (b: BusinessForm): BusinessErrors => {
    const e: BusinessErrors = {};
    if (!b.firstName.trim())           e.firstName = errs.firstName;
    if (!b.lastName.trim())            e.lastName  = errs.lastName;
    if (!b.company.trim())             e.company   = errs.company;
    if (!b.phone.trim())               e.phone     = errs.phoneRequired;
    else if (!RE_PHONE.test(b.phone))  e.phone     = errs.phoneInvalid;
    if (!b.email.trim())               e.email     = errs.emailRequired;
    else if (!RE_EMAIL.test(b.email))  e.email     = errs.emailInvalid;
    if (!b.date)                       e.date      = errs.date;
    if (!b.time)                       e.time      = errs.time;
    return e;
  };

  const personalErrors = validatePersonal(personal);
  const businessErrors = validateBusiness(business);

  const isPersonalDirty = Object.entries(personal).some(([k, v]) => k !== "guests" && v !== "");
  const isBusinessDirty = Object.entries(business).some(([k, v]) => k !== "guests" && v !== "");

  const switchVariant = (next: Variant) => {
    if (next === variant) return;
    const dirty = variant === "personal" ? isPersonalDirty : isBusinessDirty;
    if (dirty) { setPendingVariant(next); return; }
    applySwitch(next);
  };

  const applySwitch = (next: Variant) => {
    if (variant === "personal") setPersonal(EMPTY_PERSONAL);
    else setBusiness(EMPTY_BUSINESS);
    setVariant(next);
    setStatus("idle");
    setPendingVariant(null);
    setPersonalTouched({});
    setBusinessTouched({});
  };

  const handlePersonal = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonal(p => ({ ...p, [name]: value, ...(name === "date" ? { time: "" } : {}) }));
  };
  const handleBusiness = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBusiness(p => ({ ...p, [name]: value, ...(name === "date" ? { time: "" } : {}) }));
  };

  const touchPersonal = (name: keyof PersonalForm) => setPersonalTouched(p => ({ ...p, [name]: true }));
  const touchBusiness = (name: keyof BusinessForm) => setBusinessTouched(p => ({ ...p, [name]: true }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (variant === "personal") {
      const allTouched = Object.fromEntries(Object.keys(personal).map(k => [k, true]));
      setPersonalTouched(allTouched as Record<keyof PersonalForm, boolean>);
      if (Object.keys(personalErrors).length > 0) return;
    } else {
      const allTouched = Object.fromEntries(Object.keys(business).map(k => [k, true]));
      setBusinessTouched(allTouched as Record<keyof BusinessForm, boolean>);
      if (Object.keys(businessErrors).length > 0) return;
    }
    setStatus("sending");
    console.log("📋 Reservation submission:", buildConsoleLog(variant, personal, business));
    setTimeout(() => {
      if (variant === "personal") { setPersonal(EMPTY_PERSONAL); setPersonalTouched({}); }
      else { setBusiness(EMPTY_BUSINESS); setBusinessTouched({}); }
      setStatus("sent");
    }, 400);
  };

  const field: React.CSSProperties = {
    fontFamily: "'Lato', sans-serif", fontSize: "14px",
    background: "var(--input-background)", border: "1px solid var(--border)",
    color: "var(--foreground)", padding: "14px 16px", width: "100%",
    outline: "none", transition: "border-color 0.18s ease",
  };
  const fieldErr: React.CSSProperties = { ...field, border: "1px solid #c0392b" };
  const errMsg: React.CSSProperties = { fontFamily: "'Lato', sans-serif", fontSize: "11px", color: "#c0392b", marginTop: 5, display: "block", letterSpacing: "0.02em" };
  const lbl: React.CSSProperties = { fontFamily: "'Lato', sans-serif", fontSize: "10px", letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--muted-foreground)", display: "block", marginBottom: 7 };
  const row2: React.CSSProperties = { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 };
  const row3: React.CSSProperties = { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 16 };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: "'Lato', sans-serif", fontSize: "11px", letterSpacing: "0.16em",
    textTransform: "uppercase", padding: "10px 22px", cursor: "pointer",
    background: active ? "var(--primary)" : "transparent",
    color: active ? "var(--primary-foreground)" : "var(--foreground)",
    border: `1px solid ${active ? "var(--primary)" : "var(--border)"}`,
    fontWeight: active ? 700 : 400, transition: "all 0.18s ease",
  });

  const placeholders = f.placeholders as Record<string, string>;
  const sent = status === "sent";

  return (
    <>
      {pendingVariant && (
        <ConfirmModal
          onConfirm={() => applySwitch(pendingVariant)}
          onCancel={() => setPendingVariant(null)}
          modal={r.modal}
        />
      )}
      <section id="reservation" className="py-16 px-6" style={{ background: "var(--secondary)" }}>
        <div className="max-w-6xl mx-auto">
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 32 : 64, alignItems: "start" }}>

            {/* Info */}
            <div>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--primary)", marginBottom: 16 }}>
                {r.overline}
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px, 3.8vw, 50px)", fontWeight: 400, color: "var(--foreground)", lineHeight: 1.2, marginBottom: 20 }}>
                {r.heading}<br />
                <em style={{ fontStyle: "italic", color: "var(--primary)" }}>{r.headingEm}</em>
              </h2>
              <div style={{ width: 64, height: 1, background: "var(--primary)", opacity: 0.65, marginBottom: 28 }} />
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "18px", lineHeight: 1.85, color: "var(--foreground)", marginBottom: 36 }}>
                {r.body}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                {[
                  { label: r.infoLabels.phone, value: "+48 800 931 311", href: "tel:+48800931311" },
                  { label: r.infoLabels.address, value: "ul. Krzyża 17, 31-022 Kraków", href: "#location" },
                  { label: r.infoLabels.hours, value: r.hours, href: null },
                ].map((c) => (
                  <div key={c.label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 3, alignSelf: "stretch", background: "var(--primary)", opacity: 0.5, marginTop: 4 }} />
                    <div>
                      <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "10px", letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--muted-foreground)", display: "block", marginBottom: 3 }}>
                        {c.label}
                      </span>
                      {c.href ? (
                        <a href={c.href}
                          style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "var(--foreground)", textDecoration: "none", transition: "color 0.18s ease" }}
                          onMouseOver={e => (e.currentTarget.style.color = "var(--primary)")}
                          onMouseOut={e => (e.currentTarget.style.color = "var(--foreground)")}
                          onClick={c.href.startsWith("#") ? (e) => { e.preventDefault(); scrollToSection(c.href!); } : undefined}
                        >{c.value}</a>
                      ) : (
                        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "16px", color: "var(--foreground)" }}>{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div style={{ border: "1px solid var(--border)", background: "var(--card)" }}>

              <div style={{ display: "flex", borderBottom: "1px solid var(--border)" }}>
                <button style={{ ...tabStyle(variant === "personal"), flex: 1, border: "none", borderRight: "1px solid var(--border)", borderBottom: variant === "personal" ? "2px solid var(--primary)" : "none" }} onClick={() => switchVariant("personal")}>
                  {r.tabPersonal}
                </button>
                <button style={{ ...tabStyle(variant === "business"), flex: 1, border: "none", borderBottom: variant === "business" ? "2px solid var(--primary)" : "none" }} onClick={() => switchVariant("business")}>
                  {r.tabBusiness}
                </button>
              </div>

              <div style={{ padding: isMobile ? 20 : 36 }}>
                {sent ? (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 0", textAlign: "center", gap: 16 }}>
                    <span style={{ color: "var(--primary)", fontSize: "36px" }}>✦</span>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 400, color: "var(--foreground)" }}>{r.success.title}</h3>
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "15px", color: "var(--muted-foreground)", lineHeight: 1.7 }}>{r.success.body}</p>
                    <button onClick={() => setStatus("idle")} style={{ marginTop: 8, fontFamily: "'Lato', sans-serif", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", background: "transparent", border: "1px solid var(--primary)", color: "var(--primary)", padding: "10px 24px", cursor: "pointer", transition: "all 0.18s ease" }}
                      onMouseOver={e => { e.currentTarget.style.background = "var(--primary)"; e.currentTarget.style.color = "var(--primary-foreground)"; }}
                      onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--primary)"; }}
                    >{r.success.newReservation}</button>
                  </div>
                ) : variant === "personal" ? (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={row2}>
                      <div>
                        <label style={lbl}>{f.firstName}</label>
                        <input name="firstName" value={personal.firstName} onChange={handlePersonal} onBlur={() => touchPersonal("firstName")} placeholder={placeholders.firstName} style={personalTouched.firstName && personalErrors.firstName ? fieldErr : field} />
                        {personalTouched.firstName && personalErrors.firstName && <span style={errMsg}>{personalErrors.firstName}</span>}
                      </div>
                      <div>
                        <label style={lbl}>{f.lastName}</label>
                        <input name="lastName" value={personal.lastName} onChange={handlePersonal} onBlur={() => touchPersonal("lastName")} placeholder={placeholders.lastName} style={personalTouched.lastName && personalErrors.lastName ? fieldErr : field} />
                        {personalTouched.lastName && personalErrors.lastName && <span style={errMsg}>{personalErrors.lastName}</span>}
                      </div>
                    </div>
                    <div style={row2}>
                      <div>
                        <label style={lbl}>{f.phone}</label>
                        <input name="phone" value={personal.phone} onChange={handlePersonal} onBlur={() => touchPersonal("phone")} placeholder={placeholders.phone} style={personalTouched.phone && personalErrors.phone ? fieldErr : field} />
                        {personalTouched.phone && personalErrors.phone && <span style={errMsg}>{personalErrors.phone}</span>}
                      </div>
                      <div>
                        <label style={lbl}>{f.email}</label>
                        <input name="email" type="email" value={personal.email} onChange={handlePersonal} onBlur={() => touchPersonal("email")} placeholder={placeholders.emailPersonal} style={personalTouched.email && personalErrors.email ? fieldErr : field} />
                        {personalTouched.email && personalErrors.email && <span style={errMsg}>{personalErrors.email}</span>}
                      </div>
                    </div>
                    <div style={row2}>
                      <div>
                        <span style={lbl}>{f.date}</span>
                        <DatePicker name="date" value={personal.date} onChange={v => { setPersonal(p => ({ ...p, date: v, time: "" })); touchPersonal("date"); }} style={personalTouched.date && personalErrors.date ? fieldErr : field} />
                        {personalTouched.date && personalErrors.date && <span style={errMsg}>{personalErrors.date}</span>}
                      </div>
                      <div>
                        <label style={lbl}>{f.time}</label>
                        <select name="time" value={personal.time} onChange={handlePersonal} onBlur={() => touchPersonal("time")} style={personalTouched.time && personalErrors.time ? fieldErr : field}>
                          <option value="">{f.selectTime}</option>
                          {getTimesForDate(personal.date, "personal").map(tm => <option key={tm} value={tm}>{tm}</option>)}
                        </select>
                        {personalTouched.time && personalErrors.time && <span style={errMsg}>{personalErrors.time}</span>}
                      </div>
                    </div>
                    <div>
                      <label style={lbl}>{f.guests}</label>
                      <select name="guests" value={personal.guests} onChange={handlePersonal} style={field}>
                        {GUESTS.map(n => <option key={n} value={n}>{n} {n === "1" ? f.guestsSingular : f.guestsPlural}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={lbl}>{f.notesPersonal}</label>
                      <textarea name="message" value={personal.message} onChange={handlePersonal} rows={3} placeholder={placeholders.notesPersonal} style={{ ...field, resize: "none" }} />
                    </div>
                    {status === "error" && <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "#c0392b", textAlign: "center" }}>{r.sendError}</p>}
                    <SubmitButton sending={status === "sending"} label={r.submit} labelSending={r.submitting} />
                  </form>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={row2}>
                      <div>
                        <label style={lbl}>{f.firstName}</label>
                        <input name="firstName" value={business.firstName} onChange={handleBusiness} onBlur={() => touchBusiness("firstName")} placeholder={placeholders.firstName} style={businessTouched.firstName && businessErrors.firstName ? fieldErr : field} />
                        {businessTouched.firstName && businessErrors.firstName && <span style={errMsg}>{businessErrors.firstName}</span>}
                      </div>
                      <div>
                        <label style={lbl}>{f.lastName}</label>
                        <input name="lastName" value={business.lastName} onChange={handleBusiness} onBlur={() => touchBusiness("lastName")} placeholder={placeholders.lastName} style={businessTouched.lastName && businessErrors.lastName ? fieldErr : field} />
                        {businessTouched.lastName && businessErrors.lastName && <span style={errMsg}>{businessErrors.lastName}</span>}
                      </div>
                    </div>
                    <div>
                      <label style={lbl}>{f.company}</label>
                      <input name="company" value={business.company} onChange={handleBusiness} onBlur={() => touchBusiness("company")} placeholder={placeholders.company} style={businessTouched.company && businessErrors.company ? fieldErr : field} />
                      {businessTouched.company && businessErrors.company && <span style={errMsg}>{businessErrors.company}</span>}
                    </div>
                    <div>
                      <label style={lbl}>{f.street}</label>
                      <input name="street" value={business.street} onChange={handleBusiness} placeholder={placeholders.street} style={field} />
                    </div>
                    <div style={row2}>
                      <div><label style={lbl}>{f.city}</label><input name="city" value={business.city} onChange={handleBusiness} placeholder={placeholders.city} style={field} /></div>
                      <div><label style={lbl}>{f.postal}</label><input name="postal" value={business.postal} onChange={handleBusiness} placeholder={placeholders.postal} style={field} /></div>
                    </div>
                    <div style={row2}>
                      <div>
                        <label style={lbl}>{f.phone}</label>
                        <input name="phone" value={business.phone} onChange={handleBusiness} onBlur={() => touchBusiness("phone")} placeholder={placeholders.phone} style={businessTouched.phone && businessErrors.phone ? fieldErr : field} />
                        {businessTouched.phone && businessErrors.phone && <span style={errMsg}>{businessErrors.phone}</span>}
                      </div>
                      <div>
                        <label style={lbl}>{f.email}</label>
                        <input name="email" type="email" value={business.email} onChange={handleBusiness} onBlur={() => touchBusiness("email")} placeholder={placeholders.emailBusiness} style={businessTouched.email && businessErrors.email ? fieldErr : field} />
                        {businessTouched.email && businessErrors.email && <span style={errMsg}>{businessErrors.email}</span>}
                      </div>
                    </div>
                    <div style={row2}>
                      <div>
                        <span style={lbl}>{f.date}</span>
                        <DatePicker name="date" value={business.date} onChange={v => { setBusiness(p => ({ ...p, date: v, time: "" })); touchBusiness("date"); }} style={businessTouched.date && businessErrors.date ? fieldErr : field} />
                        {businessTouched.date && businessErrors.date && <span style={errMsg}>{businessErrors.date}</span>}
                      </div>
                      <div>
                        <label style={lbl}>{f.time}</label>
                        <select name="time" value={business.time} onChange={handleBusiness} onBlur={() => touchBusiness("time")} style={businessTouched.time && businessErrors.time ? fieldErr : field}>
                          <option value="">{f.selectTime}</option>
                          {getTimesForDate(business.date, "business").map(tm => <option key={tm} value={tm}>{tm}</option>)}
                        </select>
                        {businessTouched.time && businessErrors.time && <span style={errMsg}>{businessErrors.time}</span>}
                      </div>
                    </div>
                    <div style={row3}>
                      <div style={{ gridColumn: isMobile ? "1" : "1 / 2" }}>
                        <label style={lbl}>{f.guests}</label>
                        <select name="guests" value={business.guests} onChange={handleBusiness} style={field}>
                          {GUESTS.map(n => <option key={n} value={n}>{n} {n === "1" ? f.guestsSingular : f.guestsPlural}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label style={lbl}>{f.notesBusiness}</label>
                      <textarea name="message" value={business.message} onChange={handleBusiness} rows={3} placeholder={placeholders.notesBusiness} style={{ ...field, resize: "none" }} />
                    </div>
                    {status === "error" && <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "#c0392b", textAlign: "center" }}>{r.sendError}</p>}
                    <SubmitButton sending={status === "sending"} label={r.submit} labelSending={r.submitting} />
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

function SubmitButton({ sending, label, labelSending }: { sending: boolean; label: string; labelSending: string }) {
  return (
    <button
      type="submit"
      disabled={sending}
      style={{
        fontFamily: "'Lato', sans-serif", fontSize: "12px", letterSpacing: "0.22em",
        textTransform: "uppercase", fontWeight: 700,
        background: "var(--primary)", color: "var(--primary-foreground)",
        border: "none", padding: "16px", cursor: sending ? "not-allowed" : "pointer", marginTop: 4,
        transition: "opacity 0.18s ease", opacity: sending ? 0.6 : 1,
      }}
      onMouseOver={e => { if (!sending) e.currentTarget.style.opacity = "0.88"; }}
      onMouseOut={e => { e.currentTarget.style.opacity = sending ? "0.6" : "1"; }}
    >
      {sending ? labelSending : label}
    </button>
  );
}
