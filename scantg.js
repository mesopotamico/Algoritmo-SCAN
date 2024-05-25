// Funcion para el algoritmo
function scan_man(requestSequenceScan) {
    console.log("Entrando a scan_man");
    const len = requestSequenceScan.length;
    let headPosition = parseInt(requestSequenceScan[0]); 

    let totalSeekCountScan = 0;
    let requestFinalOrderScan = [];

    requestSequenceScan.sort((a, b) => a - b);

    for (let i = 0; i < len; i++) {

        let minDistance = Infinity;
        let minIndex = -1;
        for (let j = 0; j < requestSequenceScan.length; j++) {
            if (requestSequenceScan[j] >= headPosition && Math.abs(requestSequenceScan[j] - headPosition) < minDistance) {
                minDistance = Math.abs(requestSequenceScan[j] - headPosition);
                minIndex = j;
            }
        }
        if (minIndex !== -1) {
            totalSeekCountScan += minDistance;
            headPosition = requestSequenceScan[minIndex];
            requestFinalOrderScan.push(headPosition);
            requestSequenceScan.splice(minIndex, 1);
        }
    }

    let tempSequence = requestFinalOrderScan.slice();

    requestFinalOrderScan = [];

    for (let i = len - 1; i >= 0; i--) {
        let minDistance = Infinity;
        let minIndex = -1;
        for (let j = 0; j < requestSequenceScan.length; j++) {
            if (requestSequenceScan[j] < headPosition && Math.abs(requestSequenceScan[j] - headPosition) < minDistance) {
                minDistance = Math.abs(requestSequenceScan[j] - headPosition);
                minIndex = j;
            }
        }
        if (minIndex !== -1) {
            totalSeekCountScan += minDistance;
            headPosition = requestSequenceScan[minIndex];
            requestFinalOrderScan.push(headPosition);
            requestSequenceScan.splice(minIndex, 1);
        }
    }
    requestFinalOrderScan = tempSequence.concat(requestFinalOrderScan);

    console.log("Salida de scan_man");
    return [totalSeekCountScan, requestFinalOrderScan];
}

// Restablece los resultados
function resetScanResult() {
    console.log("Limpiando resultados de SCAN");
    document.getElementById("scan_totalSeekCount").innerText = "";
    document.getElementById("scan_finalOrder").innerText = "";
    const canvas = document.getElementById("scanChart");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Handler del botón 
function scan_click() {
    console.log("Click en SCAN");
    let requestSequenceScan = document.getElementById("Sequence").value;

    requestSequenceScan = requestSequenceScan
        .split(/ |,/)
        .filter(character => character !== "")
        .map(a => parseInt(a));

    if (requestSequenceScan.length === 0) {
        alert("¡Entrada inválida!");
        return;
    }

    // Realiza el algoritmo 
    const result = scan_man(requestSequenceScan);

    console.log("Resultados de SCAN:", result);

    // Actualiza los elementos HTML con los resultados
    document.getElementById("scan_totalSeekCount").innerText = result[0];
    document.getElementById("scan_finalOrder").innerText = result[1].join(", ");

    // CHAT GPT Grafico -----------------------------------------------------------------

    // Visualiza el gráfico
    const canvas = document.getElementById("scanChart");
    const ctx = canvas.getContext("2d");

    const maxRange = Math.max(...requestSequenceScan, ...result[1]) + 1;
    const minRange = Math.min(...requestSequenceScan, ...result[1]);

    // Configurar el canvas
    const padding = 40;
    const width = canvas.width - 2 * padding;
    const height = canvas.height - 2 * padding;
    const stepY = height / (maxRange - minRange);
    const stepX = width / result[1].length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar el eje Y (Rango de la secuencia)
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height + padding);
    ctx.stroke();

    // Etiquetas del eje Y
    for (let i = minRange; i < maxRange; i++) {
        const y = height + padding - (i - minRange) * stepY;
        ctx.fillText(i, padding - 20, y + 3);
    }

    // Dibujar el algoritmo SCAN
    ctx.beginPath();
    ctx.moveTo(padding, height + padding - stepY * (result[1][0] - minRange));

    for (let i = 1; i < result[1].length; i++) {
        const x = padding + i * stepX;
        const y = height + padding - (result[1][i] - minRange) * stepY;
        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = "orange";
    ctx.stroke();
}
