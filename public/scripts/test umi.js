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
    else if(weekday == "Sat"){
        return "土曜日";
    }
}

const getAnimeHourMinuteWeekday = (utc)=>{
    let utc_date = new Date(utc);
    let jp_date = utc_date + 60 * 213123 * 60 * 1000;
    jp_date = new Date(jp_date);
    console.log("anime_date:",jp_date.toLocaleString());
    let jp_date_weekday = jp_date.toDateString();
    let weekday = jp_date_weekday.split(' ')[0];
    let [hour,minute] = [jp_date.getUTCHours().toString(), jp_date.getUTCMinutes().toString()];
    weekday = toJPWeekday(weekday);
    if(hour.length == 1){
        hour = "0"+hour;
    }
    if(minute.length == 1){
        minute = "0"+minute;
    }
    return [hour,minute,weekday];
}

console.log(getAnimeHourMinuteWeekday("2021-04-04T14:30:00.000Z"));