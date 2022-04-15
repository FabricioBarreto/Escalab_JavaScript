/*
Validaciones necesarias:
+ Campo nombre y apellido no debe estar vacío y contener al menos un espacio
+ Campo correo debe tener un correo válido
+ Campo número de teléfono debe tener entre 7 y 15 dígitos, 
    pudiendo tener un + al inicio, ignorando espacios en blanco
+ Campo comentario debe tener al menos 20 caracteres
*/

const formulario = document.querySelector("#formulario-contacto");
const botonEnviar = document.querySelector(".btn-enviar");

const nameContact = document.getElementsByName("name_contact")[0];
const email = document.getElementsByName("email_contact")[0];
const phone = document.getElementsByName("phone_contact")[0];
const topic = document.getElementById("topic_contact");
const commit = document.getElementsByName("commit_contact")[0];

const errorsList = document.getElementById("errors");
errorsList.style.color = "#ff0101";

function showError(element, message) {
    element.classList.toggle("error");
    errorsList.innerHTML += `<li>* ${message}</li>`;
}

function cleanErrors() {
    errorsList.innerHTML = "";
}

let hasErrors = false; 

// Desafío opcional: qué elemento y evento podríamos usar para detectar si el usuario apreta Enter en vez de hacer click?
botonEnviar.addEventListener("keypress", event => {
    event.preventDefault();
    cleanErrors();
    hasErrors = false;
    validateAndSend();
});


botonEnviar.addEventListener("click", (event) => {
    event.preventDefault();
    cleanErrors();
    hasErrors = false;
    validateAndSend();
});
    
function validateAndSend(){
    // TODO: validar nombre y apellido acá
    const sanitizedName = nameContact.value.trim();
    if(sanitizedName.length === 0 || nameContact.value.indexOf(" ") < 0){
        showError(nameContact, "El campo nombre y apellido no debe estar vacío y contener al menos un espacio.")
        hasErrors = true;
    }

    const mailRe = /^\w+@\w+\.\w{2,7}$/;
    if (!mailRe.exec(email.value)) {
        showError(email, "El correo debe seguir un formato válido.");
        hasErrors = true;
    }
    
    const phoneRe = /^\+?\d{7,15}$/;
    const sanitizedPhone = phone.value.replace(" ", "");
    if (!phoneRe.exec(sanitizedPhone)) {
        showError(phone, "Número de teléfono debe tener entre 7 y 15 dígitos.");
        hasErrors = true;
    }
    
    // TODO: Validar comentario acá

    const sanitizedCommit = commit.value.trim();
    if(sanitizedCommit.length < 20){
        showError(commit,"El comentario debe tener al menos 20 acaracteres.")
        hasErrors = true;
    }

    // TODO: Enviar consulta a API en caso de que el formulario esté correcto
    if(!hasErrors){
        enviarCorreo(sanitizedName,email.value,sanitizedPhone,topic.value,sanitizedCommit)
    }
}
   
    // TODO: Enviar datos a API usando fetch, siguiendo la estructura indicada
    async function enviarCorreo(name,email,phone,select,comment){
        await fetch("https://30kd6edtfc.execute-api.us-east-1.amazonaws.com/prod/send-email",{
            method: 'POST',
            headers : {
                'Acept':'aplication/json',
                'Content-Type':'aplication/json'
            },
            body : JSON.stringify({name, email,  phone, select, comment})
    });
}
