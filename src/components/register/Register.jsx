import { Link } from "react-router";
import { useAuth } from "../../contexts/auth-context";

export default function Register() {
  const { register } = useAuth();

  const registerAction = (formData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    register({ name, email, password });
  };

  return (
    <main className="container form-page" id="main">
      <section className="form-shell auth-shell">
        <div className="form-intro">
          <span className="eyebrow">Come on in</span>
          <h1>
            Your next favorite
            <br />
            <em>starts here.</em>
          </h1>
          <p>
            Join a community that believes good food is even better when
            shared.
          </p>
          <div className="auth-photo">
            <img
              src="https://images.unsplash.com/photo-1753791320863-bda47c67cd00?auto=format&fit=crop&w=1000&q=85"
              alt="Fresh tomatoes, basil and burrata"
            />
          </div>
        </div>
        <form className="design-form" action={registerAction}>
          <h2>Create account</h2>
          <p className="form-muted">Link little about you, then let's cook.</p>
          <label htmlFor="name">Display name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="e.g. Jamie Green"
            required
          />
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
            placeholder="At least 8 characters"
            required
          />
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            placeholder="Type your password again"
            required
          />
          {/* <label className="check-label terms">
            <input type="checkbox" required /> I agree to the community
            guidelines.
          </label> */}
          <button className="button button-primary form-submit" type="submit">
            Create my account
          </button>
          <p className="form-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
