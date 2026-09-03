# HelpDesk Lite — Arquitectura v1

**Estado:** aceptada  
**Fecha:** 2026-08-31

## Contexto

HelpDesk Lite es el primer proyecto del ecosistema MorenoDevs. Se construirá paso a paso para aprender React, TypeScript estricto y arquitectura de componentes, sin backend ni complejidad anticipada. El foco inicial es completar el ciclo de vida de los tickets; el módulo de clientes será posterior.

## Decisiones

| Área | Decisión | Motivo |
| --- | --- | --- |
| Paquetes | `pnpm` | Es el gestor preferido del workspace y mantiene instalaciones reproducibles. |
| Base web | Vite + React + TypeScript estricto | Inicio rápido, componentes reutilizables y detección temprana de errores. |
| Navegación | React Router | El listado, creación y detalle de tickets tendrán URLs reales. |
| Estilos | CSS Modules + variables CSS | Aprender encapsulación y tokens visuales sin añadir una librería de UI. |
| Datos | Repositorio bajo contrato | La UI será independiente de la fuente de datos. |
| Formularios | Estado controlado de React | Suficiente al inicio; React Hook Form y Zod se añadirán solo cuando aporten valor. |
| Pruebas | Vitest + Testing Library, en la fase de calidad | Verifican comportamiento sin adelantar trabajo. |

## Separación de responsabilidades

```text
Pantalla / componente
        ↓
Servicio o repositorio (contrato)
        ↓
Implementación actual
  ├── memoria
  ├── LocalStorage
  └── API REST futura (TicketOps)
```

Las pantallas no importan ni usan directamente `localStorage`, `fetch` ni datos de prueba. Consumen un contrato de repositorio, de modo que cada implementación pueda reemplazarse sin reescribir la interfaz.

## Estructura objetivo

```text
src/
  app/          # configuración, rutas y proveedores globales
  features/     # dominios: tickets; customers se añadirá después
  shared/       # componentes, tipos y utilidades reutilizables
  styles/       # tokens y estilos globales mínimos
```

Cada funcionalidad conserva juntos sus pantallas, componentes, tipos y acceso a datos. Evitamos carpetas globales de componentes sin un dueño claro.

## Ruta de implementación

1. **Fundación:** proyecto limpio, herramientas de calidad, rutas y layout sin datos funcionales.
2. **Dominio Tickets:** tipos, `InMemoryTicketRepository`, listado y detalle.
3. **Flujo de Tickets:** crear, editar, resolver, eliminar, buscar y filtrar.
4. **Persistencia local:** cambiar memoria por `LocalStorageTicketRepository` sin reescribir pantallas.
5. **Calidad:** estados vacío, carga y error; accesibilidad y pruebas.
6. **Clientes:** listado, ficha y relación con tickets, cuando el flujo de tickets esté completo.
7. **Evolución futura:** TicketOps API sustituirá LocalStorage en una etapa posterior.

## Convenciones

- Código, nombres de archivos, tipos y commits en inglés.
- Interfaz visible y documentación en español.
- TypeScript estricto: no usar `any`, `@ts-ignore` ni ignorar errores.
- Primero funcionalidad comprobable; después pulido visual.
- Cada cambio importante debe tener un commit con un mensaje claro.
- Cada iteración tiene un objetivo pequeño, visible y verificable.

## Criterio de cierre

HelpDesk Lite estará terminado cuando:

- Se puedan crear, editar, resolver y eliminar tickets.
- Los tickets sobrevivan una recarga mediante LocalStorage.
- Existan rutas para listado, creación y detalle de ticket.
- Se pueda buscar y filtrar por estado y prioridad.
- Haya estados vacío, carga y error controlados.
- La aplicación pase `lint`, `test` y `build`.
- El repositorio incluya README, capturas y enlace de demo.

## Fuera de alcance por ahora

Backend/API, autenticación, roles, adjuntos, notificaciones en tiempo real, módulo de clientes, React Hook Form, Zod y librería de componentes.
