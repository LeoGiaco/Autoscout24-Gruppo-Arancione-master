"use strict";
var CarCondition;
(function (CarCondition) {
    CarCondition[CarCondition["Usato"] = 0] = "Usato";
    CarCondition[CarCondition["Nuovo"] = 1] = "Nuovo";
    CarCondition[CarCondition["KM0"] = 2] = "KM0";
})(CarCondition || (CarCondition = {}));
var CarTrasmission;
(function (CarTrasmission) {
    CarTrasmission[CarTrasmission["Manuale"] = 0] = "Manuale";
    CarTrasmission[CarTrasmission["Automatico"] = 1] = "Automatico";
})(CarTrasmission || (CarTrasmission = {}));
var CarAlimentation;
(function (CarAlimentation) {
    CarAlimentation[CarAlimentation["Benzina"] = 0] = "Benzina";
    CarAlimentation[CarAlimentation["Diesel"] = 1] = "Diesel";
    CarAlimentation[CarAlimentation["GPL"] = 2] = "GPL";
    CarAlimentation[CarAlimentation["Metano"] = 3] = "Metano";
    CarAlimentation[CarAlimentation["Elettrica"] = 4] = "Elettrica";
})(CarAlimentation || (CarAlimentation = {}));
var EmissionClass;
(function (EmissionClass) {
    EmissionClass[EmissionClass["Euro0"] = 0] = "Euro0";
    EmissionClass[EmissionClass["Euro1"] = 1] = "Euro1";
    EmissionClass[EmissionClass["Euro2"] = 2] = "Euro2";
    EmissionClass[EmissionClass["Euro3"] = 3] = "Euro3";
    EmissionClass[EmissionClass["Euro4"] = 4] = "Euro4";
    EmissionClass[EmissionClass["Euro5"] = 5] = "Euro5";
})(EmissionClass || (EmissionClass = {}));
var Car = /** @class */ (function () {
    function Car(
    //Stato
    prezzo, condition, proprietari, 
    //Motore e trazione
    cambio, marce, cilindrata, cilindri, peso, trazione, 
    //Caratteristiche
    marca, modello, anno, colore, tipoVernice, rivestimenti, carrozzeria, porte, posti, 
    //Ambiente
    alimentazione, classeEmissioni, optional) {
        //Stato
        this.prezzo = prezzo;
        this.condition = condition;
        this.proprietari = proprietari;
        //Motote e trazione
        this.cambio = cambio;
        this.marce = marce;
        this.cilindrata = cilindrata;
        this.cilindri = cilindri;
        this.peso = peso;
        this.trazione = trazione;
        //Caratteristiche
        this.marca = marca;
        this.modello = modello;
        this.anno = anno;
        this.colore = colore;
        this.tipoVernice = tipoVernice;
        this.rivestimenti = rivestimenti;
        this.carrozzeria = carrozzeria;
        this.porte = porte;
        this.posti = posti;
        //Ambiente
        this.alimentazione = alimentazione;
        this.classeEmissioni = classeEmissioni;
        this.optional = optional;
    }
    return Car;
}());
//# sourceMappingURL=car.js.map