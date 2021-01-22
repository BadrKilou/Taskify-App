import React from "react";
import Card from "./Card";
export const Testimonials = ({ testimonials }) => {
  return (
    <div className="admire">
      {testimonials.map((testimonial) => (
        <div className="testimonials_section">
          <div key={testimonial.id}>
            <Card testimonial={testimonial} />
          </div>
        </div>
      ))}
    </div>
  );
};
