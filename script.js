const formulario = document.getElementById('formulario');
const lista = document.getElementById('lista-clientes');
const buscar = document.getElementById('buscar');

let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
let editId = null;

function guardarClientes() {
  localStorage.setItem('clientes', JSON.stringify(clientes));
}

function renderClientes(filtro = '') {
  lista.innerHTML = '';
  clientes
    .filter(c =>
      c.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      c.email.toLowerCase().includes(filtro.toLowerCase()) ||
      c.empresa.toLowerCase().includes(filtro.toLowerCase())
    )
    .forEach((cliente, index) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${cliente.nombre}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefono}</td>
        <td>${cliente.empresa}</td>
        <td>
          <button class="edit" onclick="editarCliente(${index})">Editar</button>
          <button class="delete" onclick="eliminarCliente(${index})">Eliminar</button>
        </td>
      `;
      lista.appendChild(fila);
    });
}

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const telefono = document.getElementById('telefono').value;
  const empresa = document.getElementById('empresa').value;

  const nuevo = { nombre, email, telefono, empresa };

  if (editId !== null) {
    clientes[editId] = nuevo;
    editId = null;
  } else {
    clientes.push(nuevo);
  }

  guardarClientes();
  renderClientes();
  formulario.reset();
});

function eliminarCliente(index) {
  if (confirm('¿Eliminar cliente?')) {
    clientes.splice(index, 1);
    guardarClientes();
    renderClientes();
  }
}

function editarCliente(index) {
  const cliente = clientes[index];
  document.getElementById('nombre').value = cliente.nombre;
  document.getElementById('email').value = cliente.email;
  document.getElementById('telefono').value = cliente.telefono;
  document.getElementById('empresa').value = cliente.empresa;
  editId = index;
}

buscar.addEventListener('input', () => {
  renderClientes(buscar.value);
});

renderClientes();
