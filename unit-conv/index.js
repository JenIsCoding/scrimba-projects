//Ci sono 3 elementi di classe "text" sotto il div che ha id "results"
//Sono memorizzati sotto-forma di array
//Vengono recuperati e stoccati in tre differenti variabili 

textLinearEl = document.getElementById("results").getElementsByClassName("text")[0]
textCubicEl = document.getElementById("results").getElementsByClassName("text")[1]
textMassEl = document.getElementById("results").getElementsByClassName("text")[2]

//inputEl fa riferimento al box dell'input
inputEl = document.getElementById("inputBox")

//Quando l'utente scrive un valore nel box dell'input 
//(ce ne accorgiamo tramite l'opzione "keyup" dell'eventListener), 
//si attiva la funzione convertIsActive()

inputEl.addEventListener('keyup', convertIsActive)

//La funzione convertIsActive() recupera il valore inserito dall'utente nel box e 
//lo memorizza nella variabile x.
//Successivamente richiama la funzione calc()

function convertIsActive(){
    const x = inputEl.value;
    calc(x);
}

//La funzione calc() crea un oggetto in cui sono memorizzati i 6 valori
//("mtf", "mft", "lgt", "gtl", "ktp", "ptk")
//in uscita dalle rispettive funzioni linearConv(), cubicConv() e massConv() 
//a cui è stato dato in pasto il parametro x [linea 23]
function calc(val){
    var obj = {
        "mtf": linearConv(val)[0],
        "ftm": linearConv(val)[1],
        "ltg": cubicConv(val)[0],
        "gtl": cubicConv(val)[1],
        "ktp": massConv(val)[0],
        "ptk": massConv(val)[1],
    }

//Nel caso in cui il valore inserito dall'utente sia 1, il valore deve essere:
//1 meter ... | 1 foot ...
//1 liter ... | 1 gallon ...
//1 kilo ... | 1 pound ...
//senza le 's' finali. Il ciclo if si occupa proprio di fare questa scrematura.
//Alla fine, i testi corretti vengono immessi - tramite textContent - nei rispettivi elementi: 
//textLinearEl, textCubicEl e textMassEl

    if(val == 1) {
        const text1 = `${val} meter = ${obj.mtf} feet | ${val} foot = ${obj.ftm} meters`;
        const text2 = `${val} liter = ${obj.ltg} gallons | ${val} gallon = ${obj.gtl} liters`;
        const text3 = `${val} kilo = ${obj.ktp} pounds | ${val} pound = ${obj.ptk} kilos`;
        textLinearEl.textContent = text1;
        textCubicEl.textContent = text2;
        textMassEl.textContent = text3;

    } else{
        const text1 = `${val} meters = ${obj.mtf} feet | ${val} feet = ${obj.ftm} meters`;
        const text2 = `${val} liters = ${obj.ltg} gallons | ${val} gallons = ${obj.gtl} liters`;
        const text3 = `${val} kilos = ${obj.ktp} pounds | ${val} pounds = ${obj.ptk} kilos`;
        textLinearEl.textContent = text1;
        textCubicEl.textContent = text2;
        textMassEl.textContent = text3;
    }
}

//------------------------------------------------------------------------------------------------------
//Funzioni che realizzano le conversioni numeriche tra le unità di misura
//Ogni funzione restituisce un array di formato da 2 valori.
//Ciascun array viene inserito nell'oggetto obj della funzione calc() [linee 29-35]

// Prima -- Conversione lineare
function linearConv(num) {
    const a = 0.3048;
    const fromMetersToFeet = (num / a).toFixed(3);
    const fromFeetToMeters = (num * a).toFixed(3);
    return [fromMetersToFeet, fromFeetToMeters];
}

// Seconda -- Conversione di volume
function cubicConv(num) {
    const b = 3.7854;
    const fromLitersToGallons = (num / b).toFixed(3);
    const fromGallonsToLiters = (num * b).toFixed(3);
    return [fromLitersToGallons, fromGallonsToLiters];
}

// Terza -- Conversione di massa
function massConv(num) {
    const c = 0.4536;
    const fromKilosToPounds = (num / c).toFixed(3);
    const fromPoundsToKilos = (num * c).toFixed(3);
    return [fromKilosToPounds, fromPoundsToKilos];
}