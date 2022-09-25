function read(key){
    return JSON.parse(window.localStorage.getItem(key)) || [];
}
function save (key, data){
    window.localStorage.setItem(key, JSON.stringify(data));
}



let idCliente = document.querySelector("#id");
let nombre = document.querySelector("#nombre");
let apellido = document.querySelector("#apellido");
let edad = document.querySelector("#edad");


function createCliente(e){
    let clientes = read("clientes");

if (idCliente.value == 0 || idCliente.value == null){
    const cliente = {
        id: (clientes.length + 1),
        name : nombre.value,
        lastName : apellido.value,
        age : edad.value,
    }
    clientes.push(cliente);
}else{
    // const cliente = clientes[idCliente.id-1];
    let pos = clientes.findIndex(cliente => cliente.id == idCliente.value);
    if (pos >= 0){
        clientes[pos].name =nombre.value;
        clientes[pos].lastName =apellido.value;
        clientes[pos].age =edad.value;
    }
    
}
save("clientes", clientes);
clearForm();
readAll();
}

function clearForm(){
    idCliente.value = 0;
    nombre.value = '';
    apellido.value = '';
    edad.value = null;
}

function readAll(){

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
    <button type="button" id="edit${element.id}" class="btn btn-outline-warning">Editar</button>
    <button type="button" id="del${element.id}" class="btn btn-outline-danger">Eliminar</button>
    </td>
    </tr>
    `;  



});
}

function readOne(id){
    let clientes = read("clientes");
    let cliente = clientes[id - 1];

    idCliente.value = cliente.id;
    nombre.value = cliente.name;
    apellido.value = cliente.lastName;
    edad.value = cliente.age;
}

function eliminarCliente(id){
    let clientes = read("clientes");
    let filtrado = clientes.filter(cliente => cliente.id != id);
    save("clientes", filtrado);
    readAll();
}

readAll();

let btnAdd = document.querySelector("#btnAgregar");
btnAdd.addEventListener("click", (e) => {
    createCliente(e);
})
let editList = document.querySelectorAll(".btn-outline-warning")
editList.forEach(element =>{
    element.addEventListener('click', (e) =>{
        readOne(element.id.match(/(\d+)/)[0]);
    })
});

let eliminarList = document.querySelectorAll(".btn-outline-danger")
eliminarList.forEach(element =>{
    element.addEventListener('click', (e) =>{
        eliminarCliente(element.id.match(/(\d+)/)[0]);
    })
});
