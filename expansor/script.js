function calcularExpansor() {
  const cenario = document.getElementById("cenario").value;
  const moidoAtual = parseFloat(document.getElementById("moidoAtual").value);
  const expansorAtual = parseFloat(document.getElementById("expansorAtual").value);
  const novoMoido = parseFloat(document.getElementById("novoMoido").value);
  const resultadoDiv = document.getElementById("resultado");

  if (isNaN(moidoAtual) || isNaN(expansorAtual) || isNaN(novoMoido)) {
    resultadoDiv.textContent = "Por favor, insira valores válidos.";
    return;
  }

  if (moidoAtual < 0 || moidoAtual > 100 || novoMoido < 0 || novoMoido > 100) {
    resultadoDiv.textContent = "Os percentuais de moído devem estar entre 0 e 100.";
    return;
  }

  let expansorAjustado;
  const reducaoPor10Porcento = 0.2;

  switch (cenario) {
    case "com":
      expansorAjustado = expansorAtual.toFixed(2);
      resultadoDiv.textContent = `Nenhum ajuste necessário. O expansor atual é ${expansorAjustado}%.`;
      break;

    case "mais":
      if (novoMoido > moidoAtual) {
        let ajusteMais = ((novoMoido - moidoAtual) / 10) * reducaoPor10Porcento;
        expansorAjustado = (expansorAtual + ajusteMais).toFixed(2);
        resultadoDiv.textContent = `Para aumentar o moído de ${moidoAtual}% para ${novoMoido}%, ajuste o expansor para ${expansorAjustado}%.`;
      } else {
        resultadoDiv.textContent = "O novo moído deve ser maior que o moído atual.";
      }
      break;

    case "menos":
      if (novoMoido < moidoAtual) {
        let ajusteMenos = ((moidoAtual - novoMoido) / 10) * reducaoPor10Porcento;
        expansorAjustado = (expansorAtual - ajusteMenos).toFixed(2);
        resultadoDiv.textContent = `Para reduzir o moído de ${moidoAtual}% para ${novoMoido}%, ajuste o expansor para ${expansorAjustado}%.`;
      } else {
        resultadoDiv.textContent = "O novo moído deve ser menor que o moído atual.";
      }
      break;

    case "sem":
      let ajusteZero = (moidoAtual / 10) * reducaoPor10Porcento;
      expansorAjustado = (expansorAtual - ajusteZero).toFixed(2);
      resultadoDiv.textContent = `Para remover completamente o moído (${moidoAtual}% para 0%), ajuste o expansor para ${expansorAjustado}%.`;
      break;

    default:
      resultadoDiv.textContent = "Selecione um cenário válido.";
  }
}