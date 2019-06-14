var tabella;
var selezione;

$(()=>{

    $(".create-show").hide();

    $(".tblbutton").click(function(e){

        $(".create-show").show();

        $('.display').remove();
        var formData = new FormData();
        formData.append('num',$(e.target).val());

        tabella = $(e.target).val();

        $.ajax({
            url: "bottone.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false
        }).done(function(html){
            $(".ex2").empty();
            $(".ex2").append(html.slice(0,html.indexOf('<!')));
        });
    });

    $(".create-show").click(function(e){
        var formData = new FormData();
        formData.append('num',tabella);
        formData.append('action',"getall");
        selezione = getChildIndex($(e.target).parentsUntil("tbody").last());

        $.ajax({
            url: "bottone.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false
        }).done(function(html){
            $("#create .modal-body").empty();
            $("#create .modal-body").append(html.slice(0,html.indexOf('<!')));
        });
    });

    $(document).on('click','.modify-show',function(e){
        var formData = new FormData();
        formData.append('num',tabella);
        formData.append('action','modify-show');
        selezione = getChildIndex($(e.target).parentsUntil("tbody").last());
        formData.append('row-index',selezione)

        $.ajax({
            url: "bottone.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false
        }).done(function(html){
            $("#modify .modal-body").empty();
            $("#modify .modal-body").append(html.slice(0,html.indexOf('<!')));
        });
    });

    $(".modify").click(function(e){
        var formData = new FormData();
        formData.append('num',tabella);
        formData.append('action','modify');
        formData.append('row-index',selezione)

        // Crea array di valori presi dagli input.
        var a = [];
        var ajax = true;
        $($("#modify .modal-body .row").each(function(elem)
        {
            let val = $($(this).children().get(1)).val().trim();
            if(val != '')
                a.push("'"+val+"'");
            else
            {
                alert("Valore vuoto!");
                ajax = false;
                return;
            }
        }));

        if(!ajax)
            return;

        // Passa array a formData.
        formData.append('values',a);

        $.ajax({
            url: "bottone.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false
        }).done(function(html){
            $(".ex2").empty();
            $(".ex2").append(html.slice(0,html.indexOf('<!')));
            alert("Modifica Avvenuta con Successo");
        });
    });
    
    $(".create").click(function(e){
        var formData = new FormData();
        formData.append('num',tabella);
        formData.append('action',"create");
        formData.append('tblname',$(e.target).html());
        formData.append('row-index',selezione)

        // Crea array di valori presi dagli input.
        var a = [];
        var ajax = true;
        $($("#create .modal-body .row").each(function(elem)
        {
            let child = $($(this).children().get(1));
            if(!child.prop('readonly'))
            {
                let val = child.val().trim();
                if(val != '')
                    a.push("'"+val+"'");
                else
                {
                    alert("Valore vuoto!");
                    ajax = false;
                    return;
                }
            }
        }));

        if(!ajax)
            return;

        // Passa array a formData.
        formData.append('values',a);

        $.ajax({
            url: "bottone.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false
        }).done(function(html){
            $(".ex2").empty();
            $(".ex2").append(html.slice(0,html.indexOf('<!')));7
            alert("Creazione Avvenuta con Successo");
        });
    });
        
    $(document).on('click','.delete-click',function(e){
        selezione = getChildIndex($(e.target).parentsUntil("tbody").last());
    });

    $(".delete").click(function(e){
        var formData = new FormData();
        formData.append('num',tabella);
        formData.append('action',"delete");
        formData.append('row-index',selezione);

        $.ajax({
            url: "bottone.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false
        }).done(function(html){
            $(".ex2").empty();
            $(".ex2").append(html.slice(0,html.indexOf('<!')));
            alert("Eliminazione Avvenuta con Successo");
        });
    });

    function getChildIndex(child){
        var parent = child.parent();
        var children = parent.children();
        for (let i = 0; i < children.length; i++)
            if (child[0] == children[i])
                return i;
    };
})