<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Guía de Compra | CeluLink</title>

<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background:linear-gradient(135deg,#1a1a2e,#16213e,#0f3460);
  padding:20px;
  color:#fff;
}

.container{
  max-width:1000px;
  margin:0 auto;
}

/* HEADER */
.header{text-align:center;margin-bottom:50px;}
.header h1{
  font-size:2.4rem;
  background:linear-gradient(90deg,#00c97e,#0ea5e9);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}
.header p{color:#cbd5e1;font-size:1.1rem;margin-top:8px;}

/* GRID */
.steps-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:25px;
}

/* ANIMATION */
@keyframes fadeInUp {
  0% {opacity:0; transform:translateY(25px);}
  100% {opacity:1; transform:translateY(0);}
}

.step-card{
  background:rgba(255,255,255,0.05);
  border:1px solid rgba(0,201,126,0.25);
  padding:25px;
  border-radius:18px;
  text-align:center;
  backdrop-filter:blur(4px);
  box-shadow:0 6px 20px rgba(0,0,0,0.35);
  animation:fadeInUp 0.6s ease forwards;
  opacity:0;
}

/* DELAY for each card */
.step-card:nth-child(1){animation-delay:0.1s;}
.step-card:nth-child(2){animation-delay:0.25s;}
.step-card:nth-child(3){animation-delay:0.4s;}
.step-card:nth-child(4){animation-delay:0.55s;}
.step-card:nth-child(5){animation-delay:0.7s;}

.step-card h2{
  font-size:1.5rem;
  color:#00c97e;
  margin-bottom:10px;
}

.step-card p{
  color:#cbd5e1;
  font-size:0.95rem;
  margin-bottom:15px;
  line-height:1.5;
}

.step-img{
  width:70%;
  max-width:280px;
  display:block;
  margin:15px auto;
  border-radius:16px;
  box-shadow:0 6px 20px rgba(0,0,0,0.35);
}

/* BUTTONS */
.step-btn{
  display:inline-block;
  margin-top:12px;
  background:#0ea5e9;
  padding:10px 22px;
  color:#fff;
  border-radius:12px;
  text-decoration:none;
  font-weight:600;
  transition:.3s;
}
.step-btn:hover{
  background:#0284c7;
  transform:translateY(-3px);
}

/* FINAL FULL IMAGE */
.full-img{
  width:100%;
  margin-top:50px;
  border-radius:20px;
  box-shadow:0 10px 35px rgba(0,0,0,0.45);
}

@media(max-width:600px){
  .header h1{font-size:1.9rem;}
}
</style>
</head>

<body>

<div class="container">

  <div class="header">
    <h1>📱 Guía de Compra Paso a Paso</h1>
    <p>Así funciona CeluLink — rápido, seguro y fácil desde Estados Unidos a México</p>
  </div>

  <div class="steps-grid">

    <!-- PASO 1 -->
    <div class="step-card">
      <h2>1️⃣ Elegir tus equipos</h2>
      <p>Navega el catálogo, revisa características y selecciona los equipos que quieras comprar.</p>
      <img src="https://raw.githubusercontent.com/piztian/celulink/main/fotos/reportapago/1%20elegir%20equipos.png" class="step-img">
      <a href="https://www.celulink.mx/stock/" class="step-btn">Ver Catálogo</a>
    </div>

    <!-- PASO 2 -->
    <div class="step-card">
      <h2>2️⃣ Agregar al carrito</h2>
      <p>Añade los equipos que desees. Puedes comprar uno o varios productos en una sola orden.</p>
      <img src="https://raw.githubusercontent.com/piztian/celulink/main/fotos/reportapago/2%20agregar%20a%20carrito.png" class="step-img">
      <a href="https://www.celulink.mx/mi-carrito/" class="step-btn">Ir al Carrito</a>
    </div>

    <!-- PASO 3 -->
    <div class="step-card">
      <h2>3️⃣ Solicitar link de pago</h2>
      <p>Cuando tengas tu carrito listo, solicita tu link de pago seguro personalizado.</p>
      <img src="https://raw.githubusercontent.com/piztian/celulink/main/fotos/reportapago/3%20solicitar%20link%20de%20pago.png" class="step-img">

      <p style="margin-top:12px;font-weight:600;">Elige una opción:</p>

      <a href="https://www.celulink.mx/mi-carrito/" class="step-btn" style="background:#00c97e;">🛒 Desde Carrito</a>
      <br><br>
      <a href="https://wa.me/5213413300001?text=Hola,%20quiero%20mi%20link%20de%20pago" class="step-btn">💬 WhatsApp</a>
    </div>

    <!-- PASO 4 -->
    <div class="step-card">
      <h2>4️⃣ Reportar compra</h2>
      <p>Sube tu comprobante de pago y tus datos para envío en México.</p>
      <img src="https://raw.githubusercontent.com/piztian/celulink/main/fotos/reportapago/5%20pagar%20compra.png" class="step-img">
      <a href="https://www.celulink.mx/reportapago/" class="step-btn">Reportar Compra</a>
    </div>

    <!-- PASO 5 -->
    <div class="step-card">
      <h2>5️⃣ Recibe en México</h2>
      <p>¡Ya casi está aquí! Tu equipo está siendo preparado en nuestras instalaciones en México y pronto estará en tus manos.</p>

      <img src="https://raw.githubusercontent.com/piztian/celulink/main/fotos/reportapago/6%20proceso%20de%20entrega.png" class="step-img">

      <p style="text-align:left;margin-top:15px;">
        📦 <strong>Proceso de entrega:</strong><br><br>
        📧 <strong>Notificaciones:</strong> Recibirás correos con el seguimiento de tu paquete en cada fase.<br><br>
        📲 <strong>Contacto del repartidor:</strong> Te contactarán para coordinar la entrega.<br><br>
        ✅ <strong>Verificación:</strong> Inspecciona el paquete al recibirlo para asegurar que todo está en perfecto estado.<br><br>
        🎉 <strong>¡Disfruta tu equipo!</strong> Tu nuevo celular o tablet es tuyo desde ese momento.
      </p>
    </div>

  </div>

  <!-- IMAGEN COMPLETA AL FINAL -->
  <img src="https://raw.githubusercontent.com/piztian/celulink/main/fotos/reportapago/reportapago.png" class="full-img">

</div>

</body>
</html>
