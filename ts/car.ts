enum CarCondition {
    Usato,
    Nuovo,
    KM0
}

enum CarTrasmission {
    Manuale,
    Automatico
}

enum CarAlimentation {
    Benzina,
    Diesel,
    GPL,
    Metano,
    Elettrica
}

enum EmissionClass {
    Euro0,
    Euro1,
    Euro2,
    Euro3,
    Euro4,
    Euro5
}

class Car {
    //Stato
    public prezzo: number;
    public condition: CarCondition;
    public proprietari: number;

    //Motore e trazione
    public cambio: CarTrasmission;
    public marce: number;
    public cilindrata: number;
    public cilindri: number;
    public peso: number;
    public trazione: string;

    //Caratteristiche
    public marca: string;
    public modello: string;
    public anno: number;
    public colore: string;
    public tipoVernice: string;
    public rivestimenti: string;
    public carrozzeria: string;
    public porte: number;
    public posti: number;

    //Ambiente
    public alimentazione: CarAlimentation;
    public classeEmissioni: EmissionClass;
    //optional
    public optional: string;
    constructor(
        //Stato
        prezzo: number,
        condition: CarCondition,
        proprietari: number,

        //Motore e trazione
        cambio: CarTrasmission,
        marce: number,
        cilindrata: number,
        cilindri: number,
        peso: number,
        trazione: string,

        //Caratteristiche
        marca: string,
        modello: string,
        anno: number,
        colore: string,
        tipoVernice: string,
        rivestimenti: string,
        carrozzeria: string,
        porte: number,
        posti: number,

        //Ambiente
        alimentazione: CarAlimentation,
        classeEmissioni: EmissionClass,
        optional: string
    ) { //Constructor body
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
}