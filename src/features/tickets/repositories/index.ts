import { InMemoryTicketRepository } from './InMemoryTicketRepository'

// Instancia única compartida en toda la app
// Cuando migremos a LocalStorage, solo cambiamos esta línea
export const ticketRepository = new InMemoryTicketRepository()