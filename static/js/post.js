var tag = "显示全部"

$(document).ready(function(){
    $("#textsearch").focus();

    $('div#tags').on('click', 'button',function(){
        tag = $(this).data("name")
        $(this).attr("class","btn btn-"+$(this).data("type"));
        $(this).siblings().each(function(){
            var type = $(this).data("type");
            $(this).attr("class", "btn btn-outline-"+type);
        });
        $('#textsearch').val("")
        displayContent("")
    });

    $('#textsearch').on('propertychange input', function (e) {
        var valueChanged = false;
        // 属性变化仅限值变化
        if (e.type=='propertychange') {
            valueChanged = e.originalEvent.propertyName=='value';
        } else {
            valueChanged = true;
        }
        if (valueChanged) {
            /* Code goes here */
            displayContent($(this).val().toLowerCase().trim())
        }
    });

  });


function displayContent(stext){
    // 文章 显示与否
    var yeardict =new Object();
    $('.article').each(function(){
        var labels = $(this).data("labels").split(";,");
        var year = $(this).data("year");
        var title = $(this).data("title").toLowerCase();
        
        if ((tag === "显示全部" || labels.indexOf(tag) >= 0) && (
            (stext === '' || title.search(stext) >= 0)
        )) {
            $(this).removeClass("d-none")
            yeardict[year] = 1;
        }else{
            $(this).addClass("d-none")
        }
    });

    // year 显示与否
    $('.year').each(function(){
        var curyear = $(this).data("year");
        if (yeardict.hasOwnProperty(curyear)){
            $(this).removeClass("d-none")
        }else{
            $(this).addClass("d-none")
        }
    });
};