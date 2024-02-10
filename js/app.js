// VARIABLES
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-notas');
let tweets = []; // Notas 

// EVENT LISTENERS
eventListeners();
function eventListeners() {
    //* cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //* CUANDO EL Documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHTML();
    });
}

// FUNCIONES

function agregarTweet(e) {
    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#toDO').value;

    // validación....
    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Agregarlo al array de tweets
    tweets = [...tweets, tweetObj];
    

    //Una vez agregado crear HTML
    crearHTML();

    // reiniciar el formulario
    formulario.reset();
}


//* Mostrar mensaje de error

function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);


    // Elimina la alerta despues de 3s
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}


//* Muestra un listado de los tweets
function crearHTML() {

    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach( tweet => {
            //* agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerHTML = 'X';

            //! AÑADIR LA FUNCION DE ELIMINAR
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //* CREAR EL HTML
            const li = document.createElement('LI');


            //* AÑADIR EL TEXTO
            li.innerHTML = tweet.tweet;

            //* ASIGNAR EL BOTÓN   
            li.appendChild(btnEliminar);

            //*insertarlo en el html
            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
}

// agrega los tweets actuales a localstorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//! Elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id );
    mostrarError('Se ha eliminado tu nota...');
    crearHTML();
}

// limpiar el html
function limpiarHTML() {
    while ( listaTweets.firstChild ) {
        listaTweets.removeChild( listaTweets.firstChild );
    }
}