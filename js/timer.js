window.onload = function(){
    document.getElementById("timer-start-button").onclick = function() {startTimer()};
    document.getElementById("timer-stop-button").onclick = function() {stopTimer()};
    document.getElementById("timer_time").style.color = "green";
    
    REDCOLORSECONDS = 15;
    ORANGECOLORSECONDS = 8;

    totalSeconds = 0;
    timesStopped = 0;
    time1 = "0h 0m 0s";
    time2 = "0h 0m 0s";
    time3 = "0h 0m 0s";
    time4 = "0h 0m 0s";
    time5 = "0h 0m 0s";

    myTimer = null;
    isSet = false;

    logs = new Array;
    formattedTime = new Array;

    //should be able to replace this with cookie itself
    if (returningUser = confirm("Have you used this previously? Press OK for Yes or Cancel for No.")){
        //user is returning
        timesStopped = getCookie("timesStopped");
        time1 = getCookie("time1");
        time2 = getCookie("time2");
        time3 = getCookie("time3");
        time4 = getCookie("time4");
        time5 = getCookie("time5");
        
        document.getElementById("time1").innerHTML = time1;
        document.getElementById("time2").innerHTML = time2;
        document.getElementById("time3").innerHTML = time3;
        document.getElementById("time4").innerHTML = time4;
        document.getElementById("time5").innerHTML = time5;
    } else{
        //first visit for user.
        document.getElementById("time1").innerHTML = time1;
        document.getElementById("time2").innerHTML = time2;
        document.getElementById("time3").innerHTML = time3;
        document.getElementById("time4").innerHTML = time4;
        document.getElementById("time5").innerHTML = time5;
    }
}

function startTimer(){
    //makes sure more intervals aren't created.
    if (isSet == true){
        alert("You have already started the timer. Press stop and then start if you want to start it again.");
    } else {
        myTimer = setInterval(setTimer, 1000);
    }
    isSet = true;
}

function stopTimer(){
    //makes sure invalid numbers aren't added to the array. (must have the timer started to stop it.)
    if (isSet == false){
        alert("The timer is already stopped.")
    } else {
        var earlierTime = "";
        timesStopped++;
        logs.push(totalSeconds);

        //needed in order to restart the timer correctly.
        totalSeconds = 0;
        
        //will purge the older saved time if it would be the 6th time.
        if (formattedTime.length >= 5){
            formattedTime.shift();
            formattedTime.push(getFormattedTime(logs));
        } else {
            formattedTime.push(getFormattedTime(logs));
        }
        
        clearInterval(myTimer);
        myTimer = null;

        //sets the last 5 times in the correct spots. top is most recent, bottom is least recent.
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
        else if (timesStopped >= 5 ){
            earlierTime = formattedTime[formattedTime.length-5];
            document.getElementById("time1").innerHTML = formattedTime[formattedTime.length-1];
            document.getElementById("time2").innerHTML = formattedTime[formattedTime.length-2];
            document.getElementById("time3").innerHTML = formattedTime[formattedTime.length-3];
            document.getElementById("time4").innerHTML = formattedTime[formattedTime.length-4];
            document.getElementById("time5").innerHTML = earlierTime;
        }

        //setting cookies here.
        setCookie("timesStopped", timesStopped, 30);
        setCookie("time1", document.getElementById("time1").innerHTML, 30);
        setCookie("time2", document.getElementById("time2").innerHTML, 30);
        setCookie("time3", document.getElementById("time3").innerHTML, 30);
        setCookie("time4", document.getElementById("time4").innerHTML, 30);
        setCookie("time5", document.getElementById("time5").innerHTML, 30);

        //resets the timer to 0h 0m 0s
        document.getElementById("timer_time").innerHTML = "0h 0m 0s";
        isSet = false;
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
    if (seconds >= REDCOLORSECONDS){
        document.getElementById("timer_time").style.color = "red";
    } else if (seconds >= ORANGECOLORSECONDS){
        document.getElementById("timer_time").style.color = "orange";
    } else {
        document.getElementById("timer_time").style.color = "green";
    }
}

function setCookie(cname,cvalue,exdays){
    var d = new Date(); //Create an date object
    d.setTime(d.getTime() + (exdays*1000*60*60*24)); //Set the time to exdays from the current date in milliseconds. 1000 milliseonds = 1 second
    var expires = "expires=" + d.toGMTString(); //Compose the expirartion date
    window.document.cookie = cname+"="+cvalue+"; "+expires;//Set the cookie with value and the expiration date
}

function getCookie(cname) {
    var name = cname + "="; //Create the cookie name variable with cookie name concatenate with = sign
    var cArr = window.document.cookie.split(';'); //Create cookie array by split the cookie by ';'
    console.log(cArr);
    //Loop through the cookies and return the cookie value if it finds the cookie name
    for(var i=0; i<cArr.length; i++) {
        var c = cArr[i].trim();
        //If the name is the cookie string at position 0, we found the cookie and return the cookie value
        if (c.indexOf(name) == 0) 
            return c.substring(name.length, c.length);
    }
     
    //If we get to this point, that means the cookie wasn't find in the look, we return an empty string.
    return "";
}