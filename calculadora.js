// Selección de elementos
const display = document.querySelector('input[name="display"]');
const botonesNumeros = document.querySelectorAll('.numero');
const botonesOperadores = document.querySelectorAll('[data-operacion="aritmetica"]');
const botonIgual = document.querySelector('[data-operacion="igual"]');
const botonBorrar = document.querySelector('[data-operacion="borrar"]');

// Variables de estado
let valorAnterior = '';
let operador = '';
let esperandoNuevoValor = false;

// Función para actualizar el display correctamente (punto o coma visual)
function actualizarDisplay(valor) {
    display.value = valor.toString().replace('.', ',');
}

// Función para obtener valor del display en formato de cálculo
function valorDisplay() {
    return parseFloat(display.value.replace(',', '.'));
}

// Números
botonesNumeros.forEach(boton => {
    boton.addEventListener('click', () => {
        const texto = boton.textContent;
        if (display.value === "0" || esperandoNuevoValor) {
            actualizarDisplay(texto);
            esperandoNuevoValor = false;
        } else {
            actualizarDisplay(display.value.replace(',', '.') + texto);
        }
    });
});

// Operadores
botonesOperadores.forEach(boton => {
    boton.addEventListener('click', () => {
        valorAnterior = valorDisplay();
        operador = boton.textContent;
        esperandoNuevoValor = true;
    });
});

// Igual
botonIgual.addEventListener('click', () => {
    const valorActual = valorDisplay();
    let resultado = 0;

    switch (operador) {
        case '+':
            resultado = valorAnterior + valorActual;
            break;
        case '-':
            resultado = valorAnterior - valorActual;
            break;
        case 'x':
            resultado = valorAnterior * valorActual;
            break;
        case '÷':
        case '/':
            resultado = valorAnterior / valorActual;
            break;
        default:
            resultado = valorActual;
    }

    actualizarDisplay(resultado);
    operador = '';
    esperandoNuevoValor = true;
});

// Borrar
botonBorrar.addEventListener('click', () => {
    display.value = '0';
    valorAnterior = '';
    operador = '';
    esperandoNuevoValor = false;
});

// Cambiar signo
botonSigno.addEventListener('click', () => {
    actualizarDisplay(valorDisplay() * -1);
});


