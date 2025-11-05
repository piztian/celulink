/**
 * CeluLink Loader Universal
 * Script para agregar efecto de carga con video a cualquier página
 * Solo agrega: <script src="loader-celulink.js"></script>
 */

(function() {
  // Configuración
  const CONFIG = {
    videoUrl: "https://raw.githubusercontent.com/piztian/celulink/main/CelulinkGif.mp4",
    tiempoMinimo: 3000, // 3 segundos en milisegundos
    videoWidth: 150,
    videoHeight: 150
  };

  // Crear el contenedor del loader
  function crearLoader() {
    const loaderHTML = `
      <div id="celulink-loader" style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease, visibility 0.5s ease;
      ">
        <video width="${CONFIG.videoWidth}" height="${CONFIG.videoHeight}" autoplay loop muted style="
          border-radius: 12px;
          box-shadow: 0 8px 25px rgba(0, 201, 126, 0.3);
        ">
          <source src="${CONFIG.videoUrl}" type="video/mp4">
          Tu navegador no soporta videos
        </video>
      </div>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', loaderHTML);
  }

  // Ocultar el loader con transición suave
  function ocultarLoader() {
    const loader = document.getElementById('celulink-loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      // Remover del DOM después de la transición
      setTimeout(() => {
        loader.remove();
      }, 500);
    }
  }

  // Inicializar cuando el DOM esté listo
  function inicializar() {
    const tiempoInicio = Date.now();
    
    // Crear el loader
    crearLoader();

    // Esperar a que la página cargue completamente
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        verificarTiempoMinimo(tiempoInicio);
      });
    } else {
      verificarTiempoMinimo(tiempoInicio);
    }

    // También esperar a que todos los recursos se carguen
    window.addEventListener('load', function() {
      verificarTiempoMinimo(tiempoInicio);
    });
  }

  // Verificar que se cumplan los 3 segundos mínimos
  function verificarTiempoMinimo(tiempoInicio) {
    const tiempoTranscurrido = Date.now() - tiempoInicio;
    const tiempoRestante = Math.max(0, CONFIG.tiempoMinimo - tiempoTranscurrido);

    if (tiempoRestante > 0) {
      setTimeout(ocultarLoader, tiempoRestante);
    } else {
      ocultarLoader();
    }
  }

  // Iniciar cuando el script se carga
  inicializar();
})();
