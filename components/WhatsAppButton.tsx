
import React from 'react';
import { WhatsAppIcon } from './icons/SocialIcons';

export default function WhatsAppButton() {
  const phoneNumber = "657340187";
  const message = "Hola! Me gustaría hacer una consulta.";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110 z-50"
      aria-label="Contactar por WhatsApp"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}
