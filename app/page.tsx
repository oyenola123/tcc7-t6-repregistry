"use client";

import { useState, type FormEvent } from "react";
import WalletConnect from "@/components/WalletConnect";

const navItems = [
  "Register property",
  "My titles",
  "Verification queue",
  "Transfers",
  "Registrars",
];

const steps = [
  {
    title: "Documents submitted",
    meta: "Survey plan, C of O scan and ID uploaded — 14 Jul 2026",
    state: "done",
    icon: "✓",
  },
  {
    title: "Land survey verified",
    meta: "Coordinates matched against federal cadastral records",
    state: "done",
    icon: "✓",
  },
  {
    title: "Registrar approval",
    meta: "Awaiting sign-off from Lagos State Land Registry",
    state: "active",
    icon: "3",
    badge: "In review · 2 of 3 signatures",
  },
  {
    title: "Title minted on-chain",
    meta: "Deed will be issued as a non-transferable ownership token",
    state: "pending",
    icon: "4",
    hash: "will assign tx hash on mint",
  },
];

export default function Home() {
  const [activeView, setActiveView] = useState("Register property");
  const [selectedStep, setSelectedStep] = useState(2);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [propertyTitle, setPropertyTitle] = useState("Plot 14B, Chevron Drive — Lekki");
  const [ownerName, setOwnerName] = useState("Adaeze N. Chukwu");
  const [statusMessage, setStatusMessage] = useState(
    "You can review each stage, switch sections, and register a new property."
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    owner: "",
    location: "",
    area: "620 sqm",
  });
  const [savedProperties, setSavedProperties] = useState<Array<{ id: string; title: string; owner: string; location: string; area: string; status: string }>>([
    {
      id: "demo-1",
      title: "Plot 14B, Chevron Drive — Lekki",
      owner: "Adaeze N. Chukwu",
      location: "Lekki Phase 1",
      area: "620 sqm",
      status: "Under review",
    },
  ]);

  const handleRegisterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = formValues.title.trim();
    const owner = formValues.owner.trim();
    const location = formValues.location.trim();
    const area = formValues.area.trim() || "620 sqm";

    if (!title || !owner || !location) {
      setStatusMessage("Please fill in the property title, owner name, and location before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const savedProperty = {
        id: `${Date.now()}`,
        title,
        owner,
        location,
        area,
        status: "Pending review",
      };

      setPropertyTitle(savedProperty.title);
      setOwnerName(savedProperty.owner);
      setSavedProperties((current) => [savedProperty, ...current]);
      setStatusMessage(
        `Registration saved for ${savedProperty.title}. The next step is document verification.`
      );
      setShowRegisterModal(false);
      setActiveView("Register property");
      setSelectedStep(0);
      setFormValues({ title: "", owner: "", location: "", area: "620 sqm" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const viewMeta = {
    "Register property": {
      header: propertyTitle,
      description:
        "Track this property from document submission through to its on-chain title deed.",
    },
    "My titles": {
      header: "3 active titles",
      description: "Review your owned properties, transfer requests, and registration history.",
    },
    "Verification queue": {
      header: "Verification queue",
      description: "Check pending land surveys, notarizations, and registrar approvals.",
    },
    Transfers: {
      header: "Transfers",
      description: "Manage ownership transfers and pending signatures from counterparties.",
    },
    Registrars: {
      header: "Registrars",
      description: "See active registrars, sign-off status, and chain confirmations.",
    },
  };

  const activeContent = viewMeta[activeView as keyof typeof viewMeta];

  return (
    <div className="min-h-screen bg-[#0F1B14] text-[#F3EEDD]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-white/10 bg-[#16241C] p-6 lg:w-56 lg:border-b-0 lg:border-r">
          <div className="mb-8">
            <div
              className="text-xl font-semibold tracking-wide"
              style={{ fontFamily: "Fraunces, serif" }}
            >
              tcc7-t6-<span className="text-[#C1863E]">repregistry</span>
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-[#9CA79B]">
              Title registry
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = activeView === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setActiveView(item)}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm ${
                    isActive ? "bg-[#C1863E]/15 text-[#C1863E]" : "text-[#9CA79B]"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isActive ? "bg-current" : "bg-[#9CA79B]"
                    }`}
                  />
                  {item}
                </button>
              );
            })}
          </nav>

          <div className="mt-10 border-t border-white/10 pt-4">
            <div className="mb-2 text-xs font-medium text-[#5B8770]">
              Connected wallet
            </div>
            <div className="text-xs text-[#9CA79B]">
              <WalletConnect />
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 lg:p-10">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1
                className="text-2xl font-semibold sm:text-[26px]"
                style={{ fontFamily: "Fraunces, serif" }}
              >
                {activeContent.header}
              </h1>
              <p className="mt-2 max-w-xl text-sm text-[#9CA79B]">
                {activeContent.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowRegisterModal(true)}
              className="rounded-md bg-[#C1863E] px-4 py-2 text-sm font-semibold text-[#241505]"
            >
              Register new property
            </button>
          </div>

          <div className="mb-4 rounded-lg border border-[#5B8770]/20 bg-[#16241C] px-4 py-3 text-sm text-[#C9BFA4]">
            {statusMessage}
          </div>

          {savedProperties.length > 0 ? (
            <div className="mb-4 rounded-lg border border-white/10 bg-[#16241C] p-4 text-sm text-[#C9BFA4]">
              <div className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[#9CA79B]">
                Recent registrations
              </div>
              <div className="space-y-2">
                {savedProperties.slice(0, 3).map((property) => (
                  <div key={property.id} className="flex items-center justify-between rounded-md bg-[#1C2C22] px-3 py-2">
                    <div>
                      <div className="font-medium text-[#F3EEDD]">{property.title}</div>
                      <div className="text-xs text-[#9CA79B]">{property.owner} · {property.location}</div>
                    </div>
                    <span className="rounded-full bg-[#5B8770]/15 px-2.5 py-1 text-[11px] text-[#5B8770]">
                      {property.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">
            <section className="rounded-xl border border-white/10 bg-[#16241C] p-6 shadow-sm">
              <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-[#9CA79B]">
                Registration progress
              </div>

              <div className="space-y-7">
                {steps.map((step, index) => {
                  const isSelected = selectedStep === index;

                  return (
                    <button
                      key={step.title}
                      type="button"
                      onClick={() => setSelectedStep(index)}
                      className={`grid w-full grid-cols-[40px_1fr] gap-4 rounded-lg border p-2 text-left transition ${
                        isSelected
                          ? "border-[#C1863E]/40 bg-[#1C2C22]"
                          : "border-transparent hover:border-white/10"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${
                          step.state === "done"
                            ? "bg-[#C1863E] text-[#241505] shadow-[0_0_0_3px_rgba(193,134,62,0.16)]"
                            : step.state === "active"
                              ? "border-[#5B8770] bg-[#1C2C22] text-[#5B8770]"
                              : "border-white/10 bg-[#1C2C22] text-[#9CA79B]"
                        }`}
                      >
                        {step.icon}
                      </div>
                      <div className="space-y-1">
                        <div className={`text-[14.5px] font-medium ${step.state === "pending" ? "text-[#9CA79B]" : "text-[#F3EEDD]"}`}>
                          {step.title}
                        </div>
                        <div className="text-sm leading-6 text-[#9CA79B]">
                          {step.meta}
                        </div>
                        {step.badge ? (
                          <span className="mt-2 inline-flex rounded-full bg-[#5B8770]/15 px-2.5 py-1 text-[11px] font-medium text-[#5B8770]">
                            {step.badge}
                          </span>
                        ) : null}
                        {step.hash ? (
                          <div className="mt-2 inline-block rounded bg-[#5B8770]/15 px-2 py-1 font-mono text-[11px] text-[#5B8770]">
                            {step.hash}
                          </div>
                        ) : null}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-[#9CA79B]">
                  <span className="h-3 w-3 rounded-sm bg-[#C1863E]" />
                  Brass — completed, notarized steps
                </div>
                <div className="flex items-center gap-2 text-sm text-[#9CA79B]">
                  <span className="h-3 w-3 rounded-sm bg-[#5B8770]" />
                  Jade — live chain data and in-progress state
                </div>
                <div className="flex items-center gap-2 text-sm text-[#9CA79B]">
                  <span className="h-3 w-3 rounded-sm border border-white/10 bg-[#1C2C22]" />
                  Muted — not yet reached
                </div>
              </div>
            </section>

            <aside className="overflow-hidden rounded-xl border border-black/5 bg-[#EFE7D3] text-[#3A3325] shadow-sm">
              <div className="flex h-36 items-center justify-center bg-gradient-to-br from-[#D8CBA6] to-[#C9BC98] text-[12px] uppercase tracking-[0.2em] text-[#8A7C57]">
                Property photo
              </div>
              <div className="p-5">
                <div className="text-[10.5px] uppercase tracking-[0.2em] text-[#8A7C57]">
                  Deed reference
                </div>
                <div
                  className="mt-1 text-xl font-semibold"
                  style={{ fontFamily: "Fraunces, serif" }}
                >
                  LAG-2026-0114-PLT
                </div>

                <div className="mt-4 space-y-3 border-t border-black/10 pt-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#7A6E52]">Owner</span>
                    <span className="font-medium">{ownerName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#7A6E52]">Coordinates</span>
                    <span className="font-mono text-xs">6.4432°N, 3.4726°E</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#7A6E52]">Land use</span>
                    <span className="font-medium">Residential</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#7A6E52]">Area</span>
                    <span className="font-medium">{formValues.area}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-md border border-[#5B8770]/35 bg-[#5B8770]/12 px-3 py-2 text-sm font-medium text-[#3F6350]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#5B8770]" />
                  {steps[selectedStep].title} · {selectedStep === 2 ? "in review" : "selected"}
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>

      {showRegisterModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-md rounded-xl border border-white/10 bg-[#16241C] p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[#F3EEDD]">Register a property</h2>
              <button
                type="button"
                onClick={() => setShowRegisterModal(false)}
                className="text-sm text-[#9CA79B]"
              >
                Close
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleRegisterSubmit}>
              <div>
                <label className="mb-1 block text-sm text-[#9CA79B]">Property title</label>
                <input
                  value={formValues.title}
                  onChange={(event) =>
                    setFormValues((current) => ({ ...current, title: event.target.value }))
                  }
                  className="w-full rounded-md border border-white/10 bg-[#0F1B14] px-3 py-2 text-sm text-[#F3EEDD]"
                  placeholder="e.g. Plot 22, Victoria Island"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-[#9CA79B]">Owner name</label>
                <input
                  value={formValues.owner}
                  onChange={(event) =>
                    setFormValues((current) => ({ ...current, owner: event.target.value }))
                  }
                  className="w-full rounded-md border border-white/10 bg-[#0F1B14] px-3 py-2 text-sm text-[#F3EEDD]"
                  placeholder="Owner full name"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-[#9CA79B]">Location</label>
                <input
                  value={formValues.location}
                  onChange={(event) =>
                    setFormValues((current) => ({ ...current, location: event.target.value }))
                  }
                  className="w-full rounded-md border border-white/10 bg-[#0F1B14] px-3 py-2 text-sm text-[#F3EEDD]"
                  placeholder="Lekki, Lagos"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-[#9CA79B]">Area</label>
                <input
                  value={formValues.area}
                  onChange={(event) =>
                    setFormValues((current) => ({ ...current, area: event.target.value }))
                  }
                  className="w-full rounded-md border border-white/10 bg-[#0F1B14] px-3 py-2 text-sm text-[#F3EEDD]"
                  placeholder="620 sqm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-[#C1863E] px-4 py-2 text-sm font-semibold text-[#241505] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Saving..." : "Submit registration"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}