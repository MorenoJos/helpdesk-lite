import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Ticket, TicketStatus, TicketPriority } from '../types/ticket.types'
import { ticketRepository } from '../repositories'
import styles from './TicketListPage.module.css'

const STATUS_LABELS: Record<TicketStatus, string> = {
  'open': 'Abierto',
  'in-progress': 'En proceso',
  'resolved': 'Resuelto',
}

const PRIORITY_LABELS: Record<TicketPriority, string> = {
  'low': 'Baja',
  'medium': 'Media',
  'high': 'Alta',
}

function TicketListPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const data = ticketRepository.getAll()
    setTickets(data)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Tickets de soporte</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className={styles.count}>{tickets.length} tickets</span>
          <button
            className={styles.btnPrimary}
            onClick={() => navigate('/tickets/new')}
          >
            + Nuevo ticket
          </button>
        </div>
      </div>

      <ul className={styles.list}>
        {tickets.map(ticket => (
          <li key={ticket.id} className={styles.card}>
            <div>
              <p className={styles.cardTitle}>{ticket.title}</p>
              <p className={styles.cardMeta}>{ticket.category} · {ticket.description.slice(0, 60)}...</p>
            </div>
            <div className={styles.badges}>
              <span className={`${styles.badge} ${styles[`status-${ticket.status}`]}`}>
                {STATUS_LABELS[ticket.status]}
              </span>
              <span className={`${styles.badge} ${styles[`priority-${ticket.priority}`]}`}>
                {PRIORITY_LABELS[ticket.priority]}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TicketListPage