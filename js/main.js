"use strict";
//https://www.w3schools.com/jsref/dom_obj_event.asp
var auto = new Array();
var Backend;
(function (Backend) {
    // export var debugArr = new Array<Car>();
    function processClick(e) {
        e.preventDefault();
        var car = fetchCar();
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
    Backend.processClick = processClick;
    function fetchCar() {
        var prezzo = $("#beprezzo").val();
        var conditionval = $("#becondizione").val();
        var condition = conditionval == "Usato" ? CarCondition.Usato : conditionval == "Nuovo" ? CarCondition.Nuovo : CarCondition.KM0;
        var proprietari = Number($("#beproprietari").val());
        //Motore e trazione
        var cambioval = $("#becambio").val();
        var cambio = cambioval == "Manuale" ? CarTrasmission.Manuale : CarTrasmission.Automatico;
        var marce = Number($("#bemarce").val());
        var cilindrata = Number($("#becilindrata").val());
        var cilindri = Number($("#becilindri").val());
        var peso = Number($("#bepeso").val());
        var trazione = $("#betrazione").val();
        //Caratteristiche
        var marca = $("#bemarca").val();
        var modello = $("#bemodello" + marca).val();
        var anno = (new Date($("#beanno").val())).getFullYear();
        var colore = $("#becolore").val();
        var tipoVernice = $("#betipoVernice").val();
        var rivestimenti = $("#berivestimento").val();
        var carrozzeria = $("#becarrozzeria").val();
        var porte = $("#beporte").val();
        var posti = $("#beposti").val();
        //Ambiente
        var alimentazioneval = $("#bealimentazione").val();
        var alimentazione = alimentazioneval == "Benzina" ? CarAlimentation.Benzina :
            alimentazioneval == "Diesel" ? CarAlimentation.Diesel :
                alimentazioneval == "GPL" ? CarAlimentation.GPL :
                    alimentazioneval == "Metano" ? CarAlimentation.Metano : CarAlimentation.Elettrica;
        var classeEmissionival = $("#beemissioni").val();
        var classeEmissioni = classeEmissionival == "Euro 0" ? EmissionClass.Euro0 :
            classeEmissionival == "Euro 1" ? EmissionClass.Euro1 :
                classeEmissionival == "Euro 2" ? EmissionClass.Euro2 :
                    classeEmissionival == "Euro 3" ? EmissionClass.Euro3 :
                        classeEmissionival == "Euro 4" ? EmissionClass.Euro4 : EmissionClass.Euro5;
        var optional = $("#betextarea").val();
        return new Car(prezzo, condition, proprietari, cambio, marce, cilindrata, cilindri, peso, trazione, marca, modello, anno, colore, tipoVernice, rivestimenti, carrozzeria, porte, posti, alimentazione, classeEmissioni, optional);
    }
    Backend.fetchCar = fetchCar;
})(Backend || (Backend = {}));
var BEUI;
(function (BEUI) {
    function loadModelSelection() {
        var marcaSel = $("#bemarca").val();
        $(".selModel").attr("hidden", "hidden");
        $("#bemodello" + marcaSel).removeAttr("hidden");
    }
    BEUI.loadModelSelection = loadModelSelection;
})(BEUI || (BEUI = {}));
var Frontend;
(function (Frontend) {
    // export var marche = new Array<string>();
    // export var modelli = new Array<string>();
    function loadjSON(path) {
        $.getJSON(path).done(function (data) {
            $.each(data, function (key, elem) {
                auto.push(elem);
            });
            Frontend.refreshContent();
        });
    }
    Frontend.loadjSON = loadjSON;
    function createDiv(temp, n) {
        var clone = $("#listTemplate").clone();
        clone.removeAttr("hidden");
        clone.css("opacity", 0);
        clone.find(".li-marca").text(temp.marca);
        clone.end();
        clone.find(".li-modello").text(temp.modello);
        clone.end();
        clone.find(".li-prezzo").text("\u20AC" + temp.prezzo);
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
    Frontend.createDiv = createDiv;
    // export function str(n: number) {
    //     return '<li class="media form-card"> <div class="col-md-3"> <img id="img_' + n + '" src="001.jpg" class="img-thumbnail rounded" alt="img"> </div> <div class="col-md-9"> <div id="modello_' + n + '"class="row">modello </div> <div class="row"> <div class="col-md-3"> <div id="prezzo_' + n + '" class="row">PREZZO</div> </div> <div class="col-md-9" id="descrizione_' + n + '">DESCRIZIONE blbalblabalblablablaablablbl</div> </div> </div> </li>';
    // }
    function loadMarcheDisponibili() {
        $("#feMarca").children().remove();
        var marcheDisponibili = new Array();
        $("#feMarca").append($("<option/>").text("All"));
        auto.map(function (car) {
            if (marcheDisponibili.indexOf(car.marca) == -1) {
                marcheDisponibili.push(car.marca);
                $("#feMarca").append($("<option/>").text(car.marca));
            }
        });
    }
    Frontend.loadMarcheDisponibili = loadMarcheDisponibili;
    function loadModelliDisponibili() {
        $("#feModello").children().remove();
        $("#feModello").append($("<option/>").text("All"));
        var modelliDisponibili = new Array();
        auto.map(function (car) {
            var marcaSel = $("#feMarca").val();
            if (car.marca == marcaSel) {
                if (modelliDisponibili.indexOf(car.modello) == -1) {
                    modelliDisponibili.push(car.modello);
                    $("#feModello").append($("<option/>").text(car.modello));
                }
            }
        });
    }
    Frontend.loadModelliDisponibili = loadModelliDisponibili;
    function searchCar(loadCar) {
        $("#listItems").children().animate({ opacity: 0 }, 50, "swing");
        var elementFound = new Array();
        var check = false;
        var marca = $('#feMarca').val();
        var modello = $('#feModello').val();
        var anno = $('#feAnno').val();
        var prezzoStr = $('#fePrezzo').val();
        var prezzo = prezzoStr == "All" || prezzoStr == null || prezzoStr == undefined ? Number.MAX_VALUE : prezzoStr;
        var carCount = 0;
        console.log("prezzostr " + prezzoStr + "\nprezzo " + prezzo);
        var carDummy = new Car(prezzo, CarCondition.KM0, 1, CarTrasmission.Automatico, 1, 1, 1, 1, "", marca, modello, anno, "", "", "", "", 1, 1, CarAlimentation.Benzina, EmissionClass.Euro0, "");
        if (marca != "All") {
            auto.forEach(function (element) {
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
        $("#feButton").text(carCount + " risultat" + (carCount == 1 ? "o" : "i"));
        var n = 0;
        if (loadCar) {
            $("#listItems").empty();
            elementFound.forEach(function (element) {
                createDiv(element, n);
                n++;
            });
        }
    }
    Frontend.searchCar = searchCar;
    function refreshContent() {
        $("#feButton").text(auto.length + " risultat" + (auto.length == 1 ? "o" : "i"));
        loadMarcheDisponibili();
        loadModelliDisponibili();
        searchCar(true);
    }
    Frontend.refreshContent = refreshContent;
})(Frontend || (Frontend = {}));
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
var LocalStorageUtil;
(function (LocalStorageUtil) {
    function initialize() {
        LocalStorageUtil.jsonArrKey = "jsonCarData";
        load();
    }
    LocalStorageUtil.initialize = initialize;
    function load() {
        if (localStorage.length > 0) {
            auto = JSON.parse(localStorage.getItem(LocalStorageUtil.jsonArrKey));
            Frontend.refreshContent();
        }
        else {
            Frontend.loadjSON("veicoli.json");
        }
    }
    LocalStorageUtil.load = load;
    function save(data) {
        localStorage.setItem(LocalStorageUtil.jsonArrKey, JSON.stringify(data));
    }
    LocalStorageUtil.save = save;
})(LocalStorageUtil || (LocalStorageUtil = {}));
$(document).ready(function () {
    // Frontend.loadjSON("veicoli.json");
    LocalStorageUtil.initialize(); //LOAD AND INITIALIZE LOCALSTORAGE
    // PusherUtil.loadPusher();
    $(".selezione").change(function () {
        Frontend.searchCar(true);
    });
    $("#feButton").click(function () {
        Frontend.searchCar(true);
    });
    //Populate combobox anno
    for (var index = 2019; index >= 1970; index--) {
        $("#feAnno").append($("<option/>").text(index));
    }
    //Populate combobox prezzo
    $("#fePrezzo").append($("<option/>").text("All"));
    for (var index = 500; index <= 100000; index += 100) {
        $("#fePrezzo").append($("<option/>").text(index));
    }
    // Bind all events
    $("#beinvia").on('click', Backend.processClick);
    $("#bemarca").on('change', BEUI.loadModelSelection);
    $("#feMarca").on('change', Frontend.loadModelliDisponibili);
});
//# sourceMappingURL=main.js.map