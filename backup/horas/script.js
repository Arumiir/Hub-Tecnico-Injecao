function calculatePatterns() {
    const standardTime = parseFloat(document.getElementById('standardTime').value) || 0;
    const numCycles = parseInt(document.getElementById('numCycles').value) || 0;
    const pairsPerBox = parseInt(document.getElementById('pairsPerBox').value) || 0;
    const goalAlphanumeric = document.getElementById('goal').value.trim();
    const numMatrices = parseInt(document.getElementById('numMatrices').value) || 1;

    const goal = parseGoal(goalAlphanumeric);

    // Cálculo do padrão
    const pattern = (standardTime * numMatrices) / numCycles;

    // Calcular as horas por caixa
    const hoursPerBox = pairsPerBox / pattern;

    // Calcular o número de caixas necessárias para atingir ou ultrapassar a meta
    let totalHours = 0;
    let numBoxes = 0;
    while (totalHours < goal) {
        totalHours += hoursPerBox;
        numBoxes++;
    }

    // Verificar se o tempo está acima ou abaixo da meta
    const status = totalHours >= goal ? "acima" : "abaixo";

    // Formatar os valores de horas no formato HH:MM
    const formattedHoursPerBox = formatHours(hoursPerBox);
    const formattedTotalHours = formatHours(totalHours);
    const formattedGoal = formatHours(goal);

    // Salvar os resultados no localStorage para a próxima página
    const resultText = `Padrão: ${pattern.toFixed(2)}\nHoras por caixa: ${formattedHoursPerBox}\nCaixas necessárias: ${numBoxes}\nTempo total: ${formattedTotalHours}\nStatus: ${status} da meta de ${formattedGoal}`;
    localStorage.setItem('results', resultText);

    // Redirecionar para a página intermediária
    window.location.href = 'intermediario.html';
}

function parseGoal(goalString) {
    return parseInt(goalString);
}

function formatHours(totalHours) {
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    return `${hours}h ${minutes}m`;
}
