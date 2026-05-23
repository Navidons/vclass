import { Suspense } from "react";

import { LoginForm } from "./login-form";
import "../login.css";

export default function LoginPage() {
  return (
    <div className="login-container w-100">
      <div className="row">
        <div className="col-12 col-md-4 px-0">
          <div className="login-form">
            <img
              src="/vu-logo.png"
              alt="Logo"
              className="img-fluid logo"
              style={{ height: "70px", marginBottom: "30px", cursor: "pointer" }}
            />
            <h1 style={{ fontWeight: 700, fontSize: "20px", marginTop: "-10px" }}>
              VICTORIA UNIVERSITY
            </h1>
            <h2
              style={{
                fontWeight: 500,
                color: "rgba(0, 0, 0, 0.4)",
                marginBottom: "15px",
              }}
            >
              VClass Portal
            </h2>
            <Suspense fallback={<p className="w-100 mt-4">Loading…</p>}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
        <div className="col-12 col-md-8 px-0">
          <img
            src="/login/login.jpg"
            alt="Login"
            className="img-fluid"
            style={{ height: "100vh", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}
