import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import TicketListPage from "../features/tickets/pages/TicketListPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <TicketListPage />
    },
    ],
  },
]);

export default router;