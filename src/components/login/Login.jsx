import { useAuth } from "../../contexts/auth-context";

export default function Login() {
  const { login } = useAuth();

  const submitAction = (formData) => {
    const { email, password } = Object.fromEntries(formData);

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    login({ email, password });
  };

  return (
    <main className="container form-page" id="main">
      <section className="form-shell auth-shell">
        <div className="form-intro">
          <span className="eyebrow">Welcome back</span>
          <h1>
            Good to <em>see you.</em>
          </h1>
          <p>Sign in to save your favorites and share something delicious.</p>
          <div className="auth-photo">
            <img
              src="https://images.unsplash.com/photo-1671523557969-14e564017d09?auto=format&fit=crop&w=1000&q=85"
              alt="Fresh pasta with herbs"
            />
          </div>
        </div>
        <form className="design-form" action={submitAction}>
          <h2>Log in</h2>
          <p className="form-muted">Pick up where your kitchen left off.</p>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
          <div className="form-inline">
            <label className="check-label">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#forgot">Forgot password?</a>
          </div>
          <button className="button button-primary form-submit" type="submit">
            Log in
          </button>
          <p className="form-switch">
            New to RecipeHub? <a href="/register">Create an account</a>
          </p>
          <p className="demo-note">
            Design preview only — this form does not authenticate.
          </p>
        </form>
      </section>
    </main>
  );
}
