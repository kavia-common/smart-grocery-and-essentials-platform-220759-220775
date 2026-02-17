"use client";

import { useEffect, useState } from "react";
import { apiRequest, type ApiError } from "@/lib/api";

type HealthState =
  | { status: "idle" | "loading" }
  | { status: "ok"; response: unknown }
  | { status: "error"; error: ApiError };

export default function Home() {
  const [health, setHealth] = useState<HealthState>({ status: "idle" });

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setHealth({ status: "loading" });
      try {
        const response = await apiRequest<unknown>("/", { method: "GET" });
        if (!cancelled) setHealth({ status: "ok", response });
      } catch (e) {
        if (!cancelled)
          setHealth({
            status: "error",
            error: e as ApiError,
          });
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <header className="nav">
        <div className="container navInner">
          <div className="brand" aria-label="Smart Grocery & Essentials">
            <span className="brandMark" aria-hidden="true" />
            <span>Smart Grocery</span>
            <span className="badge mono">RETRO UI</span>
          </div>

          <nav className="navLinks" aria-label="Primary">
            <a className="btn" href="#catalog">
              Catalog <span className="kbd">C</span>
            </a>
            <a className="btn" href="#account">
              Account <span className="kbd">A</span>
            </a>
            <a className="btn btnPrimary" href="#admin">
              Admin <span className="kbd">⌘</span>
            </a>
          </nav>
        </div>
      </header>

      <main className="container" style={{ padding: "22px 0 54px 0" }}>
        <section className="grid grid-cols-2-lg" aria-label="Overview">
          <div className="card" role="region" aria-label="Welcome">
            <div className="cardHeader">
              <div className="badge mono">SMART GROCERY OS v0.1</div>
              <h1 className="title" style={{ marginTop: 10 }}>
                Groceries, gadgets, and essentials — in a neon retro shell.
              </h1>
              <p className="subtitle">
                This UI is wired to the backend via a single configurable base
                URL (<span className="mono">NEXT_PUBLIC_API_BASE_URL</span>).
              </p>
            </div>

            <div className="cardBody">
              <div className="toolbar" style={{ marginBottom: 12 }}>
                <label style={{ flex: 1, minWidth: 220 }}>
                  <span className="small">Search</span>
                  <input
                    className="input"
                    placeholder="Try: milk, batteries, headphones…"
                    aria-label="Search products"
                  />
                </label>

                <button className="btn btnPrimary" type="button">
                  Scan Catalog
                </button>

                <button className="btn" type="button">
                  View Cart
                </button>
              </div>

              <hr className="hr" />

              <div
                style={{
                  display: "grid",
                  gap: 12,
                  marginTop: 14,
                }}
              >
                <div className="badge">
                  <span className="mono">STATUS</span>
                  <span>Backend connectivity</span>
                </div>

                {health.status === "loading" && (
                  <p className="subtitle">Pinging backend…</p>
                )}

                {health.status === "ok" && (
                  <div className="card" style={{ borderRadius: 12 }}>
                    <div className="cardBody">
                      <p style={{ marginBottom: 8 }}>
                        <span className="badge" style={{ borderColor: "rgba(52,211,153,0.35)", background: "rgba(52,211,153,0.10)" }}>
                          <span className="mono">OK</span> Connected
                        </span>
                      </p>
                      <p className="small mono" style={{ overflowX: "auto" }}>
                        {JSON.stringify(health.response)}
                      </p>
                    </div>
                  </div>
                )}

                {health.status === "error" && (
                  <div className="card" style={{ borderRadius: 12 }}>
                    <div className="cardBody">
                      <p style={{ marginBottom: 8 }}>
                        <span
                          className="badge"
                          style={{
                            borderColor: "rgba(251,113,133,0.38)",
                            background: "rgba(251,113,133,0.12)",
                          }}
                        >
                          <span className="mono">ERR</span> Disconnected
                        </span>
                      </p>
                      <p className="small">
                        {health.error.message}{" "}
                        <span className="mono">({health.error.status})</span>
                      </p>
                      <p className="small mono" style={{ marginTop: 8 }}>
                        Tip: set <span className="mono">NEXT_PUBLIC_API_BASE_URL</span>{" "}
                        in your environment to the FastAPI base URL.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <p className="small" style={{ marginTop: 14 }}>
                Next screens (catalog, product details, cart, checkout, auth,
                orders, admin) will activate automatically once the backend
                exposes the corresponding APIs in OpenAPI.
              </p>
            </div>
          </div>

          <aside className="card" role="complementary" aria-label="Quick actions">
            <div className="cardHeader">
              <div className="badge mono">QUICK MENU</div>
              <h2 style={{ marginTop: 10, fontSize: 18 }}>Panels</h2>
              <p className="subtitle">
                Responsive sidebar that collapses naturally on small screens.
              </p>
            </div>

            <div className="cardBody">
              <div className="grid" style={{ gap: 10 }}>
                <section className="card" style={{ borderRadius: 12 }}>
                  <div className="cardBody">
                    <p className="mono" style={{ fontWeight: 700 }}>
                      Catalog
                    </p>
                    <p className="small" id="catalog">
                      Browse by categories, filter, and search.
                    </p>
                  </div>
                </section>

                <section className="card" style={{ borderRadius: 12 }}>
                  <div className="cardBody">
                    <p className="mono" style={{ fontWeight: 700 }}>
                      Account
                    </p>
                    <p className="small" id="account">
                      Sign up, login, addresses, and order history.
                    </p>
                  </div>
                </section>

                <section className="card" style={{ borderRadius: 12 }}>
                  <div className="cardBody">
                    <p className="mono" style={{ fontWeight: 700 }}>
                      Admin
                    </p>
                    <p className="small" id="admin">
                      Manage products, categories, and orders.
                    </p>
                  </div>
                </section>

                <section className="card" style={{ borderRadius: 12 }}>
                  <div className="cardBody">
                    <p className="mono" style={{ fontWeight: 700 }}>
                      Checkout
                    </p>
                    <p className="small">
                      Cart review, shipping address, and order placement.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </aside>
        </section>

        <footer style={{ marginTop: 22 }} className="small">
          <span className="mono">Smart Grocery</span> · Retro theme · Responsive
          layout · API base URL configured via{" "}
          <span className="mono">NEXT_PUBLIC_API_BASE_URL</span>
        </footer>
      </main>
    </>
  );
}
