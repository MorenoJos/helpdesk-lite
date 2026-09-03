import { useState, useEffect } from 'react'
import type { Ticket } from '../types/ticket.types'
import { ticketRepository } from '../repositories'

function TicketListPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])

  useEffect(() => {
    const data = ticketRepository.getAll()
    setTickets(data)
  }, [])

  return (
    <div>
      <h2>Lista de tickets</h2>
      <p>{tickets.length} tickets encontrados</p>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>
            <strong>{ticket.title}</strong> — {ticket.status} — {ticket.priority}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TicketListPage