# 📱 CeluLink  
**Regala conexión, no distancia.**  
*Compra desde EE.UU. y entrega en México.*

---

## 🔗 Descripción general  
CeluLink es una plataforma que permite a clientes en **Estados Unidos** enviar **celulares y accesorios** a sus seres queridos en **México**, con procesos simples, soporte local y métodos de pago claros en dólares (USD).

> 💡 El objetivo es ofrecer una experiencia confiable, rápida y personalizada,  
> desde la selección del equipo hasta la entrega final en México.

---

## 🗂️ Estructura del repositorio  

| Carpeta / Archivo | Descripción |
|-------------------|-------------|
| `/fotos/` | Logotipos, íconos y recursos visuales (por ejemplo, `Celulink logo.png`). |
| `/landing/` | Código HTML, CSS y JS de la página principal (encabezado, footer, catálogo). |
| `/diagramas/` | Diagramas Draw.io del flujo de compra, pago, envío y seguimiento. |
| `/scripts/` | Scripts de conexión con Google Sheets (catálogo dinámico). |
| `/docs/` | Documentos de referencia, políticas de venta y materiales de marketing. |
| `README.md` | Este archivo de documentación general del proyecto. |

---

## 🌐 Componentes del sitio  

### 🧭 Encabezado
- Fondo oscuro con degradado (azul → verde → rojo).  
- Logo principal (`/fotos/Celulink logo.png`).  
- Menú con accesos rápidos a:
  - **Inicio**
  - **Catálogo**
  - **Métodos de pago**
  - **Contacto**
  - **Soporte por WhatsApp / Telegram**

### 📦 Catálogo de productos
Datos cargados dinámicamente desde Google Sheets:  
[`https://docs.google.com/spreadsheets/d/1mGPMOWBdtD5q4qAFRlqo6z0A5jQ4cpw_lB3DH0D6qgQ`](https://docs.google.com/spreadsheets/d/1mGPMOWBdtD5q4qAFRlqo6z0A5jQ4cpw_lB3DH0D6qgQ)

**Columnas principales:**
- `archivo`: Nombre de imagen (sin extensión)
- `url_imagen`: Enlace de la imagen en GitHub
- `Caracteristicas`: Descripción breve
- `dlls`: Precio en dólares

### 💳 Métodos de pago
Los clientes pueden pagar mediante:
- Transferencia bancaria (visualización en landing)
- Link de pago (Stripe / MercadoPago / Payphone)
- Confirmación de pago vía WhatsApp o Telegram

📄 Una vez pagado, se genera el pedido y se ingresa al sistema STX (registro interno).

### 📬 Envío y seguimiento
1. Se genera la guía en **mr.celucenter.com**.  
2. Se reenvía el correo de confirmación al **cliente y destinatario**.  
3. Se da seguimiento hasta la **entrega**.  

---

## 🧩 Diagramas de flujo  

| Diagrama | Archivo | Descripción |
|-----------|----------|-------------|
| Flujo general de contacto y compra | `/diagramas/contacto.drawio` | Desde la visita a la página hasta el contacto por redes. |
| Selección y pago | `/diagramas/pago.drawio` | Incluye la nueva landing de métodos de pago. |
| Generación de pedido | `/diagramas/pedido.drawio` | Registro en STX y confirmación de pago. |
| Envío y entrega | `/diagramas/envio.drawio` | Notificación, guía y recepción del equipo. |
| Seguimiento postventa | `/diagramas/seguimiento.drawio` | Atención, soporte y garantías. |

---

## 🧠 Integraciones
- **Google Sheets API:** catálogo dinámico de equipos.  
- **GitHub Pages / Bitrix24 Sites:** alojamiento de la página web.  
- **Telegram Bot / WhatsApp API:** atención y confirmación de pedidos.  
- **STX / Celucenter internal systems:** gestión de pedidos y envíos.

---

## 🎨 Identidad visual  
| Elemento | Valor |
|-----------|--------|
| **Color verde:** | `#00C97E` |
| **Color azul:** | `#0EA5E9` |
| **Color rojo:** | `#FF2E2E` |
| **Tipografía:** | Segoe UI / Verdana |
| **Slogan:** | *Regala conexión, no distancia.* |
| **Ícono SVG (link):** | 🔗 Azul y Rojo combinados |

```svg
<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
  <g stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M20 30a10 10 0 0 1 0-14l6-6a10 10 0 0 1 14 14l-3 3" stroke="#0EA5E9"/>
    <path d="M40 30a10 10 0 0 1 0 14l-6 6a10 10 0 0 1-14-14l3-3" stroke="#FF2E2E"/>
  </g>
</svg>
