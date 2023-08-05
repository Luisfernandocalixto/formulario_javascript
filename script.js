
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyBIvu28OSwP_0GiUp1XdHx7uUz_YxHAmHo",
    authDomain: "formulario-166dc.firebaseapp.com",
    projectId: "formulario-166dc",
    storageBucket: "formulario-166dc.appspot.com",
    messagingSenderId: "1078280591849",
    appId: "1:1078280591849:web:65720a4819752224211378"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()


    //  Validar campo nombre
    let entradaNombre = document.getElementById('name');
    let errorNombre = document.getElementById('nameError');

    // trim nos permite eliminar los espacios al costado que puedan existir al ingresar el nombre
    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por favor, ingresa tu nombre';
        errorNombre.classList.add('error-message');
    } else {
        errorNombre.textContent = '';
        errorNombre.classList.remove('error-message');

    }
    //  Validar correo electronico
    let emailEntrada = document.getElementById('email');
    let emailError = document.getElementById('emailError');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // => Patron basico

    if (!emailPattern.test(emailEntrada.value)) {
        emailError.textContent = 'Por favor, ingresa un email válido';
        emailError.classList.add('error-message');
    } else {
        emailError.textContent = '';
        emailError.classList.remove('error-message');
    }

    //  Validar la contraseña
    let contrasenaEntrada = document.getElementById('password');
    let contrasenaError = document.getElementById('passwordError');
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
        contrasenaError.innerHTML = 'La contraseña debe contener al<br> menos 8 caracteres, números,<br>mayúsculas y minúsculas';
        contrasenaError.classList.add('error-message');
    } else {
        contrasenaError.textContent = '';
        contrasenaError.classList.remove('error-message');
    }

    //  Si todos los campos son validos  enviar formulario
    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {

        // Backend que reciba la informacion
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
            .then((docRef) => {
                alert("El formulario se ha enviado con éxito", docRef.id);
                document.getElementById('formulario').reset();
            })
            .catch((error) => {
                alert(error);
            });


    }


});