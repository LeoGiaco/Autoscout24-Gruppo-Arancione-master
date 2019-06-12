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
            $("#create .modal-body").empty();
            $("#create .modal-body").append(html.slice(0,html.indexOf('<!')));
        });
    });

    $(document).on('click','.modify-show',function(e){
        var formData = new FormData();
        formData.append('num',tabella);
        formData.append('action','modify-show');
        formData.append('row-index',getChildIndex(e.target.parentNode.parentNode))

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
        
    $(".create-show").click(function(e){
        var formData = new FormData();
        formData.append('num',tabella);
        formData.append('action',"create-show");
        formData.append('tblname',$(e.target).html());
        formData.append('row',);

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

    function getChildIndex(child){
        var parent = child.parentNode;
        var children = parent.children;
        for (let i = children.length - 1; i >= 0; i--){
            if (child == children[i]){
                break;
            }
        }
        return i;
    };
})