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
function insertMedicines(name, desc) {
    db.ref('medicines/').push({
        name: name,
        desc: desc,
        date: dateActuality()
    });
}
function onClickInsert() {
    var name = value("name");
    var desc = value("desc");
    if (name.length == 0 || desc.length == 0) {
        alert("empty field");
    } else {
        inHTML("loadTable", "");
        insertMedicines(name, desc);
        asignation("name", "");
        asignation("desc", "");
        alert("saved successfully");
    }
}
function updateMedicines(name, desc, key) {
    db.ref('medicines/' + key).update({
        name: name,
        desc: desc,
        isAVailable: dateActuality()
    });
}
function onClickUpdate() {
    var name = value("nameEdit");
    var desc = value("descEdit");
    var key = value("key");
    if (name.length == 0 || desc.length == 0) {
        alert("empty field");
    } else {
        inHTML("loadTable", "");
        updateMedicines(name, desc, key);
        inHTML("editData", "");
        alert("modify successfully");
        update.disabled = true;
    }
}
function removeMedicines(key) {
    if (confirm("¿Quieres borrar este medicamento?")) {
        inHTML("loadTable", "");
        db.ref('medicines/' + key).remove();
    }
}
function table(key, date, drImg, drName, hour, state, title, usuarios, algo = NodeIterator) {
    return '<tr><td>' + algo + '</td><td>' + drImg + '</td><td>' + drName + '</td><td>' + hour + '</td><td>' + state + '</td><td>' + date + '</td><td>' + key + '</td><td>' + title + '</td><td>' + usuarios + '</td></tr>';
}
function viewDataUpdate(date, desc, price, img, isAVailable, excretion, routeOfAdministration, key) {
    var response = '<div class="form-group"><input type="hidden" value=' + key + ' id="key">' +
        '<input type="text" id="nameEdit" class="form-control" placeholder="Name" value=' + date + '>' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea placeholder="DescriptionEdit" class="form-control" id="descEdit">' + desc + '</textarea>' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea placeholder="DescriptionEdit" class="form-control" id="descEdit">' + price + '</textarea>' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea placeholder="DescriptionEdit" class="form-control" id="descEdit">' + img + '</textarea>' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea placeholder="DescriptionEdit" class="form-control" id="descEdit">' + isAVailable + '</textarea>' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea placeholder="DescriptionEdit" class="form-control" id="descEdit">' + excretion + '</textarea>' +
        '</div>' +
        '<div class="form-group">' +
        '<textarea placeholder="DescriptionEdit" class="form-control" id="descEdit">' + routeOfAdministration + '</textarea>' +
        '</div>';
    inHTML('editData', response);
    update.disabled = false;
}


var reference = db.ref('clinic_books/');
reference.on('value', function (datas) {
    var data = datas.val();
    $.each(data, function (nodo, value) {
        var sendData = table(value.date, value.drImg, value.drName, value.hour, value.state, value.title, value.algo, value.usuarios, nodo);
        printHTML('loadTable', sendData);
        console.log(value)
    });
});


