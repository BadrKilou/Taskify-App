import React from "react";

export const Section3 = () => {
  return (
    <div>
      <div class="section3">
        <div class="text3">
          <h2>Get early access today</h2>
          <p>
            It only takes a moment to sign up and our free starter tier is
            extremely generous. If you have any questions, our support team
            would be happy to help you.
          </p>
        </div>
        <form action="#">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email@example.com"
          />
          <input id="submit" type="submit" value="Get Started For Free" />
        </form>
      </div>
    </div>
  );
};
