const scrollTop = $(".nav").offset().top;
const bottom = $(".footer").offset().top;
const logo_width = $("#scroll-to-top svg:last-child").width();
let lowest_pos = $(".footer").height() + 10;
let left = $(".leftbar").width()/2 + 10 - logo_width/2;
let top_space = $(".nav").height() + 10;
$("#scroll-to-top").css("left", left+"px");
$("#scroll-to-top").css("bottom", lowest_pos+"px");
$("#share").css("top",top_space+"px");
$("#share").css("left",left+"px");


$(window).scroll(function(){
    var scroll = $(window).scrollTop();
    if(scroll > 500){
        $("#scroll-to-top").addClass("active");
        $("#share").addClass("deactive");
    }
    if(scroll <= 500){
        $("#scroll-to-top").removeClass("active");
        $("#share").removeClass("deactive");
    }
});
$(document).ready(function(){
    $("#scroll-to-top").click(function (){
        $('html, body').animate({
            scrollTop: scrollTop
        }, 400);
    });
})