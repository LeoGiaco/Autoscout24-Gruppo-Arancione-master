//https://www.w3schools.com/jsref/dom_obj_event.asp

var auto = new Array<Car>();

module Backend {
    // export var debugArr = new Array<Car>();
    export function processClick(e: Event): void {
        e.preventDefault();
        let car = fetchCar();
        console.log(car);
        if (car == null) {
            alert("ERRORE\nRiempi tutti i campi.");
            e.stopPropagation();
            return;
        }
        auto.push(car);

        //RESET BOXES
        $('input[type="text"]').attr("value", "");
        $('input[type="color"]').attr("value", "#000000");

        LocalStorageUtil.save(auto);
        Frontend.refreshContent();
    }

    export function fetchCar(): Car | null {
        let prezzo: number = $("#beprezzo").val() as number;
        let conditionval: string = $("#becondizione").val() as string;
        let condition: CarCondition = conditionval == "Usato" ? CarCondition.Usato : conditionval == "Nuovo" ? CarCondition.Nuovo : CarCondition.KM0;
        let proprietari: number = Number($("#beproprietari").val());

        //Motore e trazione
        let cambioval: string = $("#becambio").val() as string;
        let cambio: CarTrasmission = cambioval == "Manuale" ? CarTrasmission.Manuale : CarTrasmission.Automatico;
        let marce: number = Number($("#bemarce").val());
        let cilindrata: number = Number($("#becilindrata").val());
        let cilindri: number = Number($("#becilindri").val());
        let peso: number = Number($("#bepeso").val());
        let trazione: string = $("#betrazione").val() as string;

        //Caratteristiche
        let marca: string = $("#bemarca").val() as string;
        let modello: string = $("#bemodello" + marca).val() as string;
        let anno: number = (new Date($("#beanno").val() as string)).getFullYear();
        let colore: string = $("#becolore").val() as string;
        let tipoVernice: string = $("#betipoVernice").val() as string;
        let rivestimenti: string = $("#berivestimento").val() as string;
        let carrozzeria: string = $("#becarrozzeria").val() as string;
        let porte: number = $("#beporte").val() as number;
        let posti: number = $("#beposti").val() as number;

        //Ambiente
        let alimentazioneval: string = $("#bealimentazione").val() as string;
        let alimentazione: CarAlimentation = alimentazioneval == "Benzina" ? CarAlimentation.Benzina :
            alimentazioneval == "Diesel" ? CarAlimentation.Diesel :
                alimentazioneval == "GPL" ? CarAlimentation.GPL :
                    alimentazioneval == "Metano" ? CarAlimentation.Metano : CarAlimentation.Elettrica;
        let classeEmissionival: string = $("#beemissioni").val() as string;
        let classeEmissioni: EmissionClass = classeEmissionival == "Euro 0" ? EmissionClass.Euro0 :
            classeEmissionival == "Euro 1" ? EmissionClass.Euro1 :
                classeEmissionival == "Euro 2" ? EmissionClass.Euro2 :
                    classeEmissionival == "Euro 3" ? EmissionClass.Euro3 :
                        classeEmissionival == "Euro 4" ? EmissionClass.Euro4 : EmissionClass.Euro5;
        let optional: string = $("#betextarea").val() as string;
        return new Car(
            prezzo,
            condition,
            proprietari,
            cambio,
            marce,
            cilindrata,
            cilindri,
            peso,
            trazione,
            marca,
            modello,
            anno,
            colore,
            tipoVernice,
            rivestimenti,
            carrozzeria,
            porte,
            posti,
            alimentazione,
            classeEmissioni,
            optional
        );
    }
}

module BEUI {
    export function loadModelSelection() {
        let marcaSel = $("#bemarca").val() as string;
        $(".selModel").attr("hidden", "hidden");
        $("#bemodello" + marcaSel).removeAttr("hidden");
    }
}

module Frontend {
    // export var marche = new Array<string>();
    // export var modelli = new Array<string>();

    export function loadjSON(path: string) {
        $.getJSON(path).done(function (data) {
            $.each(data, function (key, elem) {
                auto.push(elem);
            })
            Frontend.refreshContent();
        })
    }

