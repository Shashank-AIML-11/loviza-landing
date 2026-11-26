import React, { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import {
  ANNUAL_DISCOUNT_PERCENT,
  annualSavingInr,
  formatINR,
  planPerMonthInr,
  planTotalInr,
  PLANS,
  type BillingCycle,
} from "../../lib/plans";
import { APP_URL } from "../../lib/config";
import { playClickSound } from "./audio";

/**
 * Landing-page pricing section.
 *
 * Plans, prices (INR) and feature lists come from the single source of truth
 * in src/lib/plans.ts - the same data that drives /pricing, /checkout and the
 * Razorpay plans - so the landing page can never drift from what is billed.
 */
export const PricingSection: React.FC = () => {
  const [cycle, setCycle] = useState<BillingCycle>("annual");
  const toggleButton = (value: BillingCycle, label: string) => (
    <button
      type="button"
      role="radio"
      aria-checked={cycle === value}
      onClick={() => setCycle(value)}
      className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-colors cursor-pointer ${
        cycle === value ? "bg-primary text-black" : "text-zinc-400 hover:text-white"
      }`}
    >
      {label}
      {value === "annual" && (
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${
            cycle === "annual" ? "bg-black/20 text-black" : "bg-primary/20 text-primary"
          }`}
        >
          Save {ANNUAL_DISCOUNT_PERCENT}%
        </span>
      )}
    </button>
  );

  return (
    <section
      id="pricing"
      className="py-20 md:py-28 border-t border-zinc-800 relative bg-black text-zinc-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Pick your plan
            </h2>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">or</span>
            <a
              href={`${APP_URL}/pricing?onetime=1`}
              onClick={playClickSound}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-black uppercase tracking-wider text-black shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary-light active:scale-95 cursor-pointer"
            >
              <span>Generate One Time with {formatINR(500)}</span>
            </a>
          </div>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Upgrade or downgrade at any time. One-time covers this week's content only.
          </p>
          <div
            role="radiogroup"
            aria-label="Billing period"
            className="mt-8 inline-flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-950 p-1"
          >
            {toggleButton("monthly", "Monthly")}
            {toggleButton("annual", "Annual")}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => {
            const isPopular = Boolean(plan.highlight);

            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  isPopular
                    ? "bg-zinc-900 border-2 border-primary shadow-2xl shadow-primary/10 md:-translate-y-2"
                    : "bg-zinc-950 border border-zinc-800 hover:border-zinc-700"
                }`}
              >
                {/* Popular Pill Label */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-black text-[11px] font-black uppercase tracking-wider shadow-md">
                    Most popular
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="mt-1 text-sm text-zinc-400 min-h-[40px] leading-relaxed">
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="my-6 pb-6 border-b border-zinc-800">
                    <div className="flex items-baseline gap-1">
                      {cycle === "annual" && (
                        <span className="mr-1 text-lg font-semibold text-zinc-500 line-through">
                          {formatINR(plan.priceMonthly)}
                        </span>
                      )}
                      <span className="text-4xl font-black text-white">
                        {formatINR(planPerMonthInr(plan, cycle))}
                      </span>
                      <span className="text-sm text-zinc-500">/month</span>
                    </div>
                    <p className="mt-2 min-h-[1.25rem] text-xs text-zinc-500">
                      {cycle === "annual"
                        ? `Billed ${formatINR(planTotalInr(plan, "annual"))} once a year. You save ${formatINR(annualSavingInr(plan))}.`
                        : "Billed monthly."}
                    </p>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8 text-sm text-zinc-300">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA: sends visitors to sign in on the app, then on to pricing/checkout */}
                <a
                  href={cycle === "annual" ? `${APP_URL}/pricing?cycle=annual` : `${APP_URL}/auth?redirect=%2Fpricing`}
                  onClick={playClickSound}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-95 ${
                    isPopular
                      ? "bg-primary hover:bg-primary-light text-black shadow-primary/25"
                      : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                  }`}
                >
                  <span>Choose {plan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
