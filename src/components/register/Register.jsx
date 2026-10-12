export default function Register() {
    return (

    <main className="container form-page" id="main">
        <section className="form-shell auth-shell">
            <div className="form-intro"><span className="eyebrow">Come on in</span>
                <h1>Your next favorite<br/><em>starts here.</em></h1>
                <p>Join a community that believes good food is even better when shared.</p>
                <div className="auth-photo"><img
                        src="https://images.unsplash.com/photo-1753791320863-bda47c67cd00?auto=format&fit=crop&w=1000&q=85"
                        alt="Fresh tomatoes, basil and burrata"/></div>
            </div>
            <form className="design-form">
                <h2>Create account</h2>
                <p className="form-muted">A little about you, then let's cook.</p><label htmlFor="name">Display
                    name</label><input id="name" type="text" placeholder="e.g. Jamie Green" required/><label
                    htmlFor="email">Email address</label><input id="email" type="email" placeholder="you@example.com"
                    required/><label htmlFor="password">Password</label><input id="password" type="password"
                    placeholder="At least 8 characters" required/><label htmlFor="confirm-password">Confirm
                    password</label><input id="confirm-password" type="password" placeholder="Type your password again"
                    required/><label className="check-label terms"><input type="checkbox" required/> I agree to the community
                    guidelines.</label><button className="button button-primary form-submit" type="button">Create my
                    account</button>
                <p className="form-switch">Already have an account? <a href="login.html">Log in</a></p>
                <p className="demo-note">Design preview only — this form does not create an account.</p>
            </form>
        </section>
    </main>
    )
}