    export function createDiv(temp: Car, n: number) {
        var clone = $("#listTemplate").clone();
        clone.removeAttr("hidden");
        clone.css("opacity", 0);
        clone.find(".li-marca").text(temp.marca);
        clone.end();
        clone.find(".li-modello").text(temp.modello);
        clone.end();
        clone.find(".li-prezzo").text(`€${temp.prezzo}`);
        clone.end();
        clone.find(".li-condizione").text(CarCondition[temp.condition]);
        clone.end();
        clone.find(".li-emissioni").text(EmissionClass[temp.classeEmissioni]);
        clone.end();
        clone.find(".li-alimentazione").text(CarAlimentation[temp.alimentazione]);
        clone.end();
        $("#listItems").append(clone.animate({ opacity: 1 }, 500, "swing"));
        // $("#listItems").append(str(n));
        // $("#modello_" + n).html("Modello:" + temp.modello + " Porte:" + temp.porte + " cilindrata: " + temp.cilindrata);
        // $("#prezzo_" + n).html("Prezzo: " + temp.prezzo.toString() + " euro.");
        // $("#descrizione_" + n).html("Marca: " + temp.marca);
    }

    // export function str(n: number) {
    //     return '<li class="media form-card"> <div class="col-md-3"> <img id="img_' + n + '" src="001.jpg" class="img-thumbnail rounded" alt="img"> </div> <div class="col-md-9"> <div id="modello_' + n + '"class="row">modello </div> <div class="row"> <div class="col-md-3"> <div id="prezzo_' + n + '" class="row">PREZZO</div> </div> <div class="col-md-9" id="descrizione_' + n + '">DESCRIZIONE blbalblabalblablablaablablbl</div> </div> </div> </li>';
    // }

    export function loadMarcheDisponibili() {
        $("#feMarca").children().remove();
        let marcheDisponibili = new Array<string>();
        $("#feMarca").append($("<option/>").text("All"));
        auto.map(function (car: Car) {
            if (marcheDisponibili.indexOf(car.marca) == -1) {
                marcheDisponibili.push(car.marca);
                $("#feMarca").append($("<option/>").text(car.marca));
            }
        });
    }

    export function loadModelliDisponibili() {
        $("#feModello").children().remove();
        $("#feModello").append($("<option/>").text("All"));
        let modelliDisponibili = new Array<string>();
        auto.map(function (car: Car) {
            let marcaSel = $("#feMarca").val() as string;
            if (car.marca == marcaSel) {
                if (modelliDisponibili.indexOf(car.modello) == -1) {
                    modelliDisponibili.push(car.modello);
                    $("#feModello").append($("<option/>").text(car.modello));
                }
            }
        });
    }

