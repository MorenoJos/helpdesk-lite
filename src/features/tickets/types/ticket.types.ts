// Estado del ciclo de vida de un ticket
export type TicketStatus = 'open' | 'in-progress' | 'resolved'

// Nivel de urgencia
export type TicketPriority = 'low' | 'medium' | 'high'

// Categoría del problema
export type TicketCategory =
  | 'hardware'
  | 'software'
  | 'network'
  | 'access'
  | 'other'

// La entidad principal — un ticket completo
export interface Ticket {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  category: TicketCategory
  createdAt: Date
  updatedAt: Date
}

// Lo que necesita el usuario para crear un ticket
// Omitimos id, createdAt y updatedAt porque los genera el sistema
export type CreateTicketInput = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>

// Lo que puede modificar el usuario al editar
export type UpdateTicketInput = Partial<CreateTicketInput>