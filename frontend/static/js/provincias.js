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

function getProvincia() {
    const id = getIdFromUrl()
    const url = `http://localhost:3000/provincias/${id}`

    fetch(url).then(res => { return res.json() }).then(object => {
        document.getElementById("nombre").value = object.nombre
        document.getElementById("codigo").value = object.codigo
        
        document.getElementById("form").className = ""
        document.getElementById('spinner').className = "d-none"
       
    })

}

function listarProvincia() {
    let url ='http://localhost:3000/provincias';
    fetch(url,{} )
        .then(response => response.json())
        .then(data => {

            let provincias = document.getElementById('provincias')

            let html = ''
            data.map(provinces => {
                html += `
                    <tr id="${provinces.id}">
                        
                        <td class="nombre">${provinces.nombre}</td>
                        <td class="codigo">${provinces.codigo}  
                        <td>    <a type="button" href="/provinces/update/${provinces.id}" 
                            class="btn btn-outline-light btn-sm"><i class="bi bi-pencil-square text-dark"></i></a>
                            <button type="button" class="btn btn-outline-light btn-sm" onclick="eliminarProvincia
                            ('${provinces.id}')"><i class="bi bi-trash3-fill text-danger"></i></button>
                        </td>
                    </tr>
                `
            })

            provincias.innerHTML = html
            document.getElementById('spinner').style.display = 'none'
        });
}

function crearProvincia() {
    //Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const url = 'http://localhost:3000/provincias/create'
    const nombre = document.getElementById("nombre")
    const codigo = document.getElementById("codigo")
  // (arriba decia camionero orig)  const paquete = document.getElementById("paquete")

    const data = {
        'nombre': nombre.value,
        'codigo': codigo.value
       // 'paqueteId': paquete.value (arriba decia camionero orig)
    }

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/provinces"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function editarProvincia(id) {
    // Deshabilitar botón
    disableButton(id = "guardar")

    // Preparar data
    const provincia_id = getIdFromUrl()
    const url = `http://localhost:3000/provincias/update/${provincia_id}`
    const nombre = document.getElementById("nombre")
    const codigo = document.getElementById("codigo")

    const data = {
      'nombre': nombre.value,
      'codigo': codigo.value
    }

    fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
        location.href = "/provinces"
    }).catch(error => {
        console.log(error);
        document.getElementById("error").innerText = "Ocurrió un error " + error
    })
}

function eliminarProvincia(id) {
    const item = document.getElementById(id)
    const nombre = item.querySelector('.nombre').innerText
    const codigo = item.querySelector('.codigo').innerText

    if (confirm(`¿Desea eliminar la provincia "${nombre} ${codigo}"?`)) {
        const url = `http://localhost:3000/provincias/delete/${id}`

        fetch(url, {
            method: 'DELETE'
        }).then(response => response.json()).then(data => {
            location.href = "/provinces"
        }).catch(error => {
            console.log(error);
            document.getElementById("error").innerText = "Ocurrió un error " + error
        })
    }
}
