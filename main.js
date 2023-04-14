//se trae el array de cuadro clinicos asi cuando se dispare el evento se logre usar la base de datos

let data = [];

function cargarData() {
    fetch("./cuadroClinico.json")
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            data = datos;
        })
        .catch((error) => console.error(error));
}
cargarData();
//se armar tres funciones para el ingreso de sintomas via evento click en Ingresar sintomas generando un diagnostico
let solicitarSintoma1 = () => {
    let sintoma1 = document.getElementById("sintoma1");
    return sintoma1.value;
};

let solicitarSintoma2 = () => {
    let sintoma2 = document.getElementById("sintoma2");
    return sintoma2.value;
};

let solicitarSintoma3 = () => {
    let sintoma3 = document.getElementById("sintoma3");
    return sintoma3.value;
};
//estas funciones de orden superiores aisla el objeto dentro del array que tenga los sintomas referidos, fue complejo armar esto, de manera que esta redactado es imposible que los sintomas se mezclen y para llegar al diagnostico se debe tener el cuadro clinico completo
let resultadoClinico1 = () => {
    const resultadoClinico = data.filter(
        (sintoma) =>
        (sintoma.sintoma1.includes(solicitarSintoma1()) ||
            sintoma.sintoma1.includes(solicitarSintoma2()) ||
            sintoma.sintoma1.includes(solicitarSintoma3())) &&
        (sintoma.sintoma2.includes(solicitarSintoma1()) ||
            sintoma.sintoma2.includes(solicitarSintoma2()) ||
            sintoma.sintoma2.includes(solicitarSintoma3())) &&
        (sintoma.sintoma3.includes(solicitarSintoma1()) ||
            sintoma.sintoma3.includes(solicitarSintoma2()) ||
            sintoma.sintoma3.includes(solicitarSintoma3()))
    );
    return resultadoClinico;
};
//se aisla nombre si existe 
let nombreDiagnostico = () => {
    const resultadoDiagnostico = resultadoClinico1().map((el) => el.nombre);
    return resultadoDiagnostico;
};

//este aisla las pautas de alarma si existe
let pautasDiagnostico = () => {
    const resultadoPautas = resultadoClinico1().map((el) => el.pautas);
    return resultadoPautas;
};

//mensaje de diagnostico y que medidas tomar
let mensajeDiagnostico = () => {
    let mensaje =
        " Usted esta cursando un cuadro de " +
        nombreDiagnostico() +
        " las medidas a tomar son " +
        pautasDiagnostico();
    Swal.fire({
        icon: 'info',
        text: mensaje
    })
    return mensaje;
};


//uso de dom para modificar html para resultados
const generarMensaje = document.querySelector("#generarMensaje");
const mostrarResultado = document.querySelector("#mostrarResultado");

generarMensaje.addEventListener("click", () => {
    mostrarResultado.innerHTML = "";
    let results = document.createElement("div");
    results.classList.add(`resultado`);
    results.classList.add(`container`);
    mostrarResultado.appendChild(results)
    const resultText = mensaje();
    results.textContent = resultText;
    guardar();
});

let mensaje = () => {
    if (data.some((el) => el.nombre == nombreDiagnostico())) {
        return mensajeDiagnostico();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: " No se logro llegar a un diagnostico, acudir a la guardia",
        })
        return " No se logro llegar a un diagnostico, acudir a la guardia";
    }
};
//se usa el local storage para guardar el ultimo diagnostico si asi fuese posible, y el proximo refresh le mostrara el ultimo cuadro clinico
function guardar() {
    localStorage.setItem("diagnostico", JSON.stringify(nombreDiagnostico()));
}

let guardado = JSON.parse(localStorage.getItem("diagnostico"));
let ultimoDiagnostico = document.getElementById("ultimo");

if (guardado == "gastroenteritis,faringitis,cervicalgia,sindrome gripal,colecistitis,infeccion urinaria,gastroenteritis") {
    ultimoDiagnostico.remove();
} else if (guardado === null) {
    ultimoDiagnostico.remove();
} else if (guardado.length === 0) {
    ultimoDiagnostico.remove();
} else {
    ultimoDiagnostico.innerText = "Su ultimo diagnostico fue " + guardado;
    ultimoDiagnostico.classList.add(`mt-3`);
}
