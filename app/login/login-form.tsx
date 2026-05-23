"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Login failed");
        return;
      }

      const from = searchParams.get("from");
      router.push(from && from.startsWith(`/${data.portal}`) ? from : data.redirectTo);
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p className="text-left w-100 mt-4">Enter your credentials to sign in</p>
      {error && (
        <p className="text-red-600 text-sm w-100 mb-2" role="alert">
          {error}
        </p>
      )}
      <div className="w-100">
        <input
          type="text"
          placeholder="Reg / Staff / Admin ID"
          className="input-field legacy-input bg-white"
          style={{ width: "265px", height: "calc(2.55rem) !important" }}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="input-field legacy-input bg-white"
            style={{ width: "265px", height: "calc(2.55rem) !important" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          <button
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <i
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
              style={{ position: "relative", top: "-2px" }}
            />
          </button>
        </div>
        <button
          className="sign-in-button"
          onClick={handleLogin}
          disabled={loading}
          type="button"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
        <details className="mt-4 text-xs text-gray-500" style={{ width: "265px" }}>
          <summary className="cursor-pointer">Demo accounts</summary>
          <ul className="mt-2 space-y-1 list-disc pl-4">
            <li>Student: VU-BCS-2409-1302</li>
            <li>Lecturer: VU-STAFF-LEC-001</li>
            <li>Dept Admin: VU-ADMIN-DEPT-001</li>
            <li>Faculty Admin: VU-ADMIN-FAC-001</li>
            <li>University Admin: VU-ADMIN-UNI-001</li>
            <li>Super Admin: VU-SUPER-ADMIN</li>
            <li>Password: password123</li>
          </ul>
        </details>
      </div>
    </>
  );
}
