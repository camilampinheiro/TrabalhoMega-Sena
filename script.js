document.getElementById('formularioLoteria').addEventListener('submit', function(evento) {
    evento.preventDefault();

    const entradaUsuario = document.getElementById('numeros').value.split(',').map(num => parseInt(num.trim())).sort((a, b) => a - b);

    const numerosSorteados = [];
    while (numerosSorteados.length < 6) {
        const numeroAleatorio = Math.floor(Math.random() * 60) + 1;
        if (!numerosSorteados.includes(numeroAleatorio)) {
            numerosSorteados.push(numeroAleatorio);
        }
    }
    numerosSorteados.sort((a, b) => a - b);

    const acertos = entradaUsuario.filter(numero => buscaBinaria(numerosSorteados, numero)).length;

    let mensagem;
    if (acertos === 6) {
        mensagem = 'Parabéns! Você ganhou a SENA!';
    } else if (acertos === 5) {
        mensagem = 'Muito bem! Você ganhou a QUINA!';
    } else if (acertos === 4) {
        mensagem = 'Você ganhou a QUADRA!';
    } else {
        mensagem = 'Não foi dessa vez. Tente novamente!';
    }

    alert(mensagem);

    document.getElementById('resultado').innerHTML = `
        <p>Números escolhidos: ${entradaUsuario.join(', ')}</p>
        <p>Números sorteados: ${numerosSorteados.join(', ')}</p>
    `;
});

function buscaBinaria(arr, x) {
    let esquerda = 0, direita = arr.length - 1;
    while (esquerda <= direita) {
        const meio = Math.floor((esquerda + direita) / 2);
        if (arr[meio] === x) {
            return true;
        } else if (arr[meio] < x) {
            esquerda = meio + 1;
        } else {
            direita = meio - 1;
        }
    }
    return false;
}
