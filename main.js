//se declara clase para poder construir objetos, incluyen sintomas, nombre de patologia y pautas a tomar con diagnostico de dicha patologia.
class cuadroClinico {
    constructor(nombre,pautas, sintoma1, sintoma2, sintoma3){
        this.nombre= nombre
        this.pautas= pautas
        this.sintoma1= sintoma1
        this.sintoma2= sintoma2
        this.sintoma3= sintoma3
    }
}
const cuadro1 = new cuadroClinico ( "gastroenteritis", "hidratarse, tomar agua y tomar antidiarreicos","dolor abdominal", "vomitos", "diarrea");
const cuadro2 = new cuadroClinico ( "faringitis", "tomar ibuprofeno y comprimidos de ernex","fiebre", "dolor de garganta", "congestion nasal");
const cuadro3 = new cuadroClinico( "cervicalgia","tomar diclofenac y aplicar calor en la zona","dolor de cuello", "mareos", "dolor de cabeza");

//se construye array a base de cuadros clinicos, se puede agregar cuadros de forma mas rapida y eficaz que primer entrega
const arraycuadroClinico = [cuadro1, cuadro2, cuadro3];

//se armar tres funciones para el ingreso de sintomas via prompt que discriminan respuesta en blanco
function solicitarSintoma1(){
    let sintoma1 = prompt ("Ingresar un sintoma:");
    while (sintoma1 === ""){
        sintoma1 = prompt ("Ingresar un sintoma valido:");
    }
    return sintoma1;}

function solicitarSintoma2(){
        let sintoma2 = prompt ("Ingresar otro sintoma: ");
        while (sintoma2 === ""){
            sintoma2 = prompt ("Ingresar un sintoma valido:");
        }
        return sintoma2;}

function solicitarSintoma3(){
            let sintoma3 = prompt ("Ingresar otro sintoma:");
            while (sintoma3 === ""){
                sintoma3 = prompt ("Ingresar un sintoma valido:");
            }
            return sintoma3;}

let sintoma1=solicitarSintoma1();
let sintoma2 =solicitarSintoma2();
let sintoma3 =solicitarSintoma3();

//estas funciones de orden superiores aisla el objeto dentro del array que tenga los sintomas referidos, fue complejo armar esto, de manera que esta redactado es imposible que los sintomas se mezclen y para llegar al diagnostico se debe tener el cuadro clinico completo
const resultadoClinico = arraycuadroClinico.filter((sintoma)=>((sintoma.sintoma1.includes(sintoma1))||(sintoma.sintoma1.includes(sintoma2))||(sintoma.sintoma1.includes(sintoma3))
)&&((sintoma.sintoma2.includes(sintoma1))||(sintoma.sintoma2.includes(sintoma2))||(sintoma.sintoma2.includes(sintoma3)))&&((sintoma.sintoma3.includes(sintoma1))||(sintoma.sintoma3.includes(sintoma2))||(sintoma.sintoma3.includes(sintoma3))))

//este aisla el nombre del cuadro si es posible el diagnostico
const resultadoDiagnostico= resultadoClinico.map((el) => el.nombre)

//este aisla las pautas de alarma si existe
const resultadoPautas= resultadoClinico.map((el) => el.pautas)

//mensaje con pautas de alarma y daignostico
let mensaje = " Usted esta cursando un cuadro de " + resultadoDiagnostico + " las medidas a tomar son " + resultadoPautas

//si se logra tener un array con un diagnostico( es decir un array que tenga un nombre) se da una alerta, en caso contrario se da un mensaje de no diagnostico
if ((resultadoDiagnostico.some((el) =>(el.nombre == "faringitis"||"gastroenteritis"||"cervicalgia")))){
    alert (mensaje);
    console.log(mensaje)
}else {
    alert (" No se logro llegar a un diagnostico, acudir a la guardia")
}


//luego se le otorga la oportunidad de aceptar o no la asistencia y a base de eso dar por finalizada la atencion o mandar una queja por mail

function ingresaAcepta(){
    let aceptar = prompt ("Acepta asistencia virtual?")
    while (aceptar != "si"){
        switch (aceptar){
            case "no":
                alert (" Mandanos un mail en lo que podemos mejorar.");
                aceptar = prompt ("Acepta asistencia virtual?")
                break;
            default:
                alert ("Ingrese si o no");               
                aceptar = prompt ("Acepta asistencia virtual?")
                break;
        }
}
    if (aceptar == "si"){
        alert ( "Gracias por usar asistencia virtual")
    }
}

ingresaAcepta();