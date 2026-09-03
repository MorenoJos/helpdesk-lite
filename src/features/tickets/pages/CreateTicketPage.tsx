import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { CreateTicketInput, TicketCategory, TicketPriority } from '../types/ticket.types'
import { ticketRepository } from '../repositories'
import styles from './CreateTicketPage.module.css'

// Estado inicial del formulario — tipado estricto
const INITIAL_FORM: CreateTicketInput = {
  title: '',
  description: '',
  status: 'open',
  priority: 'medium',
  category: 'hardware',
}

function CreateTicketPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<CreateTicketInput>(INITIAL_FORM)
  const [error, setError] = useState<string | null>(null)

  // Maneja cambios en inputs y selects — un solo handler para todos
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Validación básica
    if (form.title.trim().length < 5) {
      setError('El título debe tener al menos 5 caracteres.')
      return
    }
    if (form.description.trim().length < 10) {
      setError('La descripción debe tener al menos 10 caracteres.')
      return
    }

    ticketRepository.create(form)
    navigate('/')
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.btnBack} onClick={() => navigate('/')}>
          ← Volver
        </button>
        <h2 className={styles.title}>Nuevo ticket</h2>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.field}>
          <label className={styles.label} htmlFor="title">Título</label>
          <input
            className={styles.input}
            id="title"
            name="title"
            type="text"
            placeholder="Describe brevemente el problema"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="description">Descripción</label>
          <textarea
            className={styles.textarea}
            id="description"
            name="description"
            rows={4}
            placeholder="Explica el problema con más detalle"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="category">Categoría</label>
            <select
              className={styles.select}
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="hardware">Hardware</option>
              <option value="software">Software</option>
              <option value="network">Red</option>
              <option value="access">Acceso</option>
              <option value="other">Otro</option>
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="priority">Prioridad</label>
            <select
              className={styles.select}
              id="priority"
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.btnSecondary} onClick={() => navigate('/')}>
            Cancelar
          </button>
          <button type="submit" className={styles.btnPrimary}>
            Crear ticket
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateTicketPage