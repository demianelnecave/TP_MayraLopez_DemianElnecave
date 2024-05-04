function validarFormulario() {
    // Captura los valores del formulario
    const apellido = document.getElementById("apellido").value;
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;
    const confirmarContrasena = document.getElementById("confirmar_contrasena").value;

    // Verifica si las contraseñas coinciden
    if (contrasena !== confirmarContrasena) {
        alert("Las contraseñas no coinciden");
        return false;
    }

    // Almacena los datos en localStorage
    localStorage.setItem('apellido', apellido);
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('correo', correo);
    localStorage.setItem('contrasena', contrasena);

    // O puedes almacenarlos en sessionStorage si solo deseas que persistan durante la sesión actual
     //sessionStorage.setItem('apellido', apellido);
     //sessionStorage.setItem('nombre', nombre);
     //sessionStorage.setItem('correo', correo);
     //sessionStorage.setItem('contrasena', contrasena);

    // Mensaje de confirmación
    alert("¡Registro exitoso!");

    return true;
}
// login_script.js
function validarLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Por favor, complete todos los campos.');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return false;
    }

    return true;
}

function validarForgotPassword() {
    const email = document.getElementById('forgot-email').value;

    if (!email) {
        alert('Por favor, ingrese su correo electrónico.');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return false;
    }

    return true;
}