// 🛒 SISTEMA DE CARRITO COMPARTIDO - CELULINK
// Este archivo se usa en: catálogo, detalles e inicio

// Configuración global
const WHATSAPP_LINK = "https://wa.link/i0j8lh";

// 🛒 FUNCIONES DEL CARRITO
function obtenerCarrito() {
  const carrito = localStorage.getItem('carritoCompras');
  return carrito ? JSON.parse(carrito) : [];
}

function guardarCarrito(carrito) {
  localStorage.setItem('carritoCompras', JSON.stringify(carrito));
  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  const carrito = obtenerCarrito();
  const badge = document.getElementById('carrito-badge');
  const carritoFlotante = document.getElementById('carrito-flotante');
  
  if (badge) {
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    badge.textContent = totalItems;
    
    if (carritoFlotante) {
      if (totalItems > 0) {
        carritoFlotante.classList.remove('vacio');
      } else {
        carritoFlotante.classList.add('vacio');
      }
    }
  }
}

function agregarAlCarrito(producto) {
  const carrito = obtenerCarrito();
  const productoExistente = carrito.find(item => item.archivo === producto.archivo);
  
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({
      archivo: producto.archivo,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }
  
  guardarCarrito(carrito);
  
  // Animación del carrito flotante
  const carritoFlotante = document.getElementById('carrito-flotante');
  if (carritoFlotante) {
    carritoFlotante.classList.add('agregado-animacion');
    setTimeout(() => {
      carritoFlotante.classList.remove('agregado-animacion');
    }, 300);
  }
  
  // Feedback visual
  mostrarNotificacion('✅ Producto agregado al carrito');
}

function mostrarNotificacion(mensaje) {
  const notif = document.createElement('div');
  notif.textContent = mensaje;
  notif.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #00c97e, #00a86b);
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    font-weight: 600;
    z-index: 10000;
    box-shadow: 0 8px 25px rgba(0, 201, 126, 0.4);
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(notif);
  
  setTimeout(() => {
    notif.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notif.remove(), 300);
  }, 2000);
}

function irAlCarrito() {
  window.location.href = '/mi-carrito/';
}

// 🎨 CREAR CARRITO FLOTANTE EN EL DOM
function crearCarritoFlotante() {
  // Verificar si ya existe
  if (document.getElementById('carrito-flotante')) {
    return;
  }
  
  const carritoHTML = `
    <div class="carrito-flotante vacio" id="carrito-flotante" onclick="irAlCarrito()">
      🛒
      <span class="carrito-badge" id="carrito-badge">0</span>
    </div>
  `;
  
  document.body.insertAdjacentHTML('afterbegin', carritoHTML);
}

// 🚀 INICIALIZAR AL CARGAR LA PÁGINA
document.addEventListener('DOMContentLoaded', function() {
  crearCarritoFlotante();
  actualizarContadorCarrito();
});

// Agregar estilos para las animaciones (si no están en CSS)
if (!document.getElementById('carrito-animaciones-style')) {
  const style = document.createElement('style');
  style.id = 'carrito-animaciones-style';
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(400px); opacity: 0; }
    }
    @keyframes agregado {
      0% { transform: scale(1); }
      50% { transform: scale(1.2); }
      100% { transform: scale(1); }
    }
    .agregado-animacion {
      animation: agregado 0.3s ease;
    }
  `;
  document.head.appendChild(style);
}
