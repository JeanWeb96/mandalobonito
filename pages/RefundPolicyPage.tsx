import React from 'react';

export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto prose prose-lg text-brand-brown">
        <h1 className="font-display text-5xl text-brand-brown">Política de Reembolso</h1>
        <p>
          Tenemos una política de devolución de 5 días, lo que significa que tienes 5 días después de recibir tu artículo para solicitar una devolución.
        </p>
        <p>
          Para ser elegible para una devolución, tu artículo debe estar en las mismas condiciones en que lo recibiste, sin usar, con etiquetas y en su embalaje original. También necesitarás el recibo o comprobante de compra.
        </p>
        <p>
          Para iniciar una devolución, puedes contactarnos en <a href="mailto:mandalobonito@yahoo.com" className="text-brand-gold hover:underline">mandalobonito@yahoo.com</a>. Si tu devolución es aceptada, te enviaremos instrucciones sobre cómo y dónde enviar tu paquete. Los artículos que nos devuelvan sin solicitar primero una devolución no serán aceptados.
        </p>

        <h2 className="font-display text-3xl text-brand-brown">Daños y problemas</h2>
        <p>
          Por favor, inspecciona tu pedido al recibirlo y contáctanos inmediatamente si el artículo está defectuoso, dañado o si recibes el artículo incorrecto, para que podamos evaluar el problema y corregirlo. La notificación de artículos defectuosos o incorrectos debe hacerse en un plazo de 5 días.
        </p>

        <h2 className="font-display text-3xl text-brand-brown">Excepciones / artículos no retornables</h2>
        <p>
          Ciertos tipos de artículos no pueden ser devueltos, como bienes perecederos (como alimentos, flores o plantas), productos personalizados (como pedidos especiales o artículos personalizados) y bienes de cuidado personal (como productos de belleza). Tampoco aceptamos devoluciones de materiales peligrosos, líquidos inflamables o gases. Por favor, ponte en contacto si tienes preguntas o inquietudes sobre tu artículo específico.
        </p>
        <p>
          Lamentablemente, no podemos aceptar devoluciones de artículos en oferta o tarjetas de regalo.
        </p>
        
        <h2 className="font-display text-3xl text-brand-brown">Intercambios</h2>
        <p>
          La forma más rápida de asegurarte de obtener lo que quieres es devolver el artículo que tienes y, una vez aceptada la devolución, realizar una compra por separado para el nuevo artículo.
        </p>
        
        <h2 className="font-display text-3xl text-brand-brown">Reembolsos</h2>
        <p>
          Te notificaremos una vez que hayamos recibido e inspeccionado tu devolución, y te haremos saber si el reembolso fue aprobado o no. Si se aprueba, se te reembolsará automáticamente en tu método de pago original. Recuerda que puede tomar algún tiempo para que tu banco o compañía de tarjeta de crédito procese y publique el reembolso también.
        </p>
        
        <p className="mt-8">
          <strong>Empresa:</strong> Mándalo Bonito<br />
          <strong>Contacto:</strong> <a href="mailto:mandalobonito@yahoo.com" className="text-brand-gold hover:underline">mandalobonito@yahoo.com</a>
        </p>
      </div>
    </div>
  );
}