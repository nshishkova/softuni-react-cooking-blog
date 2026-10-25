import { Link } from "react-router";

     export default function About() {
       return (
     <section className="community-section" id="about">
        <div className="container community-inner">
          <div className="community-art">
            <img
              src="https://images.unsplash.com/photo-1753791320863-bda47c67cd00?auto=format&fit=crop&w=1000&q=85"
              alt="A colorful bowl of fresh seasonal ingredients"
              loading="lazy"
            />
            <span className="community-stamp">
              made
              <br />
              with ♡
            </span>
          </div>
          <div className="community-copy">
            <span className="eyebrow">More than a recipe box</span>
            <h2>
              A table is better
              <br />
              when <em>everyone's invited.</em>
            </h2>
            <p>
              FoodMates is a place for everyday cooks to share the dishes they
              love. No fancy techniques needed — just good food, honest tips,
              and a community that inspires you to try something new.
            </p>
            <Link className="button button-primary" to="/register">
              Join our kitchen <span aria-hidden="true">→</span>
            </Link>
            <div className="community-stat">
              <strong>One recipe at a time.</strong>
              <span>Let's make something lovely.</span>
            </div>
          </div>
        </div>
      </section>
       );
     }