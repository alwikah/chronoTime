// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

var nbSec = 0;
var interval = 1000;
var safetyPreviousSecondes = nbSec;
var myVar;
var started = false;

var startTimer = function(el){
    if(!started){
        myVar=setInterval(updateTimer,interval);
        started = true;
        $(el).attr("src", "/assets/pause.png");
        $(el).attr("onclick", "stopTimer(this)");
    }
};

var updateTimer = function(){
    nbSec++;
    $("#time").attr("value", nbSec);
    displayTime();
};

var stopTimer = function(el){
    if(myVar != null){
        clearInterval(myVar);
        started = false;
        $(el).attr("src", "/assets/start.png");
        $(el).attr("onclick", "startTimer(this)");
    }
};

var resetTimer = function(){
    stopTimer();
    safetyPreviousSecondes = nbSec;
    nbSec = 0;
    displayTime();
    $("#previousTime").show();
    $("#previousTime").text("Annuler reset et retourner à "+fromTimeToString(safetyPreviousSecondes));
};

var getPreviousTimeBack = function(){
    stopTimer();
    nbSec = safetyPreviousSecondes;
    displayTime();
    $("#previousTime").hide();
}

// ======================================================
// ============ Tools for displaying time ===============
// ======================================================

var displayTime = function(){
    $("#timer_display").text(fromTimeToString(nbSec));
    return null;
};

var fromTimeToString = function(sec_number){
    var secondes, minutes, hours;
    var result1, result2;
    var min;

    result1 = result(sec_number);

    // Init for secondes
    secondes = result1[0];
    min = result1[1];

    result2 = result(min);

    // Init for minutes and hours
    minutes = result2[0];
    hours = result2[1];

    return timeUnitsToString(secondes, minutes, hours)
};

var result = function(t){
    if(t > 59){
        return [t%60, (t - t%60)/60];
    }
    else{
        return [t, 0];
    }
};

var timeUnitsToString = function(s, m, h){
    return timeUnitToString(h) + ':' + timeUnitToString(m) + ':' + timeUnitToString(s);
};

var timeUnitToString = function(t){
    if(t<10){
        return '0'+t.toString();
    }
    else{
        return t.toString();
    }
};

// ===========================================================
// ================= TESTS PURPOSE FUNCTIONS =================
// ===========================================================

var test = function(){
    var val = $("#testInput").val();
    $("#testResult").text(displayTime(val));
    $("#details").text(displayDetails(val));

};

var displayDetails = function(nbSec){
    var result = "";
    var temp = nbSec;

    if(temp > 59){
        var s = temp%60;
        temp = (temp - s)/60;
        result += "temp%60 = "+ s.toString() + ", remaining secondes : " + (nbSec-s).toString() + " which should correspond to " + temp.toString()+ " minutes  ";

        if(temp > 59){
            var nbMin = temp;
            var m = temp%60;
            temp = (temp-m)/60;
            result += "temp%60 = "+ m.toString() + ", remaining minutes : " + (nbMin-m).toString() + " which should correspond to " + temp.toString()+ " hours\n\n";
        }
        else{
            result += "Less than 60 minutes : easy => " + temp.toString();
        }

    }
    else{
        result = "temp is less than 60 : easy => "+ temp.toString();
    }
    return result;
}
