$(()=>{
    $("button").click(function(){
        var formData = new FormData();
        formData.append('num',0);
        $.ajax({
            url: "bottone.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false
        });
    });
})