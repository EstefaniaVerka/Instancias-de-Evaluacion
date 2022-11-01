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

function getCamion() {
    const id = getIdFromUrl()
    const url = `http://localhost:3000/camiones/${id}`

    fetch(url).then(res => { return res.json() }).then(object => {
        document.getElementById("matricula").value = object.matricula
        document.getElementById("modelo").value = object.modelo
        document.getElementById("tipo").value = object.tipo
        document.getElementById("potencia").value = object.potencia

        document.getElementById("form").className = ""
        document.getElementById('spinner').className = "d-none"

    })

}

function listarCamion() {
    let url = 'http://localhost:3000/camiones';
    fetch(url, {})
        .then(response => response.json())
        .then(data => {

            let camiones = document.getElementById('camiones')

            let html = ''
            data.map(truck => {
                html += `
                    <tr id="${truck.id}">
                        
                        <td>${truck.matricula}</td>
                        <td class="modelo">${truck.modelo}</td>
                        <td class="tipo">${truck.tipo}</td>
                        <td>${truck.potencia}</td>
                        <td>
                            <a type="button" href="/trucks/update/${truck.id}" 
                            class="btn btn-outline-light btn-sm">
                            <i class="bi bi-pencil-square text-dark"></i></a>
                            <button type="button" class="btn btn-outline-light btn-sm" 
                            onclick="eliminarCamion('${truck.id}')">
                            <i class="bi bi-trash3-fill text-danger"></i></button>
                        </td>
                    </tr>
                `
            })

            camiones.innerHTML = html
            document.getElementById('spinner').style.display = 'none'
        });
}

function crearCamion() {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const url = 'http://localhost:3000/camiones/create'
    const matricula = document.getElementById("matricula")
    const modelo = document.getElementById("modelo")
    const tipo = document.getElementById("tipo")
    const potencia = document.getElementById("potencia")

    const data = {
        'matricula': matricula.value,
        'modelo': modelo.value,
        'tipo': tipo.value,
        'potencia': potencia.value,
    }

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/trucks"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function editarCamion(id) {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const camion_id = getIdFromUrl()
    const url = `http://localhost:3000/camiones/update/${camion_id}`
    
    const matricula = document.getElementById("matricula")
    const modelo = document.getElementById("modelo")
    const tipo = document.getElementById("tipo")
    const potencia = document.getElementById("potencia")

    const data = {
        'matricula': matricula.value,
        'modelo': modelo.value,
        'tipo': tipo.value,
        'potencia': potencia.value,
    }

    fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/trucks"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function eliminarCamion(id) {
    const item = document.getElementById(id)
    const matricula = item.querySelector('.matricula').innerText
    const modelo = item.querySelector('.modelo').innerText

    if (confirm(`¿Desea eliminar el camion "${matricula} ${modelo}"?`)) {
        const url = `http://localhost:3000/camiones/delete/${id}`

        fetch(url, {
            method: 'DELETE'
        }).then(response => response.json()).then(data => {
            location.href = "/trucks"
        }).catch(error => {
            console.log(error);
            document.getElementById("error").innerText = "Ocurrió un error " + error
        })
    }
}