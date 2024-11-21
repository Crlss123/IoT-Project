// Conectar al WebSocket en Node-RED
const ws = new WebSocket("ws://localhost:1880/ws/sensores"); // Cambia la URL al endpoint WebSocket en Node-RED
// Recibir datos del servidor WebSocket
ws.onmessage = function(event) {
    // Parsear los datos recibidos (JSON)
    const data = JSON.parse(event.data);

    // Temperatura
    const temperatura = data.temperatura;
    document.getElementById("tempValue").innerText = temperatura;
    const tempPercentage = Math.min(100, (temperatura / 50) * 100); // Escalado para el termómetro
    document.getElementById("tempFill").style.height = tempPercentage + "%";

    // Humedad con aguja
    const humedad = data.humedad;
    document.getElementById("humValue").innerText = humedad;
    const humAngle = humedad * 1.8 - 90; // Convertir humedad en ángulo (-90° a 90°)
    document.getElementById("humNeedle").style.transform = `rotate(${humAngle}deg)`;

    // Luz con aguja
    const luz = data.luz;
    document.getElementById("lightValue").innerText = luz;
    const lightAngle = luz * 1.8 - 90; // Convertir luz en ángulo (-90° a 90°)
    document.getElementById("lightNeedle").style.transform = `rotate(${lightAngle}deg)`;

    // Distancia (tanque)
    const distancia = data.distancia;
    document.getElementById("distValue").innerText = distancia;
    const maxDistance = 20; // Distancia máxima en cm
    const distPercentage = Math.max(0, 100 - (distancia / maxDistance) * 100); // A mayor distancia, menor nivel
    document.getElementById("distFill").style.height = distPercentage + "%";
};

// Manejo de errores de WebSocket
ws.onerror = function(error) {
    console.error("WebSocket Error: ", error);
};
