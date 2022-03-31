

export const remainingDate = (milsec)=>{
    var seconds = milsec / 1000;
    console.log(seconds)
    if (seconds < 3600){
        var mins = Math.floor(seconds/60);
        return `${mins} minute${mins > 1 ? "s" : ""}`;
    }
    else if(seconds < 86400){
        var mins = Math.floor(seconds/60);
        seconds = seconds % 60
        var hours = Math.floor(mins/60);
        mins = mins%60;
        return `${hours} hours, ${mins} minutes`;
    }
    else{
        var mins = Math.floor(seconds/60);
        seconds = seconds % 60
        var hours = Math.floor(mins/60);
        mins = mins%60;
        var days = Math.floor(hours/24);
        hours = hours%24;
        return `${days} days, ${hours} hours, ${mins} minutes`;
    }


    
}