import { useState, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

/**
 * Login page
 * -----------------------------------------------------------------------------
 * Optional sign-in. Validates email/password client-side, then calls the mock
 * AuthContext.login and returns the visitor home. Nothing on the site is
 * blocked behind this — it only unlocks booking history / repair tracking.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = useCallback(() => {
    const next = {};
    if (!values.email.trim()) next.email = "Enter your email.";
    else if (!EMAIL_RE.test(values.email)) next.email = "That email doesn't look right.";
    if (!values.password) next.password = "Enter your password.";
    else if (values.password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [values]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validate()) return;
      setSubmitting(true);
      await login({ email: values.email });
      router.push("/");
    },
    [validate, login, values.email, router]
  );

  return (
    <>
      <Head>
        <title>Log in | A1 Buller Auto</title>
        <meta name="robots" content="noindex" />
      </Head>

      <section className="section flex min-h-[70vh] items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="surface-elevated w-full max-w-md rounded-2xl p-8 shadow-panel"
        >
          <h1 className="text-2xl font-extrabold tracking-tight">Welcome back</h1>
          <p className="text-secondary mt-1.5 text-sm">
            Log in to track your repair status and manage bookings.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={setField("email")}
              error={errors.email}
              autoComplete="email"
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={values.password}
              onChange={setField("password")}
              error={errors.password}
              autoComplete="current-password"
            />
            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Logging in…" : "Log in"}
            </Button>
          </form>

          <p className="text-secondary mt-6 text-center text-sm">
            New here?{" "}
            <Link href="/register" className="font-semibold text-brand-600 hover:underline">
              Create an account
            </Link>
          </p>
          <p className="mt-3 text-center text-sm">
            <Link href="/" className="text-secondary hover:text-brand-600">
              ← Continue browsing as a guest
            </Link>
          </p>
        </motion.div>
      </section>
    </>
  );
}
