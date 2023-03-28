//se declara clase para poder construir objetos, incluyen sintomas, nombre de patologia y pautas a tomar con diagnostico de dicha patologia.
class cuadroClinico {
    constructor(nombre, pautas, sintoma1, sintoma2, sintoma3) {
        this.nombre = nombre;
        this.pautas = pautas;
        this.sintoma1 = sintoma1;
        this.sintoma2 = sintoma2;
        this.sintoma3 = sintoma3;
    }
}
const cuadro1 = new cuadroClinico(
    "gastroenteritis",
    "hidratarse, tomar agua y tomar antidiarreicos",
    "dolor abdominal",
    "vomitos",
    "diarrea"
);
const cuadro2 = new cuadroClinico(
    "faringitis",
    "tomar ibuprofeno y comprimidos de ernex",
    "fiebre",
    "dolor de garganta",
    "congestion nasal"
);
const cuadro3 = new cuadroClinico(
    "cervicalgia",
    "tomar diclofenac y aplicar calor en la zona",
    "dolor de cuello",
    "mareos",
    "dolor de cabeza"
);
//se construye array a base de cuadros clinicos, se puede agregar cuadros de forma mas rapida y eficaz que primer entrega
const arraycuadroClinico = [cuadro1, cuadro2, cuadro3];

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
    const resultadoClinico = arraycuadroClinico.filter(
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
//se aisla nombre
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
    return mensaje;
};
//uso de dom para modificar html
const generarMensaje = document.querySelector("#generarMensaje");
const mostrarResultado = document.querySelector("#mostrarResultado");

generarMensaje.addEventListener("click", () => {
    mostrarResultado.innerHTML = "";
    let results = document.createElement("div");
    results.classList.add(`resultado`);
    results.classList.add(`container`);
    mostrarResultado.appendChild(results);
    const resultText = mensaje(); // you need to give the value for a nad b
    results.textContent = resultText;
    guardar();
});

let mensaje = () => {
    if (arraycuadroClinico.some((el) => el.nombre == nombreDiagnostico())) {
        return mensajeDiagnostico();
    } else {
        return " No se logro llegar a un diagnostico, acudir a la guardia";
    }
};
//se usa el local storage para guardar el ultimo diagnostico si asi fuese posible, y el proximo refresh le mostrara el ultimo cuadro clinico
function guardar() {
    localStorage.setItem("diagnostico", JSON.stringify(nombreDiagnostico()));
}

let guardado = JSON.parse(localStorage.getItem("diagnostico"));
let ultimoDiagnostico = document.getElementById("ultimo");

if (guardado == "gastroenteritis,faringitis,cervicalgia") {
    ultimoDiagnostico.remove();
} else if (guardado === null) {
    ultimoDiagnostico.remove();
}else if( guardado.length===0){
    ultimoDiagnostico.remove();
}
else{
    ultimoDiagnostico.innerText = "Su ultimo diagnostico fue " + guardado;
}
