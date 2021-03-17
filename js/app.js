// Variables

const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn')
const formulario = document.querySelector('#enviar-mail');

// Variables para campos

const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

// Funciones

function iniciarApp () {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
    formulario.reset();

    const pError = document.querySelector('p.error');
    if (pError) pError.remove();

    let elementosErrorRed = document.querySelectorAll('.border-red-500');
    if(elementosErrorRed.length > 0){
        elementosErrorRed.forEach(element => {
            element.classList.remove('border-red-500');
        });
    };

    let elementosErrorGreen = document.querySelectorAll('.border-green-500');
    if(elementosErrorGreen.length > 0){
        elementosErrorGreen.forEach(element => {
            element.classList.remove('border-green-500');
        });
    };
}

function validarForm (e){
    
    if(e.target.value.length > 0) {
        const pError = document.querySelector('p.error');
        if (pError) pError.remove();
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    let mailValido = validarMail(e.target.value);

    if(e.target.type === 'email'){
        if(mailValido){
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            mostrarError('Email invalido');
        }
    }

    if(mailValido === 1 && asunto.value.length > 0 && mensaje.value.length > 0){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }

}

function validarMail (mail){
    const expRegMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(expRegMail.test(mail)) {
        return 1;
    } else {
        return 0;
    }
}

function mostrarError(mensaje){
    mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'bg-red-100', 'text-red-500', 'p-3', 'mb-5', 'error');
    if(!(document.querySelector('.error'))){
        formulario.insertBefore(mensajeError, document.querySelector('#botonera'));
    };
}

function enviarEmail (e) {
    const spinner = document.querySelector('#spinner');
    e.preventDefault;
    resetFormulario(e);
    spinner.style.display = 'flex';
    setTimeout(() => {
        spinner.style.display = 'none';
        mensajeEnvio = document.createElement('p');
        mensajeEnvio.textContent = 'El mail se ha enviado correctamente';
        mensajeEnvio.classList.add('border', 'border-green-500', 'bg-green-100', 'text-white-500', 'p-3', 'mb-5', 'error');
        formulario.insertBefore(mensajeEnvio, document.querySelector('#botonera'));
        setTimeout(() => {
            mensajeEnvio.style.display = 'none';
        }, 3000);
    }, 3000);
}

function resetFormulario(e) {
    e.preventDefault();
    formulario.reset();
    iniciarApp();
}

// Funcion autoejecutable que da inicio a la aplicacion

(function (){
    document.addEventListener('DOMContentLoaded', iniciarApp);

    btnEnviar.addEventListener('click', enviarEmail);
    btnReset.addEventListener('click', resetFormulario);

    email.addEventListener('input', validarForm);
    asunto.addEventListener('input', validarForm);
    mensaje.addEventListener('input', validarForm);

}) ();