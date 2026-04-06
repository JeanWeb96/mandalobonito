
import React from 'react';
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from '../components/icons/SocialIcons';
import { LOGO_URL } from '../constants';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-gold blur-3xl opacity-20 rounded-full"></div>
            <div className="relative z-10 h-40 w-40 rounded-full border-4 border-brand-gold shadow-xl mx-auto overflow-hidden bg-white">
              <img 
                src={LOGO_URL} 
                alt="Mándalo Bonito Logo" 
                className="w-full h-full object-cover scale-[1.12]" 
              />
            </div>
          </div>
        </div>
        <h1 className="font-display text-5xl text-brand-brown mb-4">Ponte en contacto</h1>
        <p className="text-lg mb-10 text-brand-gray font-light">
          ¿Tienes una idea para un proyecto personalizado o alguna pregunta? ¡Nos encantaría saber de ti!
        </p>

        <div className="space-y-8">
          <div className="bg-white/50 p-6 rounded-3xl shadow-sm border border-brand-brown/5">
            <h2 className="font-display text-2xl text-brand-gold">Teléfono y WhatsApp</h2>
            <a href="https://api.whatsapp.com/send?phone=657340187" target="_blank" rel="noopener noreferrer" className="text-xl mt-2 inline-block hover:text-brand-gold transition-colors font-medium">
              657 34 01 87
            </a>
          </div>

          <div className="bg-white/50 p-6 rounded-3xl shadow-sm border border-brand-brown/5">
            <h2 className="font-display text-2xl text-brand-gold">Email</h2>
            <a href="mailto:mandalobonito@yahoo.com" className="text-xl mt-2 inline-block hover:text-brand-gold transition-colors font-medium">
              mandalobonito@yahoo.com
            </a>
          </div>

          <div className="bg-white/50 p-6 rounded-3xl shadow-sm border border-brand-brown/5">
            <h2 className="font-display text-2xl text-brand-gold">Redes Sociales</h2>
            <div className="flex justify-center space-x-6 mt-4">
              <a href="https://www.instagram.com/mandalobonito" target="_blank" rel="noopener noreferrer" className="text-brand-brown hover:text-brand-gold transition-colors">
                <div className="p-3 bg-brand-cream rounded-full">
                  <InstagramIcon className="h-8 w-8" />
                </div>
              </a>
              <a href="https://www.tiktok.com/@mandalobonito" target="_blank" rel="noopener noreferrer" className="text-brand-brown hover:text-brand-gold transition-colors">
                <div className="p-3 bg-brand-cream rounded-full">
                  <TikTokIcon className="h-8 w-8" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
