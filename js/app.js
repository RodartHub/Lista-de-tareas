//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


//Event listeners
eventListeners();
function eventListeners(){
    //Cuando el usuario agrega un nuevo twweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento està listo
    document.addEventListener('DOMContentLoaded', ()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        
        crearHTML();
    });
}

//Funciones
function agregarTweet(e){
    e.preventDefault();
    
    //Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //validacion...

    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio');

        return; //Evita que se ejecuten mas linea de codigo
    }   
    const tweetObj = {
        id: Date.now(),
        tweet
    }
    //Añadiendo al arreglo de tweets

    tweets = [...tweets, tweetObj];
    
    //Una vez agregado creamos el HTML
    crearHTML();

    //Reiniciar formulario

    formulario.reset();
}

//Mostrar mensaje de error

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo en el contenido

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Elimina la alerta despues de 3 segundos
    setTimeout(()=>{
    mensajeError.remove();

    },3000);
}

//Muestra un listado de los tweets

function crearHTML(){

    limpiarHTML();

    if(tweets.length >0){
        tweets.forEach(tweet =>{
            //Añadir boton para eliminar

            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //Añadir funcionalidad de eliminar

            btnEliminar.onclick = ()=>{
                borrarTweet(tweet.id);
            }

            //Añadir el texto
            const li = document.createElement('li');
            li.innerText = tweet.tweet;

            //Asignar el boton
            li.appendChild(btnEliminar);

            //Insertar en el HTML
            listaTweets.appendChild(li);

        });
    }

    sincronizarStorage();
}

//Agrega los tweets actuales a localstorage

function sincronizarStorage(){
    tweetsString = JSON.stringify(tweets);
    localStorage.setItem('tweets', tweetsString);
}

//Elimina el tweet

function borrarTweet (id){
    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML();
}

//Limpiar HTML

function limpiarHTML (){
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
