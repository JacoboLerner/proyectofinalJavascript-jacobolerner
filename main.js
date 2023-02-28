//la primera parte del simulador permite al usuario ingresar ciertos sintomas para poder llegar a un diagnostico y tratamiento dependiendo de los datos ingresados, si no se logra un hilo de datos correctos se llega a un no diagnostico, al ingresar los sintomas, se dispuso el codigo para que no tenga una orden en particular


function medico ( sintoma1, sintoma2, sintoma3){
    var sintoma1 = prompt ("Ingresar un sintoma");
    var sintoma2 = prompt ("Ingresar otro sintoma");
    var sintoma3 = prompt ("Ingresar otro sintoma");
    if ((( sintoma1 == "diarrea")||( sintoma1 == "vomitos")||( sintoma1 == "dolor abdominal")) && (( sintoma2 == "diarrea")||( sintoma2 == "vomitos")||( sintoma2 == "dolor abdominal")) && (( sintoma3 == "diarrea")||( sintoma3 == "vomitos")||( sintoma3 == "dolor abdominal"))){
        alert("Usted esta cursando una gastroenteritis, haga dieta y tome reliveran");
    } 
    else if((( sintoma1 == "fiebre")||( sintoma1 == "dolor de garganta")||( sintoma1 == "congestion nasal")) && (( sintoma2 == "fiebre")||( sintoma2 == "congestion nasal")||( sintoma2 == "dolor de garganta")) && (( sintoma3 == "fiebre")||( sintoma3 == "congestion nasal")||( sintoma3 == "dolor de garganta"))){
        alert("Usted esta cursando una faringitis, tome paracetamol y acemuk");
    }
    else if((( sintoma1 == "dolor cervical")||( sintoma1 == "mareos")||( sintoma1 == "dolor de cabeza")) && (( sintoma2 == "dolor cervical")||( sintoma2 == "mareos")||( sintoma2 == "dolor de cabeza")) && (( sintoma3 == "dolor cervical")||( sintoma3 == "mareos")||( sintoma3 == "dolor de cabeza"))){
        alert("Usted esta cursando una cervicalgia, tome diclofenac y haga reposo");
    }
    else{
        alert("No se puedo llegar a un diagnostico, acuda a la guardia de forma presencial");
    } 
    return "gracias por usar asistencia virtual"
}

medico ();
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



