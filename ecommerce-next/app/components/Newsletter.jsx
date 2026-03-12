"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const validateEmail = (value) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus("error");
      setErrorMsg("Email is required");
      return;
    }
    if (!validateEmail(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address");
      return;
    }
    // Simulate successful subscription
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section
      id="newsletter"
      className="px-4 lg:px-8 pb-8"
      aria-label="Newsletter subscription"
    >
      <div className="glass rounded-2xl p-8 md:p-12 text-center overflow-hidden relative max-w-7xl mx-auto">
        {/* Background glow */}
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10" />

        <span className="material-symbols-outlined text-primary text-4xl mb-4">
          mail
        </span>
        <h3 className="text-xl md:text-2xl font-bold mb-2">
          Join the <span className="text-gradient">Elite</span>
        </h3>
        <p className="text-text-secondary text-sm mb-6 max-w-md mx-auto">
          Get early access to drops and exclusive luxury member pricing. No spam, unsubscribe anytime.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <div className="flex-1 relative">
            <input
              id="newsletter-email"
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-colors ${
                status === "error"
                  ? "border-danger"
                  : "border-border-default"
              }`}
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              aria-label="Email address for newsletter"
              aria-invalid={status === "error"}
            />
            {status === "error" && (
              <p className="text-danger text-[11px] mt-1 text-left">
                {errorMsg}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="btn-primary whitespace-nowrap text-sm"
            disabled={status === "success"}
          >
            {status === "success" ? (
              <span className="flex items-center gap-2 justify-center">
                <span className="material-symbols-outlined text-base">
                  check_circle
                </span>
                Subscribed!
              </span>
            ) : (
              "Subscribe Now"
            )}
          </button>
        </form>

        {status === "success" && (
          <p className="text-success text-xs mt-3 animate-fade-in">
            Welcome to the club! Check your inbox for a welcome gift.
          </p>
        )}
      </div>
    </section>
  );
}
