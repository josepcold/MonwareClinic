var db = firebase.database();

var update = document.getElementById('update');
update.disabled = true;

function value(request) {
    return document.getElementById(request).value;
}
function asignation(request, response) {
    return document.getElementById(request).value = response;
}
function printHTML(request, response) {
    return document.getElementById(request).innerHTML += response;
}
function inHTML(request, response) {
    return document.getElementById(request).innerHTML = response;
}
function insertUsuarios(Nombre, Apellido, Direccion, Ciudad, Estado, Telefono, codigopostal) {
    db.ref('Usuarios/').push({
        Nombre: Nombre,
        Apellido: Apellido,
        Direccion: Direccion,
        Ciudad: Ciudad,
        Estado: Estado,
        Telefono: Telefono,
        codigopostal: codigopostal
    });
}
function onClickInsert() {
    var Nombre = value("Nombre");
    var Apellido = value("Apellido");
    var Direccion = value("Direccion");
    var Ciudad = value("Ciudad");
    var Estado = value("Estado");
    var Telefono = value("Telefono");
    var codigopostal = value("codigopostal");
    if (Nombre.length == 0 || Apellido.length == 0) {
        alert("empty field");
    } else {
        inHTML("loadTable", "");
        insertUsuarios(Nombre, Apellido, Direccion, Ciudad, Estado, Telefono, codigopostal);
        asignation("Nombre", "");
        asignation("Apellido", "");
        asignation("Direccion", "");
        asignation("Ciudad", "");
        asignation("Estado", "");
        asignation("Telefono", "");
        asignation("codigopostal", "");
        alert("saved successfully");
    }
}
function updateUsuarios(Nombre, Apellido, Direccion, Ciudad, Estado, Telefono, codigopostal, key) {
    db.ref('Usuarios/' + key).update({
        Nombre: Nombre,
        Apellido: Apellido,
        Direccion: Direccion,
        Ciudad: Ciudad,
        Estado: Estado,
        Telefono: Telefono,
        codigopostal: codigopostal
    });
}
function onClickUpdate() {
    var Nombre = value("Nombre");
    var Apellido = value("Apellido");
    var Direccion = value("Direccion");
    var Ciudad = value("Ciudad");
    var Estado = value("Estado");
    var Telefono = value("Telefono");
    var codigopostal = value("codigopostal");
    var key = value("key");
    if (Nombre.length == 0 || Apellido.length == 0) {
        alert("empty field");
    } else {
        inHTML("loadTable", "");
        updateUsuarios(Nombre, Apellido, Direccion, Ciudad, Estado, Telefono, codigopostal, key);
        inHTML("editData", "");
        alert("modify successfully");
        update.disabled = true;
    }
}
function removeUsuarios(key) {
    if (confirm("¿you want to delete medicines?")) {
        inHTML("loadTable", "");
        db.ref('Usuarios/' + key).remove();

    }
}
function table(Nombre, Apellido, Direccion, Ciudad, Estado, Telefono, codigopostal, key) {
    return '<tr><td>' + Nombre + '</td><td>' + Apellido + '</td><td>' + Direccion + '</td><td>' + Ciudad + '</td><td>' + Estado + '</td><td>' + Telefono + '</td><td>' + codigopostal + '</td>' +
        '<td><a href="#" onclick="viewDataUpdate(\'' + Nombre + '\', \'' + Apellido + '\', \'' + Direccion + '\', \'' + Ciudad + '\', \'' + Estado + '\', \'' + Telefono + '\', \'' + codigopostal + '\', \'' + key + '\')">' +
        '<i class="fas fa-edit blue icon-lg"></i></a></td>' +
        '<td><a href="#" onclick="removeUsuarios(\'' + key + '\')">' +
        '<i class="fas fa-trash-alt red icon-lg"></i></a></td></tr>';
}
function viewDataUpdate(Nombre, Apellido, Direccion, Ciudad, Estado, Telefono, codigopostal, key) {
    var response = '<div class="form-group"><input type="hidden" value=' + key + ' id="key">' +
        '<input type="text" id="Nombre" class="form-control" placeholder="Nombre" value=' + Nombre + '>' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea placeholder="Apellido" class="form-control" id="Apellido">' + Apellido + '</textarea>' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea placeholder="Direccion" class="form-control" id="Direccion">' + Direccion + '</textarea>' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea placeholder="Ciudad" class="form-control" id="Ciudad">' + Ciudad + '</textarea>' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea placeholder="Estado" class="form-control" id="Estado">' + Estado + '</textarea>' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea placeholder="Telefono" class="form-control" id="Telefono">' + Telefono + '</textarea>' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea placeholder="codigopostal" class="form-control" id="codigopostal">' + codigopostal + '</textarea>' +
        '</div>';
    inHTML('editData', response);
    update.disabled = false;
}
var reference = db.ref('Usuarios/');
reference.on('value', function (datas) {
    var data = datas.val();
    $.each(data, function (nodo, value) {
        var sendData = table(value.Nombre, value.Apellido, value.Direccion, value.Ciudad, value.Estado, value.Telefono, value.codigopostal, nodo);
        printHTML('loadTable', sendData);
    });
});