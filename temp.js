var tabella;
var selezione;

$(()=>{

    $(".btnnuovo").prop("disabled",true);


    $(".tblbutton").click(function(e){

        $(".btnnuovo").prop("disabled",false);

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

    $(".btnnuovo").click(function(e){
        var formData = new FormData();
        formData.append('num',tabella);
        formData.append('action',"getall");

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

        // Crea array di valori presi dagli input.
        // Passa array a formData.

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
        $($("table tbody").get(selezione)).children().each(function(elem)
        {
            a.push($(this).html());
        });
        // Passa array a formData.
        formData.append('values',a);

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
    
    $(".create").click(function(e){
        var formData = new FormData();
        formData.append('num',tabella);
        formData.append('action',"create");
        formData.append('tblname',$(e.target).html());
        formData.append('row',);

        // Crea array di valori presi dagli input.
        // Passa array a formData.

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