import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import TicketListPage from '../features/tickets/pages/TicketListPage'
import CreateTicketPage from '../features/tickets/pages/CreateTicketPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <TicketListPage />,
      },
      {
        path: 'tickets/new',
        element: <CreateTicketPage />,
      },
    ],
  },
])