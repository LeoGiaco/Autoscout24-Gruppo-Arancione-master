var tabella;

$(()=>{
    $(".tblbutton").click(function(e){
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
            $("#create .modal-body").remove();
            $("#create .modal-content").append(html.slice(0,html.indexOf('<!')));
        });
    });

    $(document).on('click','.modify',function(e){
        var formData = new FormData();
        formData.append('num',tabella);
        formData.append('action',"modify");

        $.ajax({
            url: "bottone.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false
        }).done(function(html){
            $("#modify .modal-body").remove();
            $("#modify .modal-content").append(html.slice(0,html.indexOf('<!')));
        });
    });
        
    $(".create").click(function(e){
        var formData = new FormData();
        formData.append('num',tabella);
        formData.append('action',"create");
        formData.append('tblname',$(e.target).html());

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
        
    $(document).on('click','.delete',function(e){
        var formData = new FormData();
        formData.append('num',tabella);
        formData.append('action',"delete");

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
})