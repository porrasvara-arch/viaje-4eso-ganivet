function guardarDatos(){

    localStorage.setItem(
        "viaje4eso",
        JSON.stringify(alumnos)
    );

}

function cargarDatos(){

    const datos = localStorage.getItem("viaje4eso");

    if(datos){

        alumnos = JSON.parse(datos);

    }

}

cargarDatos();
let filtro = "todos";
let indicePase = 0;

const lista = document.getElementById("lista");
const buscar = document.getElementById("buscar");

function pintar() {

    lista.innerHTML = "";

    let texto = buscar.value.toLowerCase();

    let visibles = alumnos.filter(a => {

        if (!a.nombre.toLowerCase().includes(texto))
            return false;

        if (filtro == "presentes")
            return a.presente;

        if (filtro == "ausentes")
            return !a.presente;

        return true;

    });

    visibles.sort((a,b)=>a.nombre.localeCompare(b.nombre));

    let presentes = 0;

    visibles.forEach((a,i)=>{

        if(a.presente) presentes++;

        lista.innerHTML += `

<div class="tarjeta">

<h2>${a.nombre}</h2>

<p>🏨 Habitación ${a.habitacion}</p>

<button
onclick="toggle(${alumnos.indexOf(a)})"
style="width:100%;height:60px;font-size:22px;">

${a.presente ? "🟢 PRESENTE" : "🔴 AUSENTE"}

</button>

</div>

`;

    });

    document.getElementById("totalAlumnos").innerHTML=alumnos.length;
    document.getElementById("presentes").innerHTML=alumnos.filter(x=>x.presente).length;
    document.getElementById("ausentes").innerHTML=alumnos.filter(x=>!x.presente).length;

}

function toggle(i){

    alumnos[i].presente = !alumnos[i].presente;

    guardarDatos();

    pintar();

}

function mostrarTodos(){

    filtro="todos";

    pintar();

}

function soloPresentes(){

    filtro="presentes";

    pintar();

}

function soloAusentes(){

    filtro="ausentes";

    pintar();

}

function ordenHabitacion(){

    alumnos.sort((a,b)=>a.habitacion-b.habitacion);

    pintar();

}

function iniciarPaseLista(){

    indicePase=0;

    document.getElementById("lista").style.display="none";

    document.getElementById("paseLista").style.display="block";

    mostrarAlumno();

}

function mostrarAlumno(){

    let a=alumnos[indicePase];

    document.getElementById("nombrePase").innerHTML=a.nombre;

    document.getElementById("habitacionPase").innerHTML="🏨 Habitación "+a.habitacion;

    document.getElementById("progreso").innerHTML=(indicePase+1)+" / "+alumnos.length;

}

function marcarPresente(){

    alumnos[indicePase].presente = true;

    guardarDatos();

    siguiente();

}

function marcarAusente(){

    alumnos[indicePase].presente = false;

    guardarDatos();

    siguiente();

}

function siguiente(){

    indicePase++;

    if(indicePase>=alumnos.length){

        document.getElementById("paseLista").style.display="none";

        document.getElementById("lista").style.display="block";

        pintar();

        alert("✅ Pase de lista terminado");

        return;

    }

    mostrarAlumno();

}

buscar.addEventListener("keyup",pintar);

pintar();