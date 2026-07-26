"use client";

import { useState } from "react";
import type { FormEvent } from "react";

/** Newsletter signup section with state-driven success messaging. */
export function Newsletter() {
  // Track whether the user has successfully submitted the form
  const [submitted, setSubmitted] = useState(false);

  // Form submit handler preventing default page reload
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="mx-auto max-w-300 px-5 pb-4">
      <div className="rounded-[22px] border bg-white px-6 py-12 text-center sm:px-12">
        {/* Section Header */}
        <p className="text-xs font-semibold uppercase tracking-widest text-violet-500">
          Stay in the light
        </p>

        <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
          Subscribe for new collections & private offers
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-[#796782]">
          Join the Lumière list — 20% off your first order when you subscribe.
        </p>

        {/* Conditional View: Success Message vs Signup Form */}
        {submitted ? (
          <p className="mt-6 font-medium text-violet-600">
            Thank you — your welcome offer is on its way.
          </p>
        ) : (
          <form
            onSubmit={submit}
            className="mx-auto mt-6 flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <label className="sr-only" htmlFor="email">
              Email address
            </label>

            <input
              id="email"
              type="email"
              required
              placeholder="Enter your email"
              className="min-h-12 min-w-0 flex-1 rounded-full border bg-[#f8f8fc] px-5 outline-none focus:border-violet-400"
            />

            <button
              type="submit"
              className="rounded-full bg-violet-500 px-6 py-3 text-xs font-semibold uppercase tracking-[.06em] text-white transition hover:bg-violet-700"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}