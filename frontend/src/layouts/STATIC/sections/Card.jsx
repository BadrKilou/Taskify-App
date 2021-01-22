import React, { Fragment } from "react";
import "../scss/Testimonials.scss";
import { Link } from "react-router-dom";
const Card = ({ testimonial }) => {
  return (
    <Fragment>
      <div class="section2">
        <div class="background-color">
          <div class="text2">
            <h1>{testimonial.title}</h1>
            <p>{testimonial.heading}</p>
            <Link to="/register">
              Get Started
              <img
                src="https://raw.githubusercontent.com/hammercait/fylo-two-column-layout/9597c64eec3cb785b4a04b31e917204c1622355a/images/icon-arrow.svg"
                alt="tiny arrow"
              />
            </Link>
            <div class="testimonial">
              <img
                src="https://raw.githubusercontent.com/hammercait/fylo-two-column-layout/9597c64eec3cb785b4a04b31e917204c1622355a/images/icon-quotes.svg"
                alt="quote icon"
              />
              <p>
                Takyo has improved our team productivity by an order of
                magnitude. Since making the switch our team has become a
                well-oiled collaboration machine.
              </p>
              <img
                class="profile-pic"
                src="https://avatars0.githubusercontent.com/u/46659984?s=460&u=a31b122b5870ad97411a3dd36d781db36b07f6c2&v=4"
                alt="profile pic"
              />
              <div class="name">
                <h5>Badr Kilou</h5>
                <h6>Founder & CEO, Huddle</h6>
              </div>
            </div>
          </div>
          <img
            src="https://raw.githubusercontent.com/hammercait/fylo-two-column-layout/9597c64eec3cb785b4a04b31e917204c1622355a/images/illustration-2.svg"
            class="sec2img"
            alt="people working"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Card;
