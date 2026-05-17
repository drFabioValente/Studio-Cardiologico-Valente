"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";;

export default function PrenotaPage() {
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const slots = [
    "16:00","16:15","16:30","16:45",
    "17:00","17:15","17:30","17:45",
    "18:00","18:15","18:30","18:45",
    "19:00","19:15","19:30","19:45"
  ];

  useEffect(() => {
    async function loadServices() {
      const { data } = await supabase
        .from("services")
        .select("*")
        .eq("active", true);

      if (data) setServices(data);
    }

    loadServices();
  }, []);

  async function bookAppointment() {
    if (
      !selectedService ||
      !selectedDate ||
      !selectedTime ||
      !firstName ||
      !lastName ||
      !phone
    ) {
      setMessage("Compili tutti i campi obbligatori.");
      return;
    }

    const { data: patient } = await supabase
      .from("patients")
      .insert({
        first_name: firstName,
        last_name: lastName,
        phone,
        email
      })
      .select()
      .single();

    if (!patient) {
      setMessage("Errore creazione paziente.");
      return;
    }

    const start = `${selectedDate} ${selectedTime}`;

    const { error } = await supabase
      .from("appointments")
      .insert({
        patient_id: patient.id,
        service_id: selectedService,
        start_datetime: start,
        end_datetime: start,
        status: "confirmed"
      });

    if (error) {
      setMessage("Errore prenotazione.");
    } else {
      setMessage("Prenotazione completata correttamente.");
    }
  }

  return (
    <main
      style={{
        maxWidth: 700,
        margin: "40px auto",
        padding: 24,
        fontFamily: "Arial"
      }}
    >
      <h1>Prenota appuntamento</h1>

      <div style={{ marginTop: 24 }}>
        <label>Prestazione</label>

        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 8,
            borderRadius: 10
          }}
        >
          <option value="">Seleziona</option>

          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: 24 }}>
        <label>Data</label>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 8,
            borderRadius: 10
          }}
        />
      </div>

      <div style={{ marginTop: 24 }}>
        <label>Orario</label>

        <select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginTop: 8,
            borderRadius: 10
          }}
        >
          <option value="">Seleziona orario</option>

          {slots.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: 24 }}>
        <input
          placeholder="Nome"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 12,
            borderRadius: 10
          }}
        />

        <input
          placeholder="Cognome"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 12,
            borderRadius: 10
          }}
        />

        <input
          placeholder="Telefono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 12,
            borderRadius: 10
          }}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 12,
            borderRadius: 10
          }}
        />
      </div>

      <button
        onClick={bookAppointment}
        style={{
          marginTop: 24,
          padding: "14px 24px",
          background: "#0f766e",
          color: "white",
          border: "none",
          borderRadius: 12,
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Conferma prenotazione
      </button>

      {message && (
        <p style={{ marginTop: 24 }}>
          {message}
        </p>
      )}
    </main>
  );
}
