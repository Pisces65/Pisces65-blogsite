const toJPWeekday = (eng)=>{
    if(eng == "Sun"){
        return "日曜日";
    }else if(eng == "Mon"){
        return"月曜日";
    }
    else if(eng == "Tue"){
        return "火曜日";
    }
    else if(eng == "Wed"){
        return "水曜日";
    }
    else if(eng == "Thu"){
        return "木曜日";
    }
    else if(eng == "Fri"){
        return "金曜日";
    }
    else if(eng == "Sat"){
        return "土曜日";
    }
}
const UTCtoCN = (dateString)=>{
    let d = new Date(dateString);
    let localTime = d.getTime();
    let localOffset = d.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;
    let offset = 8;
    let calctime = utc + (3600000*offset);
    let cn = new Date(calctime);
    let weekday = cn.toDateString().split(' ')[0];
    weekday = toJPWeekday(weekday)
    let [year,month,day,hour,minute] = [cn.getFullYear().toString(), cn.getMonth().toString(), cn.getDate().toString(),cn.getHours().toString(),cn.getMinutes().toString()];
    if(hour.length == 1){
        hour = "0"+hour;
    }
    if(minute.length == 1){
        minute = "0"+minute;
    }
    return [year,month,day,weekday,hour,minute]
}
let today = UTCtoCN(Date.now());
let today_string = today.slice(0,3);
today_string = today_string.join('.');

$(document).ready(function(){
    let reversed = false;
    let isJP = true;
    let date =$("div.time div:first-child p");
    let weekday =$("div.time div:nth-child(2) p");
    date.text(today_string);
    weekday.text(today[3]);
    let anime_items = [];
    let animeCalendar = $('.anime-calendar');
    $.getJSON("public/bangumi-data/04.json", (bangumidata)=>{
        //find
        bangumidata.forEach(item => {
            anime_date = UTCtoCN(item.begin);
            if(anime_date[3] == today[3]){
                item.daytime = anime_date[4]+":"+anime_date[5];
                anime_items.push(item);
            };
        });
        //sort
        anime_items.sort(function(a, b) {
            var daytimeA = a.daytime;
            var daytimeB = b.daytime;
            if (daytimeA < daytimeB) {
              return -1;
            }
            if (daytimeA > daytimeB) {
              return 1;
            }
            return 0;
        });
        anime_items.forEach(item => {
        let singleAnime = $("<div class='anime-item'><div><p class='jp'>"+item.daytime+"</p></div><div><a href='"+item.officialSite+"' target='_blank'><p class='jp'>"+item.title+"</p></a></div></div>");
        animeCalendar.append(singleAnime);
        reversed = false;
        isJP = true;
        });
    });
    
    $("#anime-sort").click(function(){
        $('#anime-sort').toggleClass('img-down img-up');
        if($('#anime-sort').hasClass('img-down')){
            $(".anime-item").remove();
            if(isJP){
                anime_items.forEach(item => {
                    let singleAnime = $("<div class='anime-item'><div><p class='jp'>"+item.daytime+"</p></div><div><a href='"+item.officialSite+"' target='_blank'><p class='jp'>"+item.title+"</p></a></div></div>");
                    animeCalendar.append(singleAnime);
                });
                reversed = false;
                console.log("reversed:",reversed);
            }else{
                anime_items.forEach(item => {
                    let singleAnime = $("<div class='anime-item'><div><p class='zh'>"+item.daytime+"</p></div><div><a href='"+item.officialSite+"' target='_blank'><p class='jp'>"+item.titleTranslate["zh-Hans"][0]+"</p></a></div></div>");
                    animeCalendar.append(singleAnime);
                });
                reversed = false;
                console.log("reversed:",reversed);
            }
        }
        if($('#anime-sort').hasClass('img-up')){
            $(".anime-item").remove();
            if(isJP){
                for(let i = anime_items.length-1;i >=0;i--){
                    let singleAnime = $("<div class='anime-item'><div><p class='jp'>"+anime_items[i].daytime+"</p></div><div><a href='"+anime_items[i].officialSite+"' target='_blank'><p class='jp'>"+anime_items[i].title+"</p></a></div></div>");
                    animeCalendar.append(singleAnime);
                }
                reversed = true;
                console.log("reversed:",reversed)
            }else{
                for(let i = anime_items.length-1;i >=0;i--){
                    let singleAnime = $("<div class='anime-item'><div><p class='zh'>"+anime_items[i].daytime+"</p></div><div><a href='"+anime_items[i].officialSite+"' target='_blank'><p class='jp'>"+anime_items[i].titleTranslate["zh-Hans"][0]+"</p></a></div></div>");
                    animeCalendar.append(singleAnime);
                }
                reversed = true;
                console.log("reversed:",reversed)
            }
        }
    })

    $("#anime-toggle-name").click(function(){
        $("#anime-toggle-name").toggleClass("active");
        isJP = !isJP;
        if(reversed){
            if(isJP){
                for(let i=0;i<anime_items.length;i++){
                    let anime_single_name = $(".anime-item:nth-child("+(i+3).toString()+") a p");
                    let anime_bangumi_name = anime_items[anime_items.length-1-i].title;
                    if(anime_bangumi_name){
                        anime_single_name.text(anime_bangumi_name)
                        anime_single_name.toggleClass("jp zh");
                    }
                }
            }else{
                for(let i=0;i<anime_items.length;i++){
                    let anime_single_name = $(".anime-item:nth-child("+(i+3).toString()+") a p");
                    let anime_bangumi_name = anime_items[anime_items.length-1-i].titleTranslate["zh-Hans"][0];
                    if(anime_bangumi_name){
                        anime_single_name.text(anime_bangumi_name);
                        anime_single_name.toggleClass("jp zh");
                    }
                }
            }
        }else{
            if(isJP){
                for(let i=0;i<anime_items.length;i++){
                    let anime_single_name = $(".anime-item:nth-child("+(i+3).toString()+") a p");
                    let anime_bangumi_name = anime_items[i].title;
                    if(anime_bangumi_name){
                        anime_single_name.text(anime_bangumi_name);
                        anime_single_name.toggleClass("jp zh");
                    }
                }
            }else{
                for(let i=0;i<anime_items.length;i++){
                    let anime_single_name = $(".anime-item:nth-child("+(i+3).toString()+") a p");
                    let anime_bangumi_name = anime_items[i].titleTranslate["zh-Hans"][0];
                    if(anime_bangumi_name){
                        anime_single_name.text(anime_bangumi_name);
                        anime_single_name.toggleClass("jp zh");
                    }
                }
            }
        }
    })
    
});