const names = ["Aaran", "Scarlett", "Mccauley", "Cali", "Kaila", "Arissa", "Keziah", "Brielle", "Adelina", "Kia", "Aarav", "Kaylem", "Liyana", "Ammarah", "Esha", "Saoirse", "Mildred", "Lorraine", "Olive", "Austin"]
const lastNames = ["Dominguez", "Rose", "Stanley", "Mccray", "Tyler", "Lowery", "Lake", "Phillips", "Monaghan", "Moran", "Owens", "Durham", "Schaefer", "Lutz", "Chung", "Fowler", "Mora", "Crosby", "Davenport", "Solomon"]
const status = ['Contagiado', 'Sano', 'Crítico']
const places = ['Cooktown (AU)','Belmont (US)','Sarnia-Clearwater (CA)','Anchorage (US)','Beaconsfield (UK)','Presque Isle (US)','Port Orford (US)','Mitcheldean (UK)','Chapel Hill (US)','Lompoc (US)','Sterling (US)','Rouyn-Noranda (CA)','Talladega (US)','Buntingford (UK)','Ringwood (UK)','Mystic (US)','Rosebery (AU)','Fitchburg (US)','Coalville (UK)','Lisle (US)','Ararat (AU)','Tunbridge Wells (UK)','Amesbury (UK)','Central City (US)','Cape Girardeau (US)','Red Wing (US)','Campbelltown (AU)','Marion (US)','Stotfold (UK)','Rogers (US)']

async function seedCases() {
    var cantidad = 30;
    var records = [];
    for (let i = 0; i < cantidad; i++) {
        var covidcase = {
            name: `${_.sample(names)} ${_.sample(lastNames)}`,
            password: 'abc123',
            status: _.sample(status),
        }
        covidcase.username = covidcase.name.toLowerCase().replace(' ', '');
        var formData = getFormData(covidcase);
        records.push(covidcase);
        await req.create('case', formData);
    }
    console.table(records)
}

async function seedPlaces() {
    for (place of places) {
        var newPlace = {
            name: place,
            quantity: 0
        }
        var formData = getFormData(newPlace);
        await req.create('place', formData);
    }
}

function getFormData(obj) {
    var formData = new FormData();
    for ([key, val] of _.entries(obj)) {
        formData.append(key, val)
    }
    return formData;
}