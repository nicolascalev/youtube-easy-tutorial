const names = ['María Carmen','Borja','Fátima','Edu','Dani','Zacarías','Esther','Isabel','Maristela','Paquita']
const lastNames = ['Bennett','Cooper','Jordan','Gibson','Lopez','King','Harrison','Morris','Henry','Stewart']
const status = ['Contagiado', 'Sano', 'Crítico']

async function launch() {
    var cantidad = 20;
    var records = [];
    for (let i = 0; i < cantidad; i++) {
        var covidcase = {
            name: `${_.sample(names)} ${_.sample(lastNames)}`,
            status: _.sample(status),
        }
        var formData = getFormData(covidcase);
        records.push(covidcase);
        await req.create('case', formData);
    }
    console.table(records)
}

function getFormData(obj) {
    var formData = new FormData();
    for ([key, val] of _.entries(obj)) {
        formData.append(key, val)
    }
    return formData;
}