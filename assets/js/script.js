import clientes from "./mis_clientes.js";
let table_body = document.querySelector("#table-body")

window.addEventListener('load', () => {
    table_body.innerHTML = ""
    clientes.forEach(el => {
        table_body.innerHTML += /*html*/`
            <tr>
                <th scope="row">${ el.id }</th>
                <td>${ el.clave }</td>
            </tr>
        `
    })
})