    export function searchCar(loadCar: boolean) {
        $("#listItems").children().animate({ opacity: 0 }, 50, "swing");
        let elementFound = new Array<Car>();
        let check: boolean = false;
        let marca = $('#feMarca').val() as string;
        let modello = $('#feModello').val() as string;
        let anno = $('#feAnno').val() as number;
        let prezzoStr = $('#fePrezzo').val() as string | number;
        let prezzo = prezzoStr == "All" || prezzoStr == null || prezzoStr == undefined ? Number.MAX_VALUE : prezzoStr as number;
        let carCount: number = 0;
        console.log(`prezzostr ${prezzoStr}\nprezzo ${prezzo}`);
        let carDummy = new Car(
            prezzo,
            CarCondition.KM0, 1, CarTrasmission.Automatico, 1, 1, 1, 1, "",
            marca,
            modello,
            anno,
            "", "", "", "", 1, 1, CarAlimentation.Benzina, EmissionClass.Euro0, ""
        );

        if (marca != "All") {
            auto.forEach(element => {
                if (element.marca == carDummy.marca &&
                    (modello == "All" || element.modello == carDummy.modello) &&
                    element.anno >= carDummy.anno &&
                    element.prezzo <= Number(carDummy.prezzo)) {
                    check = true;
                    elementFound.push(element);
                    carCount++;
                }
            });
        }

        // if (marca != "") {
        //     for (let i = 0; i < auto.length; i++) {
        //         if (auto[i].marca == marca) {
        //             check = true;
        //             elementFound.push(auto[i]);
        //             carCount++;
        //         }
        //     }
        // }

        // if (modello != "") {
        //     for (let i = 0; i < auto.length; i++) {
        //         if (auto[i].modello == modello) {
        //             if (elementFound.indexOf(auto[i]) != -1) {
        //                 check = true;
        //                 elementFound.push(auto[i]);
        //                 carCount++;
        //             }
        //         }
        //     }

        // }

        // if (anno != "") {
        //     for (let i = 0; i < auto.length; i++) {
        //         if (auto[i].anno == Number(anno)) {
        //             if (elementFound.indexOf(auto[i]) != -1) {
        //                 check = true;
        //                 elementFound.push(auto[i]);
        //                 carCount++;
        //             }
        //         }
        //     }
        // }

        // if (prezzo != "") {
        //     for (let i = 0; i < auto.length; i++) {
        //         if (auto[i].prezzo == Number(prezzo)) {
        //             if (elementFound.indexOf(auto[i]) != -1) {
        //                 check = true;
        //                 elementFound.push(auto[i]);
        //                 carCount++;//BRUM BRUM
        //             }
        //         }
        //     }
        // }

        if (!check) {
            carCount = auto.length;
            elementFound = auto;
        }

        $("#feButton").text(`${carCount} risultat${carCount == 1 ? "o" : "i"}`);
        var n: number = 0;
        if (loadCar) {

            $("#listItems").empty();
            elementFound.forEach(element => {
                createDiv(element, n);
                n++;
            });
        }
    }

    export function refreshContent() {
        $("#feButton").text(`${auto.length} risultat${auto.length == 1 ? "o" : "i"}`);
        loadMarcheDisponibili();
        loadModelliDisponibili();
        searchCar(true);
    }
}

// module PusherUtil {
//     export var pusher: Pusher.Pusher;
//     export var notifyChannel: Pusher.Channel;
//     export function loadPusher() {
//         // Enable pusher logging - don't include this in production
//         Pusher.logToConsole = true;

//         pusher = new Pusher('bfb73ca0e0400e32b1e9', {
//             cluster: 'eu',
//             forceTLS: true
//         });

//         notifyChannel = pusher.subscribe('notify-channel');

//         //Incoming events
//         notifyChannel.bind('json-updated', function (data) {
//             Frontend.loadjSON("veicoli.json");
//             Frontend.loadParameters();
//         });
//     }
// }

module LocalStorageUtil {
    export var jsonArrKey: string;
    export function initialize() {
        jsonArrKey = "jsonCarData";
        load();
    }

    export function load() {
        if (localStorage.length > 0) {
            auto = JSON.parse(localStorage.getItem(jsonArrKey) as string);
            Frontend.refreshContent();

        } else {
            Frontend.loadjSON("veicoli.json");
        }
    }

    export function save(data: any) {
        localStorage.setItem(jsonArrKey, JSON.stringify(data));
    }
}

$(document).ready(() => {

    // Frontend.loadjSON("veicoli.json");
    LocalStorageUtil.initialize(); //LOAD AND INITIALIZE LOCALSTORAGE
    // PusherUtil.loadPusher();

    $(".selezione").change(function () {
        Frontend.searchCar(true);
    })
    $("#feButton").click(function () {
        Frontend.searchCar(true);
    });

    //Populate combobox anno
    for (let index = 2019; index >= 1970; index--) {
        $("#feAnno").append($("<option/>").text(index));
    }

    //Populate combobox prezzo
    $("#fePrezzo").append($("<option/>").text("All"));
    for (let index = 500; index <= 100000; index += 100) {
        $("#fePrezzo").append($("<option/>").text(index));
    }

    // Bind all events
    $("#beinvia").on('click', Backend.processClick);
    $("#bemarca").on('change', BEUI.loadModelSelection);
    $("#feMarca").on('change', Frontend.loadModelliDisponibili);
});