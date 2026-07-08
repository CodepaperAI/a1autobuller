import { useState, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

/**
 * Registration page
 * -----------------------------------------------------------------------------
 * Optional account creation with full client-side validation (name, email,
 * matching passwords). Calls the mock AuthContext.register and returns home.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = useCallback(() => {
    const next = {};
    if (!values.name.trim()) next.name = "Enter your full name.";
    if (!values.email.trim()) next.email = "Enter your email.";
    else if (!EMAIL_RE.test(values.email)) next.email = "That email doesn't look right.";
    if (!values.password) next.password = "Choose a password.";
    else if (values.password.length < 6) next.password = "Use at least 6 characters.";
    if (values.confirm !== values.password) next.confirm = "Passwords don't match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [values]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validate()) return;
      setSubmitting(true);
      await register({ name: values.name, email: values.email });
      router.push("/");
    },
    [validate, register, values.name, values.email, router]
  );

  return (
    <>
      <Head>
        <title>Create an account | A1 Buller Auto</title>
        <meta name="robots" content="noindex" />
      </Head>

      <section className="section flex min-h-[70vh] items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="surface-elevated w-full max-w-md rounded-2xl p-8 shadow-panel"
        >
          <h1 className="text-2xl font-extrabold tracking-tight">Create your account</h1>
          <p className="text-secondary mt-1.5 text-sm">
            Track repairs and manage bookings — it only takes a moment.
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
            <Input
              label="Full name"
              placeholder="Jordan Rivera"
              value={values.name}
              onChange={setField("name")}
              error={errors.name}
              autoComplete="name"
            />
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
              placeholder="At least 6 characters"
              value={values.password}
              onChange={setField("password")}
              error={errors.password}
              autoComplete="new-password"
            />
            <Input
              label="Confirm password"
              type="password"
              placeholder="Re-enter your password"
              value={values.confirm}
              onChange={setField("confirm")}
              error={errors.confirm}
              autoComplete="new-password"
            />
            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Creating account…" : "Create account"}
            </Button>
          </form>

          <p className="text-secondary mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-brand-600 hover:underline">
              Log in
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
