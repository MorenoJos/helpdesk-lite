import type { Ticket, CreateTicketInput, UpdateTicketInput } from '../types/ticket.types'

export interface TicketRepository {
  getAll(): Ticket[]
  getById(id: string): Ticket | undefined
  create(input: CreateTicketInput): Ticket
  update(id: string, input: UpdateTicketInput): Ticket | undefined
  delete(id: string): void
}