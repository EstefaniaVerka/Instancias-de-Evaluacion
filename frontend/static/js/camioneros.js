// Auxiliares

function disableButton(id) {
    const button = document.getElementById(id)
    button.className = button.className + " disabled"
    button.setAttribute('disabled', 'disabled')
    button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
}

function getIdFromUrl() {
    const route = new URL(window.location).pathname
    const pathArray = route.split('/')
    return pathArray[pathArray.length - 1]
}

// CRUD

function getCamionero() {
    const id = getIdFromUrl()
    const url = `http://localhost:3000/camioneros/${id}`

    fetch(url).then(res => { return res.json() }).then(object => {
        document.getElementById("nombre").value = object.nombre
        document.getElementById("dni").value = object.dni
        document.getElementById("telefono").value = object.telefono
        document.getElementById("direccion").value = object.direccion
        document.getElementById("salario").value = object.salario
        document.getElementById("poblacion").value = object.poblacion

        document.getElementById("form").className = ""
        document.getElementById('spinner').className = "d-none"

    })

}

function listarCamionero() {
    let url = 'http://localhost:3000/camioneros';
    fetch(url, {})
        .then(response => response.json())
        .then(data => {

            let camioneros = document.getElementById('camioneros')

            let html = ''
            data.map(drivers => {
                html += `
                    <tr id="${drivers.id}">
                        <td>${drivers.id}</td>
                        <td class="dni">${drivers.dni}</td>
                        <td class="nombre">${drivers.nombre}</td>
                        <td class="telefono">${drivers.telefono}</td>
                        <td class="direccion">${drivers.direccion}</td>
                        <td class="salario">${drivers.salario}</td>
                        <td class="poblacion">${drivers.poblacion}</td>
                        <td>
                            <a type="button" href="/drivers/update/${drivers.id}" 
                            class="btn btn-outline-light btn-sm"><i class="bi bi-pencil-square text-dark"></i></a>
                            <button type="button" class="btn btn-outline-light btn-sm" 
                            onclick="eliminarCamionero('${drivers.id}')"><i class="bi bi-trash3-fill text-danger"></i></button>
                        </td>
                    </tr>
                `
            })

            camioneros.innerHTML = html
            document.getElementById('spinner').style.display = 'none'
        });
}

function crearCamionero() {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const url = 'http://localhost:3000/camioneros/create'
    const nombre = document.getElementById("nombre")
    const dni = document.getElementById("dni")
    const telefono = document.getElementById("telefono")
    const direccion = document.getElementById("direccion")
    const salario = document.getElementById("salario")
    const poblacion = document.getElementById("poblacion")

    const data = {
        'nombre': nombre.value,
        'dni': dni.value,
        'telefono': telefono.value,
        'direccion': direccion.value,
        'salario': salario.value,
        'poblacion': poblacion.value
    }

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/drivers"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function editarCamionero(id) {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const camionero_id = getIdFromUrl()
    const url = `http://localhost:3000/camioneros/update/${camionero_id}`
    const nombre = document.getElementById("nombre")
    const dni = document.getElementById("dni")
    const telefono = document.getElementById("telefono")
    const direccion = document.getElementById("direccion")
    const salario = document.getElementById("salario")
    const poblacion = document.getElementById("poblacion")

    const data = {
        'nombre': nombre.value,
        'dni': dni.value,
        'telefono': telefono.value,
        'direccion': direccion.value,
        'salario': salario.value,
        'poblacion': poblacion.value
    }

    fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/drivers"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function eliminarCamionero(id) {
    const item = document.getElementById(id)
    const nombre = item.querySelector('.nombre').innerText
    const dni = item.querySelector('.dni').innerText

    if (confirm(`¿Desea eliminar el camionero "${nombre} ${dni}"?`)) {
        const url = `http://localhost:3000/camioneros/delete/${id}`

        fetch(url, {
            method: 'DELETE'
        }).then(response => response.json()).then(data => {
            location.href = "/drivers"
        }).catch(error => {
            console.log(error);
            document.getElementById("error").innerText = "Ocurrió un error " + error
        })
    }
}