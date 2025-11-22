// 🎁 SISTEMA DE REFERIDOS MULTINIVEL - CELULINK
// Sistema de 3 niveles de profundidad

// ═══════════════════════════════════════════════════════════════════
// CONFIGURACIÓN
// ═══════════════════════════════════════════════════════════════════

const CONFIG_REFERIDOS = {
  niveles: {
    1: 0.05,  // 5% - Referido directo
    2: 0.02,  // 2% - Referido del referido
    3: 0.01   // 1% - Tercer nivel
  },
  maxNiveles: 3,  // Máximo 3 niveles de profundidad
  monedaSimbol: 'USD'
};

// ═══════════════════════════════════════════════════════════════════
// ESTRUCTURA DE DATOS
// ═══════════════════════════════════════════════════════════════════

// Cada usuario tiene:
// {
//   codigo: "ABC123",           // Código único del usuario
//   nombre: "Juan Pérez",
//   email: "juan@example.com",
//   referidoPor: "XYZ789",      // Código de quien lo refirió (null si es raíz)
//   referidos: ["DEF456", ...], // Array de códigos de personas que refirió
//   compras: [                  // Historial de compras
//     { monto: 500, fecha: "2024-11-21", productos: [...] }
//   ],
//   comisionesGanadas: 125.50   // Total de comisiones acumuladas
// }

// ═══════════════════════════════════════════════════════════════════
// FUNCIONES PRINCIPALES
// ═══════════════════════════════════════════════════════════════════

/**
 * Genera un código único de referido
 */
function generarCodigoReferido() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let codigo = '';
  for (let i = 0; i < 6; i++) {
    codigo += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return codigo;
}

/**
 * Registra un nuevo usuario con código de referido
 */
function registrarUsuario(datos, codigoReferidoPor = null) {
  const usuario = {
    codigo: generarCodigoReferido(),
    nombre: datos.nombre,
    email: datos.email,
    telefono: datos.telefono,
    referidoPor: codigoReferidoPor,
    referidos: [],
    compras: [],
    comisionesGanadas: 0,
    fechaRegistro: new Date().toISOString()
  };
  
  // Guardar en base de datos (Google Sheets, Firebase, etc.)
  guardarUsuario(usuario);
  
  // Si fue referido, agregarlo a la lista de referidos de su patrocinador
  if (codigoReferidoPor) {
    agregarReferido(codigoReferidoPor, usuario.codigo);
  }
  
  return usuario;
}

/**
 * Obtiene la cadena completa de referidos hacia arriba
 * Ejemplo: ["NIVEL1", "NIVEL2", "NIVEL3"]
 */
function obtenerCadenaReferidos(codigoUsuario, maxNiveles = 3) {
  const cadena = [];
  let usuarioActual = obtenerUsuario(codigoUsuario);
  
  while (usuarioActual && usuarioActual.referidoPor && cadena.length < maxNiveles) {
    cadena.push(usuarioActual.referidoPor);
    usuarioActual = obtenerUsuario(usuarioActual.referidoPor);
  }
  
  return cadena;
}

/**
 * Calcula y distribuye comisiones cuando se realiza una compra
 */
function procesarCompra(codigoComprador, montoCompra, detallesCompra) {
  // 1. Registrar la compra
  const compra = {
    monto: montoCompra,
    fecha: new Date().toISOString(),
    productos: detallesCompra.productos,
    id: generarIdCompra()
  };
  
  registrarCompra(codigoComprador, compra);
  
  // 2. Obtener cadena de referidos hacia arriba
  const cadenaReferidos = obtenerCadenaReferidos(codigoComprador, CONFIG_REFERIDOS.maxNiveles);
  
  // 3. Calcular comisiones para cada nivel
  const comisiones = [];
  
  cadenaReferidos.forEach((codigoReferente, index) => {
    const nivel = index + 1; // Nivel 1, 2, 3...
    const porcentaje = CONFIG_REFERIDOS.niveles[nivel];
    
    if (porcentaje) {
      const montoComision = montoCompra * porcentaje;
      
      comisiones.push({
        beneficiario: codigoReferente,
        nivel: nivel,
        porcentaje: porcentaje,
        monto: montoComision,
        comprador: codigoComprador,
        compraId: compra.id
      });
      
      // Acreditar comisión al usuario
      acreditarComision(codigoReferente, montoComision, compra.id, nivel);
    }
  });
  
  // 4. Registrar las comisiones en el sistema
  guardarComisiones(comisiones);
  
  return {
    compra: compra,
    comisionesGeneradas: comisiones,
    totalComisionesDistribuidas: comisiones.reduce((sum, c) => sum + c.monto, 0)
  };
}

