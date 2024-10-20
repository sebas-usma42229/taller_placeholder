
const API_URL = 'https://jsonplaceholder.typicode.com/posts';


const obtenerRegistrosBtn = document.getElementById('obtener-registros');
const registrosDiv = document.getElementById('registros');
const formCrear = document.getElementById('form-crear');


const obtenerRegistros = () => {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            registrosDiv.innerHTML = '';
            data.forEach(registro => { 
                const registroDiv = document.createElement('div');
                registroDiv.classList.add('registro');
                registroDiv.innerHTML = `
                    <h3>${registro.title}</h3>
                    <p>${registro.body}</p>
                    <button onclick="editarRegistro(${registro.id})">Editar</button>
                    <button onclick="eliminarRegistro(${registro.id})">Eliminar</button>
                `;
                registrosDiv.appendChild(registroDiv);
            });
        })
        .catch(error => console.error('Error al obtener los registros:', error));
};


const crearRegistro = (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const cuerpo = document.getElementById('cuerpo').value;

    const nuevoRegistro = {
        title: titulo,
        body: cuerpo,
        userId: 1
    };

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoRegistro)
    })
    .then(response => response.json())
    .then(data => {
        alert('Registro creado exitosamente');
        formCrear.reset();
        obtenerRegistros(); 
    })
    .catch(error => console.error('Error al crear el registro:', error));
};


const editarRegistro = (id) => {
    const nuevoTitulo = prompt('Nuevo título:');
    const nuevoCuerpo = prompt('Nuevo cuerpo:');
    
    if (nuevoTitulo && nuevoCuerpo) {
        fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: nuevoTitulo,
                body: nuevoCuerpo,
                userId: 1
            })
        })
        .then(response => response.json())
        .then(data => {
            alert('Registro editado correctamente');
            obtenerRegistros(); 
        })
        .catch(error => console.error('Error al editar el registro:', error));
    }
};


const eliminarRegistro = (id) => {
    if (confirm('¿Estás seguro de eliminar este registro?')) {
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Registro eliminado');
                obtenerRegistros(); 
            } else {
                alert('Error al eliminar el registro');
            }
        })
        .catch(error => console.error('Error al eliminar el registro:', error));
    }
};
obtenerRegistrosBtn.addEventListener('click', obtenerRegistros);
formCrear.addEventListener('submit', crearRegistro);