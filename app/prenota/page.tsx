'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function PrenotaPage() {
  const [services, setServices] = useState<any[]>([])
  const [dates, setDates] = useState<any[]>([])
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedService, setSelectedService] = useState('')

  useEffect(() => {
    loadServices()
    loadDates()
  }, [])

  async function loadServices() {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('active', true)

    if (data) setServices(data)
  }

  async function loadDates() {
    const { data } = await supabase
      .from('availability_days')
      .select('*')
      .eq('active', true)
      .order('date')

    if (data) setDates(data)
  }

  return (
    <main
      style={{
        maxWidth: 700,
        margin: '40px auto',
        padding: 20,
        fontFamily: 'Arial'
      }}
    >
      <h1>Prenota appuntamento</h1>

      <div style={{ marginTop: 20 }}>
        <label>Prestazione</label>

        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          style={{
            width: '100%',
            padding: 12,
            marginTop: 8,
            marginBottom: 20
          }}
        >
          <option value="">Seleziona prestazione</option>

          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Data disponibile</label>

        <select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            width: '100%',
            padding: 12,
            marginTop: 8,
            marginBottom: 20
          }}
        >
          <option value="">Seleziona data</option>

          {dates.map((d) => (
            <option key={d.id} value={d.date}>
              {d.date} | {d.start_time} - {d.end_time}
            </option>
          ))}
        </select>
      </div>

      <input
        placeholder="Nome"
        style={{
          width: '100%',
          padding: 12,
          marginBottom: 12
        }}
      />

      <input
        placeholder="Cognome"
        style={{
          width: '100%',
          padding: 12,
          marginBottom: 12
        }}
      />

      <input
        placeholder="Telefono"
        style={{
          width: '100%',
          padding: 12,
          marginBottom: 12
        }}
      />

      <input
        placeholder="Email"
        style={{
          width: '100%',
          padding: 12,
          marginBottom: 20
        }}
      />

      <button
        style={{
          background: '#0f766e',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: 8
        }}
      >
        Conferma prenotazione
      </button>
    </main>
  )
}
