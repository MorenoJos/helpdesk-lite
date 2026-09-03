import type { Ticket, CreateTicketInput, UpdateTicketInput } from '../types/ticket.types'
import type { TicketRepository } from './ticket.repository'

// Datos de ejemplo para que el reclutador pueda probar la app
const INITIAL_TICKETS: Ticket[] = [
  {
    id: '1',
    title: 'PC no enciende en aula 301',
    description: 'El equipo no responde al botón de encendido. Se revisó el cable y está conectado correctamente.',
    status: 'open',
    priority: 'high',
    category: 'hardware',
    createdAt: new Date('2026-09-01T08:00:00'),
    updatedAt: new Date('2026-09-01T08:00:00'),
  },
  {
    id: '2',
    title: 'Sin acceso al sistema de notas',
    description: 'El docente no puede ingresar con sus credenciales al sistema académico desde ayer.',
    status: 'in-progress',
    priority: 'high',
    category: 'access',
    createdAt: new Date('2026-09-01T09:30:00'),
    updatedAt: new Date('2026-09-01T10:00:00'),
  },
  {
    id: '3',
    title: 'Impresora de secretaría sin conexión',
    description: 'La impresora HP del área administrativa no aparece en la red desde el viernes.',
    status: 'open',
    priority: 'medium',
    category: 'network',
    createdAt: new Date('2026-09-01T10:15:00'),
    updatedAt: new Date('2026-09-01T10:15:00'),
  },
  {
    id: '4',
    title: 'Instalación de Office en laptop docente',
    description: 'Se requiere instalar Microsoft Office 2021 en la laptop del profesor García.',
    status: 'resolved',
    priority: 'low',
    category: 'software',
    createdAt: new Date('2026-08-30T14:00:00'),
    updatedAt: new Date('2026-08-30T15:30:00'),
  },
]

export class InMemoryTicketRepository implements TicketRepository {
  // Copia del array inicial para no mutar los datos originales
  private tickets: Ticket[] = [...INITIAL_TICKETS]

  getAll(): Ticket[] {
    return [...this.tickets]
  }

  getById(id: string): Ticket | undefined {
    return this.tickets.find(ticket => ticket.id === id)
  }

  create(input: CreateTicketInput): Ticket {
    const newTicket: Ticket = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.tickets.push(newTicket)
    return newTicket
  }

  update(id: string, input: UpdateTicketInput): Ticket | undefined {
    const index = this.tickets.findIndex(ticket => ticket.id === id)
    if (index === -1) return undefined

    const updated: Ticket = {
      ...this.tickets[index],
      ...input,
      updatedAt: new Date(),
    }
    this.tickets[index] = updated
    return updated
  }

  delete(id: string): void {
    this.tickets = this.tickets.filter(ticket => ticket.id !== id)
  }
}