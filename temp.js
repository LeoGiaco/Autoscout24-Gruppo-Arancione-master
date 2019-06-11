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

    $(".modify").click(function(e){
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
            $("ul").empty();
            $("ul").append(html.slice(0,html.indexOf('<!')));
        });
    });
        
    $(".create").click(function(e){
        var formData = new FormData();
        formData.append('num',tabella);
        formData.append('action',"create");
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
        
    $(".delete").click(function(e){
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