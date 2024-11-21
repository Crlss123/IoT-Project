// Conectar al WebSocket en Node-RED
const ws = new WebSocket("ws://localhost:1880/ws/sensores"); // Cambia la URL al endpoint WebSocket en Node-RED
// Recibir datos del servidor WebSocket
ws.onmessage = function(event) {
    // Parsear los datos recibidos (JSON)
    const data = JSON.parse(event.data);

    // Temperatura
    const temperatura = data.temperatura;
    document.getElementById("tempValue").innerText = temperatura;
    
    // Humedad con aguja
    const humedad = data.humedad;
    document.getElementById("humValue").innerText = humedad;


    // Luz con aguja
    const luz = data.luz;
    document.getElementById("lightValue").innerText = luz;
    
    // Distancia (tanque)
    const distancia = data.distancia;
    document.getElementById("distValue").innerText = distancia;
};

// Manejo de errores de WebSocket
ws.onerror = function(error) {
    console.error("WebSocket Error: ", error);
};
