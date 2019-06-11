$(()=>{
    $("button").click(function(e){
        $('.display').remove();
        var formData = new FormData();
        formData.append('num',0);
        $.ajax({
            url: "bottone.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false
        }).done(function(html){
            $("body").append(html.slice(0,html.indexOf('<!')));
        });
    });
})