let saldo = 100;
let valorAposta;
let pilotoSelecionado;
let intervalos = {};
let corridaEmAndamento = false;
let vencedor = null;

function init() {
  document.getElementById('saldo').innerText = `Saldo: R$${saldo}`; //exibe saldo
}

// pega o valor da aposta e o piloto jogados
function realizarAposta() {
  valorAposta = parseInt(document.getElementById('valorAposta').value);
  pilotoSelecionado = document.getElementById('pilotos').value;

  if (isNaN(valorAposta) || valorAposta < 5 || valorAposta > saldo) { //is not a number
    alert('insira um valor de no minimo R$5');
    return;
  }

     if (saldo < valorAposta) {
    alert('saldo insuficiente');
    return;
  }

  iniciarCorrida();
}

function iniciarCorrida() {
  const carros = document.querySelectorAll('.carro');
  corridaEmAndamento = true;
  vencedor = null;

  carros.forEach(carro => {
    let posicaoX = 0;
    intervalos[carro.id] = setInterval(() => { // tempo para mover o carro
      if (!corridaEmAndamento) {
        clearInterval(intervalos[carro.id]); //limpa o intervalo de tempo
        return;
      }

      posicaoX += Math.random() * 30; //posição aleatoria
      carro.style.left = posicaoX + 'px'; // nova posição do carro

      if (posicaoX >= 599) {
        corridaEmAndamento = false; // se carro ultrapassar a linha de chegada define como encerrada
        if (vencedor === null) {
          vencedor = carro.id; //se n houver vencedor define um
           if (carro.id === pilotoSelecionado) {
            saldo += valorAposta; // carro escolhido pelo jogador recebe a aposta
            document.getElementById('resultado').innerText = `Parabens! Você ganhou R$${valorAposta * 2}! O carro vencedor foi o número ${vencedor}`;
          } else {
            saldo -= valorAposta; // se n for o escolhido reduz valor
            document.getElementById('resultado').innerText = ` Você perdeu R$${valorAposta}! O carro vencedor foi o número ${vencedor}`;
          }
          document.getElementById('saldo').innerText = `Saldo: R$${saldo}`;
        }
      }
    }, 50); //a cada milissegundo atualiza o carro
  });
}
