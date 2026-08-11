# Beast Motors — Eventos disponibles para Google Tag Manager

Documento para el consultor de marketing. El sitio ya tiene instalado el contenedor
**GTM-P2GWM8W5** y empuja eventos personalizados al `dataLayer`. No hace falta acceso
al código: con los nombres de evento y parámetros de abajo se pueden crear triggers
de tipo **"Evento personalizado" (Custom Event)** en GTM.

## Eventos personalizados (dataLayer)

| Evento | Cuándo se dispara | Parámetros |
|--------|-------------------|------------|
| `click_whatsapp` | Click en cualquier botón de WhatsApp (tarjetas, ficha de vehículo, botón flotante) | `vehicle_name` (nombre del vehículo, o `"general"` si no aplica) |
| `view_vehicle` | Al abrir la ficha de un vehículo | `vehicle_name`, `vehicle_type` (`car`, `moto`, etc.) |
| `search` | Búsqueda en el catálogo | `search_term` |
| `filter_applied` | Aplicación de un filtro en el catálogo | `filter_type`, `filter_value` |
| `homepage_section_cta_click` | Click en un CTA de la página de inicio | `section` (ver valores abajo), `label` (opcional) |

Valores posibles de `section` en `homepage_section_cta_click`:
`hero`, `category_tile`, `financiacion`, `nosotros`, `sticky_bar`.

Para leer los parámetros en GTM, crear **Variables de capa de datos** con esos
nombres exactos (ej. `vehicle_name`, `search_term`, `section`).

## Páginas del sitio (para triggers por URL)

| Ruta | Contenido |
|------|-----------|
| `/` | Página de inicio |
| `/vehiculos` | Catálogo completo con filtros |
| `/vehiculos/[slug]` | Ficha de vehículo (ej. `/vehiculos/toyota-corolla-xei-2023`) |
| `/motos` | Catálogo de motos |
| `/next-generation` | Importados (sub-marca Next Generation) |
| `/financiacion` | Financiación y planes de ahorro |
| `/gestoria` | Gestoría automotor |
| `/nosotros` | Nosotros |

## Importante — evitar doble medición

Si dentro de GTM se configura una etiqueta de **Google Analytics 4**, avisar al
desarrollador para NO activar además el GA4 directo del sitio (variable
`NEXT_PUBLIC_GA_ID`). Debe existir una sola vía: o GA4 vía GTM, o GA4 directo,
nunca ambas.
