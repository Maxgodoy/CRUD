function read(key){
    return JSON.parse(window.localStorage.getItem(key)) || [];
}
function save (key, data){
    window.localStorage.setItem(key, JSON.stringify(data));
}



let idCliente = document.querySelector("#id");
let nombre = document.querySelector("#nombre");
let Apellido = document.querySelector("#apellido");
let Edad = document.querySelector("#edad");


function addCliente(e){
    let clientes = read("clientes");

if (idCliente.value == 0 || idCliente.value == null){
    const cliente = {
        id: (clientes.length + 1),
        name : nombre.value,
        lastName : apellido.value,
        age : edad.value,
    }
    clientes.push(cliente);
}
save("clientes", clientes);
show();
}

function show(){

let tbody = document.querySelector("#clientes");
tbody.innerHTML ="";
let clientes = read("clientes");


clientes.forEach(element => {
    tbody.innerHTML += `<tr>
    <th>${element.id}</th>
    <td>${element.name}</td>
    <td>${element.lastName}</td>
    <td>${element.age}</td>
    <td>
    <button type="button" id="edit${element.id}" class="btn btn-outline-warning">edit</button>
    <button type="button" id="del${element.id}" class="btn btn-outline-danger">del</button>
    </td>
    </tr>
    `;  



});
    

}

show();

let btnAdd = document.querySelector("#btnAgregar");
btnAdd.addEventListener("click", (e) => {
    addCliente(e);
})