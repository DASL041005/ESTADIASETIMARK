import React, { useState } from "react";
import "./SoportePage.css";
import { api } from "../services/api";

// Preguntas frecuentes
const faqs = [
  {
    question: "¿Cómo rastreo mi pedido?",
    answer:
      "Una vez que tu pedido es enviado, recibirás un correo electrónico con el número de seguimiento y un enlace directo a la paquetería.",
  },
  {
    question: "¿Cuál es la política de devoluciones?",
    answer:
      "Aceptamos devoluciones de productos sin abrir dentro de los 30 días posteriores a la compra. Por favor, inicia el proceso a través del formulario de ticket.",
  },
  {
    question: "¿Necesito una cuenta para comprar rollos?",
    answer:
      "No, puedes realizar pedidos como invitado, pero te recomendamos crear una cuenta empresarial para acceder a precios mayoristas y soporte prioritario.",
  },
  {
    question: "¿Qué tipo de etiquetas son compatibles con mi impresora?",
    answer:
      "Revisa la sección 'Impresora' o contáctanos especificando el modelo de tu equipo para una recomendación precisa.",
  },
];

// FAQ item
const FAQItem: React.FC<{ faq: { question: string; answer: string } }> = ({
  faq,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        {faq.question}
        <span className="faq-icon">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <div className="faq-answer">{faq.answer}</div>}
    </div>
  );
};

const SoportePage: React.FC = () => {
  const [ticketData, setTicketData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTicketData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/tickets", {
        id_cliente: 1, // ← reemplazar por el usuario logueado
        asunto: ticketData.subject,
        mensaje: ticketData.message,
      });

      console.log("Ticket creado:", response.data);
      alert("¡Ticket de soporte enviado exitosamente!");

      setTicketData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      const error = err as unknown;
      console.error("Error al enviar ticket:", error);
      alert("Ocurrió un error al enviar el ticket. Intenta de nuevo.");
    }
  };

  return (
    <div className="soporte-page-container">
      <h1 className="soporte-title">Centro de Soporte ETIMARK</h1>
      <p className="soporte-subtitle">
        Estamos aquí para ayudarte. Selecciona una opción de contacto o consulta
        nuestras preguntas frecuentes.
      </p>

      <div className="soporte-sections">
        {/* CONTACTO DIRECTO */}
        <section className="contact-info-section">
          <h2 className="section-header">Contacto Directo</h2>
          <div className="contact-cards">
            <div className="contact-card">
              <h3>Llamada Rápida</h3>
              <p>Lunes a Viernes de 9:00 a 18:00 hrs.</p>
              <a href="tel:6188252341" className="contact-link">
                📞 618 825 23 41
              </a>
            </div>

            <div className="contact-card">
              <h3>Correo Electrónico</h3>
              <p>Envíanos tus dudas en cualquier momento.</p>
              <a href="mailto:atc@etimark.com" className="contact-link">
                ✉️ atc@etimark.com
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq-section">
          <h2 className="section-header">Preguntas Frecuentes (FAQ)</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} />
            ))}
          </div>
        </section>

        {/* FORMULARIO DE TICKET */}
        <section className="ticket-form-section">
          <h2 className="section-header">Crear Ticket de Soporte</h2>
          <p className="form-description">
            Describe tu problema o consulta detalladamente y te asignaremos un
            técnico.
          </p>

          <form onSubmit={handleSubmit} className="ticket-form">
            <div className="form-group">
              <label htmlFor="name">Nombre Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={ticketData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={ticketData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Asunto</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={ticketData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensaje / Descripción del Problema</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={ticketData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-ticket-btn">
              Enviar Ticket
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SoportePage;
