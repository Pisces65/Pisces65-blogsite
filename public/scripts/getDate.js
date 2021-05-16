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
    let date =$("div.time div:first-child p");
    let weekday =$("div.time div:last-child p");
    date.text(today_string);
    weekday.text(today[3]);
    let anime_items = [];
    $.getJSON("public/bangumi-data/04.json", (bangumidata)=>{
        let animeCalendar = $('.anime-calendar');
        //find
        bangumidata.forEach(item => {
            anime_date = UTCtoCN(item.begin);
            if(anime_date[3] == today[3]){
                item.daytime = anime_date[4]+":"+anime_date[5];
                // let singleAnime = $("<div class='anime-item'><div><p class='jp'>"+anime_date[4]+":"+anime_date[5]+"</p></div><div><a href='"+item.officialSite+"' target='_blank'><p class='jp'>"+item.title+"</p></a></div></div>");
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
        });
    })
    
});