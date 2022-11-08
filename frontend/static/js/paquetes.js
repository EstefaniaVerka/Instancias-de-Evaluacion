// Auxiliares

//const { Paquete, Provincia } = require("../../../backend/database/models")


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

function getPaquete() {
    const id = getIdFromUrl()
    const url = `http://localhost:3000/paquetes/${id}`

    fetch(url).then(res => { return res.json() }).then(object => {
        
        document.getElementById("destinatario").value = object.destinatario
        document.getElementById("direcciondeldestinatario").value = object.direcciondeldestinatario
        document.getElementById("descripcion").value = object.descripcion
        loadSelect(provincia = object.provinciaId)

        document.getElementById("form").className = ""
        document.getElementById('spinner').className = "d-none"

    })

}

function listarPaquete() {
    let url = 'http://localhost:3000/paquetes';
    fetch(url, {})
        .then(response => response.json())
        .then(data => {
            let paquetes = document.getElementById('paquetes')
            let html = ''
            let provincia = ''

            data.map(packages => {
                if (packages.provincia !== null && packages.provincia !== undefined && 
                    packages.provincia !== {}) {
                    provincia =`${packages.provincia.nombre} (${packages.provincia.codigo})`
                } else {
                    provincia =''
                }

                
                html += `
                    <tr id="${packages.id}">
                    <td>${packages.id}</td>
                        <td class="destinatario">${packages.destinatario}</td>
                        <td class="direcciondeldestinatario">${packages.direcciondeldestinatario}</td>
                        <td>${provincia}</td>
                        <td class="descripcion">${packages.descripcion}</td>
                        <td>
                            <a type="button" href="/packages/update/${packages.id}" 
                            class="btn btn-outline-light btn-sm"><i class="bi bi-pencil-square text-dark"></i></a>
                            <button type="button" class="btn btn-outline-light btn-sm" 
                            onclick="eliminarPaquete('${packages.id}')"><i class="bi bi-trash3-fill text-danger"></i></button>
                        </td>
                    </tr>
                `
            })

            paquetes.innerHTML = html
            document.getElementById('spinner').style.display = 'none'
        });
}

function crearPaquete() {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const url = 'http://localhost:3000/paquetes/create'
    const destinatario = document.getElementById("destinatario")
    const direcciondeldestinatario = document.getElementById("direcciondeldestinatario")
    const provincia = document.getElementById("provincia")
    const descripcion = document.getElementById("descripcion")

    const data = {
        
        'destinatario': destinatario.value,
        'direcciondeldestinatario': direcciondeldestinatario.value,
        'provinciaId': provincia.value,
        'descripcion': descripcion.value
        
    }

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/packages"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function editarPaquete(id) {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const paquete_id = getIdFromUrl()
    const url = `http://localhost:3000/paquetes/update/${paquete_id}`
    const destinatario = document.getElementById("destinatario")
    const direcciondeldestinatario = document.getElementById("direcciondeldestinatario")
    const provincia = document.getElementById("provincia")
    const descripcion = document.getElementById("descripcion")

    const data = {
        
        'destinatario': destinatario.value,
        'direcciondeldestinatario': direcciondeldestinatario.value,
        'provinciaId': provincia.value,
        'descripcion': descripcion.value
    }

    fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/packages"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function eliminarPaquete(id) {
    const item = document.getElementById(id)
    const descripcion = item.querySelector('.descripcion').innerText

    if (confirm(`¿Desea eliminar el paquete "${descripcion}"?`)) {
        const url = `http://localhost:3000/paquetes/delete/${id}`

        fetch(url, {
            method: 'DELETE'
        }).then(response => response.json()).then(data => {
            location.href = "/packages"
        }).catch(error => {
            console.log(error);
            document.getElementById("error").innerText = "Ocurrió un error " + error
        })
    }
}


///relaciones

function getProvincias(provincias, provincia) {
    let url = 'http://localhost:3000/provincias';
    fetch(url, {})
    .then(response => response.json ())
    .then(data =>  {
        let html = '<option value = "null"> Seleccionar </option>'
        let selected = ''
        data.map(item => {
            if (item.id == provincia) {
                selected = 'selected'
            } else {
                selected =''
            }

            html += `<option value ="${item.id}" ${selected}>${item.nombre}</option>`
        })

        provincias.innerHTML = html
    });
}

function loadSelect(provincia = null) {
    const provincias = document.getElementById("provincia")

    getProvincias(provincias, provincia)
}