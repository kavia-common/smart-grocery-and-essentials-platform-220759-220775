import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <main className="container" style={{ padding: "32px 0" }}>
      <section className="card" role="alert" aria-live="assertive">
        <div className="cardHeader">
          <div className="badge mono">404</div>
          <h1 className="title" style={{ marginTop: 10 }}>
            Page Not Found
          </h1>
          <p className="subtitle">The page you’re looking for doesn’t exist.</p>
        </div>
        <div className="cardBody">
          <Link className="btn btnPrimary" href="/">
            Return Home
          </Link>
        </div>
      </section>
    </main>
  );
}
