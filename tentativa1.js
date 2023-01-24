//Exercício: Validação de CPF

//Exemplo de CPF(gerado aleatóriamente): 705.484.450-52 / 070.987.720.03

/*
7x  0x 5x 4x 8x 4x 4x 5x 0x
10  9  8  7  6  5  4  3  2
70  0  40 28 48 20 16 15 0 = 237

11 - (237 % 11) = 5 (Primeiro dígito)
Se o número digito for maior que 9, consideramos 0.

7x  0x 5x 4x 8x 4x 4x 5x 0x 5x
11 10  9  8  7  6  5  4  3  2
77  0  45 32 56 24 20 20 0  10 = 284

11 - (284 % 11) = 2 (Primeiro dígito)
Se o número digito for maior que 9, consideramos 0.
*/

let cpf = "705.484.450-52"; //Primeiro digito = 5 , Segundo digito = 2;

//console.log(cpfArray.length);

function validaCaracter(cpf) {
  let cpfLimpo = cpf.replace(/\D+/g, "");
  const cpfArray = Array.from(cpfLimpo);

  if (cpfLimpo.length < 11 || cpfLimpo.length > 11) {
    return "Quantidade de caracteres inválida!";
  } else {
    return validaCPF(cpfArray);
  }
}

function getFirstDigit(cpfArray) {
  let contador = 10;
  let primeiroDigito = [];

  for (let i = 0; i < cpfArray.length - 2; i++) {
    primeiroDigito.push(cpfArray[i] * contador);
    contador--;
  }

  primeiroDigito = parseInt(
    primeiroDigito.reduce((acumulador, valor) => {
      acumulador += valor;
      return acumulador;
    }, 0)
  );

  if (primeiroDigito % 11 < 2) {
    primeiroDigito = 0;
  } else if (primeiroDigito % 11 >= 2) {
    primeiroDigito = 11 - (primeiroDigito % 11);
  }

  return primeiroDigito;
}

function getSecondDigit(cpfArray) {
  let contador = 11;
  let segundoDigito = [];

  for (let i = 0; i < cpfArray.length - 1; i++) {
    segundoDigito.push(cpfArray[i] * contador);
    contador--;
  }

  //console.log(segundoDigito);

  segundoDigito = parseInt(
    segundoDigito.reduce((acumulador, valor) => {
      acumulador += valor;
      return acumulador;
    }, 0)
  );

  if (segundoDigito % 11 < 2) {
    segundoDigito = 0;
  } else if (segundoDigito % 11 >= 2) {
    segundoDigito = 11 - (segundoDigito % 11);
  }

  return segundoDigito;
}

function validaCPF(cpfArray) {
  if (
    parseInt(cpfArray[cpfArray.length - 1]) === getSecondDigit(cpfArray) &&
    parseInt(cpfArray[cpfArray.length - 2]) === getFirstDigit(cpfArray)
  ) {
    return "CPF Válido!";
  } else {
    return "CPF Inválido!";
  }
}

console.log(validaCaracter(cpf));
