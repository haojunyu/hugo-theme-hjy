$(document).ready(function(){
    $('div#tags').on('click', 'button',function(){
        alert($(this).text());
        $(this).siblings().each(function(){
            console.log($(this).text());
        });
    });
    // $("#tags button").click(function(){
    //   alert($(this).text())
    // });

  });
