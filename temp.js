$(()=>{
    $("button").click(function(){
        var formData = new FormData();
        formData.append('num',0);
        $.ajax({
            url: "database.php",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false
        });
    });
})