/**
 * Obtiene el reporte de comisiones de un usuario
 */
function obtenerReporteComisiones(codigoUsuario) {
  const usuario = obtenerUsuario(codigoUsuario);
  const comisionesDetalladas = obtenerComisionesUsuario(codigoUsuario);
  
  // Agrupar por nivel
  const porNivel = {
    nivel1: { total: 0, cantidad: 0 },
    nivel2: { total: 0, cantidad: 0 },
    nivel3: { total: 0, cantidad: 0 }
  };
  
  comisionesDetalladas.forEach(comision => {
    const key = `nivel${comision.nivel}`;
    porNivel[key].total += comision.monto;
    porNivel[key].cantidad++;
  });
  
  return {
    usuario: {
      codigo: usuario.codigo,
      nombre: usuario.nombre,
      email: usuario.email
    },
    totalComisiones: usuario.comisionesGanadas,
    comisionesPorNivel: porNivel,
    referidosDirectos: usuario.referidos.length,
    redTotal: calcularTamañoRed(codigoUsuario),
    historialComisiones: comisionesDetalladas
  };
}

/**
 * Calcula el tamaño total de la red (todos los niveles)
 */
function calcularTamañoRed(codigoUsuario) {
  const usuario = obtenerUsuario(codigoUsuario);
  let total = usuario.referidos.length;
  
  // Recursivamente contar referidos de referidos
  usuario.referidos.forEach(codigoReferido => {
    total += calcularTamañoRed(codigoReferido);
  });
  
  return total;
}

/**
 * Genera enlace de referido único para compartir
 */
function generarEnlaceReferido(codigoUsuario) {
  return `https://www.celulink.mx/?ref=${codigoUsuario}`;
}

/**
 * Obtiene estadísticas de la red de un usuario
 */
function obtenerEstadisticasRed(codigoUsuario) {
  const usuario = obtenerUsuario(codigoUsuario);
  
  // Nivel 1 (directos)
  const nivel1 = usuario.referidos.map(codigo => obtenerUsuario(codigo));
  
  // Nivel 2 (referidos de referidos)
  const nivel2 = [];
  nivel1.forEach(u => {
    u.referidos.forEach(codigo => nivel2.push(obtenerUsuario(codigo)));
  });
  
  // Nivel 3 (tercer nivel)
  const nivel3 = [];
  nivel2.forEach(u => {
    u.referidos.forEach(codigo => nivel3.push(obtenerUsuario(codigo)));
  });
  
  return {
    nivel1: {
      cantidad: nivel1.length,
      comprasTotal: nivel1.reduce((sum, u) => sum + calcularTotalCompras(u), 0)
    },
    nivel2: {
      cantidad: nivel2.length,
      comprasTotal: nivel2.reduce((sum, u) => sum + calcularTotalCompras(u), 0)
    },
    nivel3: {
      cantidad: nivel3.length,
      comprasTotal: nivel3.reduce((sum, u) => sum + calcularTotalCompras(u), 0)
    },
    totalRed: nivel1.length + nivel2.length + nivel3.length
  };
}

// ═══════════════════════════════════════════════════════════════════
// FUNCIONES DE PERSISTENCIA (Conectar con tu base de datos)
// ═══════════════════════════════════════════════════════════════════

function guardarUsuario(usuario) {
  // TODO: Guardar en Google Sheets / Firebase / Base de datos
  // Ejemplo con localStorage temporal:
  const usuarios = JSON.parse(localStorage.getItem('celulink_usuarios') || '{}');
  usuarios[usuario.codigo] = usuario;
  localStorage.setItem('celulink_usuarios', JSON.stringify(usuarios));
}

function obtenerUsuario(codigo) {
  // TODO: Obtener de tu base de datos
  const usuarios = JSON.parse(localStorage.getItem('celulink_usuarios') || '{}');
  return usuarios[codigo] || null;
}

