import React from 'react';

interface Testimonial {
  quote: string;
  author: string;
}

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="bg-white/80 p-6 rounded-lg shadow-sm">
      <p className="text-brand-brown italic">"{testimonial.quote}"</p>
      <p className="text-right mt-4 font-display text-lg text-brand-gold">- {testimonial.author}</p>
    </div>
  );
};

export default TestimonialCard;