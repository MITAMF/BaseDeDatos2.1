const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListeners();

function cargarEventListeners() {
    elementos1.addEventListener('click', comprarElemento);
    carrito.addEventListener('click', eliminarElemento);
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar_Carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        id: elemento.querySelector('.agregar_Carrito').getAttribute('data-id')
    }
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
        <img src="${elemento.imagen}" width="100" />
    </td>
    <td>
        ${elemento.titulo}
    </td>
    <td>
        ${elemento.precio}
    </td>
    <td>
        <a href="#" class="borrar" data-id="${elemento.id}">X</a>
    </td>
    `;
    lista.appendChild(row);
}

function eliminarElemento(e) {
    e.preventDefault();
    let elemento,
        elementoId;
    if (e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
        elemento = e.target.parentElement.parentElement;
        elementoId = e.target.getAttribute('data-id');
    }
}

function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    return false;
}


document.addEventListener('DOMContentLoaded', function() {
    const adminLoginFormContainer = document.getElementById('admin-login-form-container');
    const adminLoginForm = document.getElementById('admin-login-form');
  
    // Muestra el formulario de inicio de sesión de administrador cuando se hace clic en el enlace "Ingresar"
    document.getElementById('ingresar-user').addEventListener('click', function(e) {
      e.preventDefault();
      adminLoginFormContainer.classList.remove('hidden');
    });
  
    // Maneja el envío del formulario de inicio de sesión de administrador
    adminLoginForm.addEventListener('submit', function(e) {
      e.preventDefault();
  
      const username = document.getElementById('admin-username').value;
      const password = document.getElementById('admin-password').value;
  
      // Envía las credenciales del administrador al servidor para autenticación
      fetch('/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Usuario o contraseña incorrectos');
        }
        return response.json();
      })
      .then(data => {
        // Redirige a la página de administrador si la autenticación es exitosa
        window.location.href = '/admin/dashboard';
      })
      .catch(error => {
        console.error('Error de inicio de sesión:', error);
        alert('Usuario o contraseña incorrectos');
      });
    });
  });
  