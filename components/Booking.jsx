"use client";

import { useEffect, useRef, useState } from "react";
import { BASE_API_URL } from "../lib/constants";

function Field({ label, error, children }) {
  return (
    <div>
      <label
        className="block text-xs tracking-[1.5px] uppercase mb-2"
        style={{ color: "#8A7A60" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[11px] mt-1" style={{ color: "#e74c3c" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function Booking({ t, selectedPackage = "" }) {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const b = t.booking;
  const f = b.form;
  const isRTL = t.dir === "rtl";
  const locale = t.lang === "ar" ? "ar" : "en";

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  // Fetched package objects [{ _id, price, ar: { name }, en: { name } }]
  const [packageList, setPackageList] = useState([]);

  const [form, setForm] = useState({
    guestName: "",
    age: "",
    phone: "",
    numberOfCompanions: "0",
    expectedArrivalDate: "",
    expectedArrivalTime: "",
    directionOfTravel: "وصول الي مصر",
    package: selectedPackage, // stores _id
    notes: "",
  });

  // Sync selectedPackage prop → form when parent selects a package
  useEffect(() => {
    if (selectedPackage) {
      setForm((prev) => ({ ...prev, package: selectedPackage }));
    }
  }, [selectedPackage]);

  // Fetch packages for the dropdown
  useEffect(() => {
    fetch(`${BASE_API_URL}/packages`)
      .then((res) => res.json())
      .then((data) => setPackageList(data))
      .catch(() => { });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1 }
    );
    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);
    return () => observer.disconnect();
  }, []);

  const set = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Derived: selected package object and total cost
  const selectedPkg = packageList.find((p) => p._id === form.package) ?? null;
  const companions = Math.max(0, Number(form.numberOfCompanions) || 0);
  const totalPersons = companions;
  const now = new Date();
  const arrival = new Date(form.expectedArrivalDate);

  const diffInDays = (arrival - now) / (1000 * 60 * 60 * 24);

  let totalCost = null;

  if (selectedPkg) {
    const basePrice = selectedPkg.price * totalPersons;

    if (diffInDays >= 5) {
      totalCost = basePrice * 0.9; 
    } else {
      totalCost = basePrice;
    }
  }

  const validate = () => {
    const e = {};
    if (!form.guestName.trim()) e.guestName = f.required;
    if (!form.age || isNaN(Number(form.age)) || Number(form.age) <= 0)
      e.age = f.required;
    if (!form.phone.trim()) e.phone = f.required;
    if (
      isNaN(Number(form.numberOfCompanions)) ||
      Number(form.numberOfCompanions) < 0
    )
      e.numberOfCompanions = f.required;
    if (!form.expectedArrivalDate) e.expectedArrivalDate = f.required;
    if (!form.expectedArrivalTime.trim()) e.expectedArrivalTime = f.required;
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        guestName: form.guestName.trim(),
        age: Number(form.age),
        phone: form.phone.trim(),
        numberOfCompanions: Number(form.numberOfCompanions),
        expectedArrivalDate: new Date(form.expectedArrivalDate).toISOString(),
        expectedArrivalTime: form.expectedArrivalTime.trim(),
        ...(form.directionOfTravel.trim() && {
          directionOfTravel: form.directionOfTravel.trim(),
        }),
        ...(form.package && { package: form.package }), // sends _id
        ...(form.notes.trim() && { notes: form.notes.trim() }),
      };

      const res = await fetch(`${BASE_API_URL}/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`${res.status}`);

      setSubmitted(true);
      setForm({
        guestName: "",
        age: "",
        phone: "",
        numberOfCompanions: "0",
        expectedArrivalDate: "",
        expectedArrivalTime: "",
        directionOfTravel: "",
        package: "",
        notes: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError(f.submitError);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(201,168,76,0.15)",
    borderRadius: "2px",
    padding: "13px 16px",
    color: "#fff",
    fontFamily: "inherit",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.3s",
    direction: isRTL ? "rtl" : "ltr",
  };
  const errStyle = { ...inputStyle, border: "1px solid rgba(231,76,60,0.5)" };
  const focusIn = (e) => (e.target.style.borderColor = "#C9A84C");
  const focusOut = (e) =>
  (e.target.style.borderColor = errors[e.target.name]
    ? "rgba(231,76,60,0.5)"
    : "rgba(201,168,76,0.15)");

  return (
    <section
      id="book"
      className="py-24 px-6 lg:px-12 relative overflow-hidden"
      style={{ background: "#1A1510" }}
    >
      <div
        className="absolute -bottom-64 -left-64 w-[600px] h-[600px] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

        {/* Left — contact info */}
        <div ref={leftRef} className="reveal">
          <div className="section-label">{b.sectionLabel}</div>
          <h2 className="text-[clamp(32px,4vw,54px)] font-bold leading-[1.2] mb-4">
            {b.title}{" "}
            <span className="block gold-text">{b.titleAccent}</span>
          </h2>
          <p
            className="text-base leading-[1.8] font-light mb-10"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {b.desc}
          </p>
          <div className="flex flex-col gap-4">
            {b.contacts.map((item, i) => {
              const Tag = item.href ? "a" : "div";
              return (
                <Tag
                  key={i}
                  href={item.href || undefined}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 px-6 py-4 rounded-sm transition-all duration-300"
                  style={{
                    background: "rgba(201,168,76,0.05)",
                    border: "1px solid rgba(201,168,76,0.1)",
                    cursor: item.href ? "pointer" : "default",
                    textDecoration: "none",
                    color: "#fff",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-lg shrink-0"
                    style={{ background: "rgba(201,168,76,0.15)" }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </div>
                  <div>
                    <span
                      className="block text-[11px] tracking-[2px] uppercase mb-0.5"
                      style={{ color: "#C9A84C" }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {item.value}
                    </span>
                  </div>
                </Tag>
              );
            })}
          </div>
        </div>

        {/* Right — form */}
        <div ref={rightRef} className="reveal">
          <div
            className="p-8 rounded-sm"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(201,168,76,0.12)",
            }}
          >
            <h3
              className="text-xl font-bold mb-8"
              style={{ color: "#C9A84C" }}
            >
              {f.title}
            </h3>

            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-5">

                {/* Name + Age */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label={f.name} error={errors.guestName}>
                    <input
                      type="text"
                      name="guestName"
                      value={form.guestName}
                      onChange={set("guestName")}
                      placeholder={f.namePlaceholder}
                      style={errors.guestName ? errStyle : inputStyle}
                      onFocus={focusIn}
                      onBlur={focusOut}
                      disabled={loading}
                    />
                  </Field>
                  <Field label={f.age} error={errors.age}>
                    <input
                      type="number"
                      name="age"
                      value={form.age}
                      onChange={set("age")}
                      placeholder={f.agePlaceholder}
                      min="1"
                      max="120"
                      style={errors.age ? errStyle : inputStyle}
                      onFocus={focusIn}
                      onBlur={focusOut}
                      disabled={loading}
                    />
                  </Field>
                </div>

                {/* Phone + Companions */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label={f.phone} error={errors.phone}>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder={f.phonePlaceholder}
                      style={errors.phone ? errStyle : inputStyle}
                      onFocus={focusIn}
                      onBlur={focusOut}
                      disabled={loading}
                    />
                  </Field>
                  <Field label={f.companions} error={errors.numberOfCompanions}>
                    <input
                      type="number"
                      name="numberOfCompanions"
                      value={form.numberOfCompanions}
                      onChange={set("numberOfCompanions")}
                      placeholder={f.companionsPlaceholder}
                      min="0"
                      style={errors.numberOfCompanions ? errStyle : inputStyle}
                      onFocus={focusIn}
                      onBlur={focusOut}
                      disabled={loading}
                    />
                  </Field>
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-2 gap-4">
                  <Field label={f.date} error={errors.expectedArrivalDate}>
                    <input
                      type="date"
                      name="expectedArrivalDate"
                      value={form.expectedArrivalDate}
                      onChange={set("expectedArrivalDate")}
                      style={{
                        ...(errors.expectedArrivalDate ? errStyle : inputStyle),
                        colorScheme: "dark",
                      }}
                      onFocus={focusIn}
                      onBlur={focusOut}
                      disabled={loading}
                    />
                  </Field>
                  <Field label={f.time} error={errors.expectedArrivalTime}>
                    <input
                      type="time"
                      name="expectedArrivalTime"
                      value={form.expectedArrivalTime}
                      onChange={set("expectedArrivalTime")}
                      style={{
                        ...(errors.expectedArrivalTime ? errStyle : inputStyle),
                        colorScheme: "dark",
                      }}
                      onFocus={focusIn}
                      onBlur={focusOut}
                      disabled={loading}
                    />
                  </Field>
                </div>

                {/* Direction of travel */}
                <Field label={f.direction}>
                  <select
                    name="directionOfTravel"
                    value={form.directionOfTravel}
                    onChange={set("directionOfTravel")}
                    style={{ ...inputStyle, background: "#1A1510" }}
                    onFocus={focusIn}
                    onBlur={focusOut}
                    disabled={loading}
                  >
                    {f.directionOptions.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </Field>

                {/* Package — built from fetched data, value = _id */}
                <Field label={f.package}>
                  <select
                    name="package"
                    value={form.package}
                    onChange={set("package")}
                    style={{ ...inputStyle, background: "#1A1510" }}
                    onFocus={focusIn}
                    onBlur={focusOut}
                    disabled={loading}
                  >
                    <option value="">
                      {isRTL ? "— اختر باقة —" : "— Select a package —"}
                    </option>
                    {packageList.map((pkg) => (
                      <option key={pkg._id} value={pkg._id}>
                        {pkg[locale]?.name ?? pkg.en?.name} — ${pkg.price}
                      </option>
                    ))}
                  </select>
                </Field>

                {/* Total cost summary */}
                {totalCost !== null && (
                  <div
                    className="flex items-center justify-between px-5 py-4 rounded-sm"
                    style={{
                      background: "rgba(201,168,76,0.07)",
                      border: "1px solid rgba(201,168,76,0.25)",
                    }}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span
                        className="text-[11px] tracking-[2px] uppercase"
                        style={{ color: "#8A7A60" }}
                      >
                        {isRTL ? "التكلفة الإجمالية" : "Total cost"}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        {selectedPkg?.[locale]?.name} ×{" "}
                        {totalPersons}{" "}
                        {isRTL ? "شخص" : totalPersons === 1 ? "person" : "people"}
                      </span>
                    </div>
                    <span
                      className="text-2xl font-black"
                      style={{ color: "#C9A84C" }}
                    >
                      ${totalCost}
                    </span>
                  </div>
                )}

                {/* Notes */}
                <Field label={f.notes}>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={set("notes")}
                    rows={3}
                    placeholder={f.notesPlaceholder}
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={focusIn}
                    onBlur={focusOut}
                    disabled={loading}
                  />
                </Field>

                {/* Server error */}
                {error && (
                  <p
                    className="text-sm text-center py-2 px-4 rounded-sm"
                    style={{
                      background: "rgba(231,76,60,0.08)",
                      border: "1px solid rgba(231,76,60,0.2)",
                      color: "#e74c3c",
                    }}
                  >
                    {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 font-bold text-sm tracking-widest transition-all duration-300 rounded-[2px] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    background: submitted
                      ? "linear-gradient(135deg, #2ecc71, #27ae60)"
                      : "linear-gradient(135deg, #C9A84C, #9A7A30)",
                    color: submitted ? "#fff" : "#0D0D0D",
                  }}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      {isRTL ? "جارٍ الإرسال..." : "Sending..."}
                    </>
                  ) : submitted ? (
                    f.submitSuccess
                  ) : (
                    f.submit
                  )}
                </button>

              </div>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}