$(()=>{
    $(".tblbutton").click(function(e){
        $('.display').remove();
        var formData = new FormData();
        formData.append('num',$(e.target).val());
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
})