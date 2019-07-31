export function horodatage(date) {
    var post = new Date(date).getTime();
    var month = new Date(date).getMonth();
    var day = new Date(date).getDay();
    var year = new Date(date).getFullYear();
    var hour = new Date(date).getHours();
    var min = new Date(date).getMinutes();
    var atMoment = new Date().getTime();
    post /= 1000;
    atMoment /= 1000;
    var fior = parseInt((atMoment - post), 10);
    if (fior >= 86400) {
        if (parseInt((fior/86400), 10) == 1){

            return "Hier, " + hour + "H:"+ min +"min";
        }
        else{
            return "Le " + day +"-"+ month +"-"+ year +", "+ hour + "H:"+ min +"min";
        }
    }
    else if(fior >= 3600 && fior < 86400){
        if(parseInt((fior/3600), 10) == 1){
            return "il y a " + parseInt((fior/3600), 10) + " Hr";
        }
        else{
            return "il y a " + parseInt((fior/3600), 10) + " Hrs";
        }
    }
    else if(fior >= 60 && fior < 3600){
        if(parseInt((fior/60), 10) == 1)
            return "il y a " + parseInt((fior/60), 10) + " Min";
        else
            return "il y a " + parseInt((fior/60), 10) + " Mins";
    }
    else{
        if (fior == 0){
            return "A l'instant";
        }
        return "il y a " + fior + " Sec";
    }
}