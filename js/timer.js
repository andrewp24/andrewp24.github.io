window.onload = function(){
    document.getElementById("timer-start-button").onclick = function() {startTimer()};
    document.getElementById("timer-stop-button").onclick = function() {stopTimer()};
    document.getElementById("timer_time").style.color = "green";
    totalSeconds = 0;
    timesStopped = 0;
    logs = new Array;
    formattedTime = new Array;

}

function startTimer(){
    myTimer = setInterval(setTimer, 1000); 
}

function stopTimer(){
    var earlierTime = "";
    timesStopped++;
    logs.push(totalSeconds);

    formattedTime.push(getFormattedTime(logs));
    
    clearInterval(myTimer);
    //console.log(formattedTime);
    
    if (timesStopped == 1){
        document.getElementById("time1").innerHTML = formattedTime;
    }
    if (timesStopped == 2 ){
        earlierTime = formattedTime[formattedTime.length-2];
        document.getElementById("time1").innerHTML = formattedTime[formattedTime.length-1];
        document.getElementById("time2").innerHTML = earlierTime;
    }
    else if (timesStopped == 3 ){
        earlierTime = formattedTime[formattedTime.length-3];
        document.getElementById("time1").innerHTML = formattedTime[formattedTime.length-1];
        document.getElementById("time2").innerHTML = formattedTime[formattedTime.length-2];
        document.getElementById("time3").innerHTML = earlierTime;
    }
    else if (timesStopped == 4 ){
        earlierTime = formattedTime[formattedTime.length-4];
        document.getElementById("time1").innerHTML = formattedTime[formattedTime.length-1];
        document.getElementById("time2").innerHTML = formattedTime[formattedTime.length-2];
        document.getElementById("time3").innerHTML = formattedTime[formattedTime.length-3];
        document.getElementById("time4").innerHTML = earlierTime;
    }
    else if (timesStopped == 5 ){
        earlierTime = formattedTime[formattedTime.length-5];
        earlierTime = formattedTime[formattedTime.length-4];
        document.getElementById("time1").innerHTML = formattedTime[formattedTime.length-1];
        document.getElementById("time2").innerHTML = formattedTime[formattedTime.length-2];
        document.getElementById("time3").innerHTML = formattedTime[formattedTime.length-3];
        document.getElementById("time4").innerHTML = formattedTime[formattedTime.length-4];
        document.getElementById("time5").innerHTML = earlierTime;
    }
}

function setTimer(){
    totalSeconds++;
    var hour = Math.floor(totalSeconds/3600);
    var minute = Math.floor((totalSeconds - hour*3600)/60);
    var seconds = totalSeconds - (hour*3600 + minute*60);

    document.getElementById("timer_time").innerHTML = hour + "h " + minute + "m " + seconds + "s";
    setTextColor(seconds);
}

function getFormattedTime(logs){
    var newestTime = logs[logs.length-1];
    var hour = Math.floor(newestTime/3600);
    var minute = Math.floor((newestTime - hour*3600)/60);
    var seconds = newestTime - (hour*3600 + minute*60);
    var formattedTime = hour + "h " + minute + "m " + seconds + "s";
    return formattedTime;
}

function setTextColor(seconds){
    //console.log("in setTextColor")
    //console.log(seconds);
    if (seconds >= 10){
        document.getElementById("timer_time").style.color = "red";
    } else if (seconds >= 5){
        document.getElementById("timer_time").style.color = "orange";
    }
}