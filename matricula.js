/* Luis Alfredo Rendon Escobar - Versión 1.0.1 - Viernes 17 de mayo de 2019
   Programa que lista e inscribe un curso para la prematícula. Adicional, se exporta la solcitud genereada a un archivo txt
   1) Script de ejecución con comando (parámetros obligatorios): node matricula inscribir --id=2 --nombre=Juan --cedula=1234
   2) Sino se indexa ningún comando, se procede con la impresión de cada uno de los cursos con intervalo de 2 segundos: node matricula
   3) De no encontrarse el curso, se retorna un mensaje indicando que no se encuentra tal búsqueda
*/

// Require - Módulo interno Fyle System:  
const fs = require('fs');

// Menú de opciones
const opciones = {
    id: {
        demand: true
    },
    nombre : {
        demand: true
    },
    cedula: {
        demand: true
    }
}

// Objeto de Cursos
let cursos = [{
    idCurso: 1,
    nombreCurso: 'Robotica',
    duracion: 6,
    valor: 200000
},
{
    idCurso: 2,
    nombreCurso: 'Programacion',
    duracion: 6,
    valor: 300000
},
{
    idCurso: 3,
    nombreCurso: 'Integral',
    duracion: 6,
    valor: 180000
},
{
    idCurso: 4,
    nombreCurso: 'Fisica',
    duracion: 6,
    valor: 180000
}];

var curso = {
        id: 0,
        nombre: '',
        duracion: 0,
        valor: 0
}

var usuario = {
    nombre: '',
    cedula: 0,
    cursos:[curso]  
}

// Declaración de Require Yargs para el ingreso de datos por consola
const argv = require('yargs')
            .command('inscribir', 'Matricular curso', opciones)
            .argv

var intervalo;
// Función que se encarga del proceso de pre-matricula de cursos.
function matriculas(id, nombre, cedula) {
    if(id !== undefined && nombre !== undefined && cedula !== undefined){
        let filtroCurso = cursos.find( cursoEst => cursoEst.idCurso == id)
        if (filtroCurso) {
            usuario.nombre = nombre;
            usuario.cedula = cedula;
            usuario.cursos = filtroCurso;
            console.log('Curso matriculado con éxito: ' + JSON.stringify(usuario));
            // Función para generar archivo txt con la información del usuario y curso seleccionado
            fs.writeFile('prematricula.txt', JSON.stringify(usuario), (err) => {
                // Si hay una excepción, se genera una alerta
                if(err) throw(err);
            }) 
        } else{
            console.log('INFORMACIÓN: Curso con número de identificación ' + id + ' no encontrado!');
        }       
    } else{
        // Función que imprime los cursos con intervalos de 2 segundos entre cada uno
        intervalo = setInterval(() => {
            mostrarCursos();
        }, 2000);
    }
}

let pos = 0;
function mostrarCursos() {
  console.log('Programa: ' + JSON.stringify(cursos[pos]));
  pos ++;
  if (pos == cursos.length) {
    clearInterval(intervalo);
    return;
  }
}

// Llamado de la función principal
matriculas(argv.id, argv.nombre, argv.cedula);

