let contador = 0;

function adicionarGrupo() {
  const grupos = document.getElementById("grupos");
  
  const div = document.createElement("div");
  div.innerHTML = `
    <label for="nome${contador}">Número da Sola:</label>
    <input type="text" id="nome${contador}" placeholder="Ex: N°33/4">

    <label for="x${contador}">Pares por caixa:</label>
    <input type="number" id="x${contador}">

    <label for="y${contador}">Caixas completas:</label>
    <input type="number" id="y${contador}">

    <label for="z${contador}">Última caixa (pares quebrados):</label>
    <input type="number" id="z${contador}">

    <label for="a${contador}">Quantidade de matrizes na máquina:</label>
    <input type="number" id="a${contador}">
    <hr>
  `;
  grupos.appendChild(div);
  contador++;
}

function calcular() {
  const dados = [];
  
  for (let i = 0; i < contador; i++) {
    const nome = document.getElementById(`nome${i}`).value || `N°${i + 1}`;
    const x = parseFloat(document.getElementById(`x${i}`).value) || 0;
    const y = parseFloat(document.getElementById(`y${i}`).value) || 0;
    const z = parseFloat(document.getElementById(`z${i}`).value) || 0;
    const a = parseFloat(document.getElementById(`a${i}`).value) || 1;
    
    dados.push({ nome, x, y, z, a });
  }
  
  localStorage.setItem("dadosGiros", JSON.stringify(dados));
  window.location.href = "result.html";
}