function agregarReferido(codigoPatrocinador, codigoReferido) {
  const usuario = obtenerUsuario(codigoPatrocinador);
  if (usuario) {
    usuario.referidos.push(codigoReferido);
    guardarUsuario(usuario);
  }
}

function registrarCompra(codigoUsuario, compra) {
  const usuario = obtenerUsuario(codigoUsuario);
  if (usuario) {
    usuario.compras.push(compra);
    guardarUsuario(usuario);
  }
}

function acreditarComision(codigoUsuario, monto, compraId, nivel) {
  const usuario = obtenerUsuario(codigoUsuario);
  if (usuario) {
    usuario.comisionesGanadas += monto;
    guardarUsuario(usuario);
  }
}

function guardarComisiones(comisiones) {
  // TODO: Guardar registro de comisiones en tu base de datos
  const historial = JSON.parse(localStorage.getItem('celulink_comisiones') || '[]');
  historial.push(...comisiones);
  localStorage.setItem('celulink_comisiones', JSON.stringify(historial));
}

function obtenerComisionesUsuario(codigoUsuario) {
  const historial = JSON.parse(localStorage.getItem('celulink_comisiones') || '[]');
  return historial.filter(c => c.beneficiario === codigoUsuario);
}

function calcularTotalCompras(usuario) {
  return usuario.compras.reduce((sum, compra) => sum + compra.monto, 0);
}

function generarIdCompra() {
  return `COMPRA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ═══════════════════════════════════════════════════════════════════
// EJEMPLOS DE USO
// ═══════════════════════════════════════════════════════════════════

// Ejemplo 1: Registrar usuario sin referido (raíz)
const ana = registrarUsuario({
  nombre: "Ana García",
  email: "ana@example.com",
  telefono: "+52 123 456 7890"
});
console.log("Ana registrada:", ana.codigo);
console.log("Enlace de Ana:", generarEnlaceReferido(ana.codigo));

// Ejemplo 2: Bruno se registra usando el código de Ana
const bruno = registrarUsuario({
  nombre: "Bruno López",
  email: "bruno@example.com",
  telefono: "+52 098 765 4321"
}, ana.codigo); // ← Ana es patrocinadora de Bruno

// Ejemplo 3: Carlos se registra usando el código de Bruno
const carlos = registrarUsuario({
  nombre: "Carlos Díaz",
  email: "carlos@example.com",
  telefono: "+52 555 123 4567"
}, bruno.codigo); // ← Bruno es patrocinador de Carlos

// Ejemplo 4: Diana se registra usando el código de Carlos
const diana = registrarUsuario({
  nombre: "Diana Ruiz",
  email: "diana@example.com",
  telefono: "+52 555 987 6543"
}, carlos.codigo); // ← Carlos es patrocinador de Diana

// Ejemplo 5: Diana hace una compra de $500 USD
const resultadoCompra = procesarCompra(diana.codigo, 500, {
  productos: [
    { nombre: "Samsung Galaxy S24", precio: 500 }
  ]
});

console.log("Comisiones generadas:", resultadoCompra.comisionesGeneradas);
/*
  Carlos (nivel 1): $25 USD (5%)
  Bruno (nivel 2): $10 USD (2%)
  Ana (nivel 3): $5 USD (1%)
*/

// Ejemplo 6: Ver reporte de comisiones de Ana
const reporteAna = obtenerReporteComisiones(ana.codigo);
console.log("Reporte de Ana:", reporteAna);

// Ejemplo 7: Ver estadísticas de red de Ana
const estadisticasAna = obtenerEstadisticasRed(ana.codigo);
console.log("Red de Ana:", estadisticasAna);
/*
  Nivel 1: 1 persona (Bruno)
  Nivel 2: 1 persona (Carlos)  
  Nivel 3: 1 persona (Diana)
  Total red: 3 personas
*/

// ═══════════════════════════════════════════════════════════════════
// EXPORTAR FUNCIONES PARA USO EN TU WEB
// ═══════════════════════════════════════════════════════════════════

window.SistemaReferidos = {
  registrarUsuario,
  procesarCompra,
  obtenerReporteComisiones,
  obtenerEstadisticasRed,
  generarEnlaceReferido,
  obtenerCadenaReferidos,
  obtenerUsuario
};
