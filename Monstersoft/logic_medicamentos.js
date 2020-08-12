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
function insertMedicines(name, desc, price, img, isAvailable, excretion, routeOfAdministration) {
    db.ref('medicines/').push({

        name: name,
        desc: desc,
        price: price,
        img: img,
        isAvailable: isAvailable,
        excretion: excretion,
        routeOfAdministration: routeOfAdministration
    });
}
function onClickInsert() {
    var nodo = value("nodo")
    var name = value("name");
    var desc = value("desc");
    var price = value("price");
    var img = value("img");
    var isAvailable = value("isAvailable");
    var excretion = value("excretion");
    var routeOfAdministration = value("routeOfAdministration");
    if (name.length == 0 || desc.length == 0) {
        alert("empty field");
    } else {
        inHTML("loadTable", "");
        insertMedicines(name, desc, price, img, isAvailable, excretion, routeOfAdministration);

        asignation("name", "");
        asignation("desc", "");
        asignation("price", "");
        asignation("img", "");
        asignation("isAvailable", "");
        asignation("excretion", "");
        asignation("routeOfAdministration", "");
        alert("saved successfully");
    }
}
function updateMedicines(name, desc, price, img, isAvailable, excretion, routeOfAdministration, key) {
    db.ref('medicines/' + key).update({
        name: name,
        desc: desc,
        price: price,
        img: img,
        isAvailable: isAvailable,
        excretion: excretion,
        routeOfAdministration: routeOfAdministration
    });
}
function onClickUpdate() {
    var name = value("name");
    var desc = value("desc");
    var price = value("price");
    var img = value("img");
    var isAvailable = value("isAvailable");
    var excretion = value("excretion");
    var routeOfAdministration = value("routeOfAdministration");
    var key = value("key");
    if (name.length == 0 || desc.length == 0) {
        alert("empty field");
    } else {
        inHTML("loadTable", "");
        updateMedicines(name, desc, price, img, isAvailable, excretion, routeOfAdministration, key);
        inHTML("editData", "");
        alert("modify successfully");
        update.disabled = true;
    }
}
function removeMedicines(key) {
    if (confirm("¿you want to delete medicines?")) {
        inHTML("loadTable", "");
        db.ref('medicines/' + key).remove();

    }
}
function table(name, desc, price, img, isAvailable, excretion, routeOfAdministration, key) {
    return '<tr><td>' + name + '</td><td>' + desc + '</td><td>' + price + '</td><td>' + img + '</td><td>' + isAvailable + '</td><td>' + excretion + '</td><td>' + routeOfAdministration + '</td>' +
        '<td><a href="#" onclick="viewDataUpdate(\'' + name + '\', \'' + desc + '\', \'' + price + '\', \'' + img + '\', \'' + isAvailable + '\', \'' + excretion + '\', \'' + routeOfAdministration + '\', \'' + key + '\')">' +
        '<i class="fas fa-edit blue icon-lg"></i></a></td>' +
        '<td><a href="#" onclick="removeMedicines(\'' + key + '\')">' +
        '<i class="fas fa-trash-alt red icon-lg"></i></a></td></tr>';
}
function viewDataUpdate(name, desc, price, img, isAvailable, excretion, routeOfAdministration, key) {
    var response = '<div class="form-group"><input type="hidden" value=' + key + ' id="key">' +
        '<input type="text" id="name" class="form-control" placeholder="name" value=' + name + '>' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea placeholder="desc" class="form-control" id="desc">' + desc + '</textarea>' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea placeholder="price" class="form-control" id="price">' + price + '</textarea>' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea placeholder="img" class="form-control" id="img">' + img + '</textarea>' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea placeholder="isAvailable" class="form-control" id="isAvailable">' + isAvailable + '</textarea>' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea placeholder="excretion" class="form-control" id="excretion">' + excretion + '</textarea>' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea placeholder="routeOfAdministration" class="form-control" id="routeOfAdministration">' + routeOfAdministration + '</textarea>' +
        '</div>';
    inHTML('editData', response);
    update.disabled = false;
}
var reference = db.ref('medicines/');
reference.on('value', function (datas) {
    var data = datas.val();
    $.each(data, function (nodo, value) {
        var sendData = table(value.name, value.desc, value.price, value.img, value.isAvailable, value.excretion, value.routeOfAdministration, nodo);
        printHTML('loadTable', sendData);
        console.log(nodo);
    });
});


