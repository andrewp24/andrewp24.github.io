window.onload = function(){
    document.getElementById("timer-start-button").onclick = function() {startTimer()};
    document.getElementById("timer-stop-button").onclick = function() {stopTimer()};
    document.getElementById("delete-cookies-button").onclick = function() {deleteCookies()};
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
    
    //These two blocks get the cookies. If there the user doesn't have cookies then it will set them as the default value
    //The second block sets the array to what it should be from the cookies. 
    timesStopped = getCookie("timesStopped", 0);
    time1 = getCookie("time1", 1);
    time2 = getCookie("time2", 1);
    time3 = getCookie("time3", 1);
    time4 = getCookie("time4", 1);
    time5 = getCookie("time5", 1);
    
    document.getElementById("time1").innerHTML = time1;
    formattedTime[0] = time1;
    document.getElementById("time2").innerHTML = time2;
    formattedTime[1] = time2;
    document.getElementById("time3").innerHTML = time3;
    formattedTime[2] = time3;
    document.getElementById("time4").innerHTML = time4;
    formattedTime[3] = time4;
    document.getElementById("time5").innerHTML = time5;
    formattedTime[4] = time5;

    //will display alert if the user doesnt have cookies. 
    if (timesStopped == 0){
        alert("This page is using cookies to save your last 5 times.");
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

//creates the cookies. called after the user stops the timer.
function setCookie(cname,cvalue,exdays){
    var d = new Date(); //Create an date object
    d.setTime(d.getTime() + (exdays*1000*60*60*24)); //Set the time to exdays from the current date in milliseconds. 1000 milliseonds = 1 second
    var expires = "expires=" + d.toGMTString(); //Compose the expirartion date
    window.document.cookie = cname+"="+cvalue+"; "+expires;//Set the cookie with value and the expiration date
}

//gets the cookie data
function getCookie(cname,checker) {
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
    //If we get to this point, that means the cookie wasn't find in the look, we return an empty string. if checker is 0 we are looking at timesStopped.
    if (checker == 0){
        return "0";
    } else {
        return "0h 0m 0s";
    }
}

//deletes the set cookies.
function deleteCookies(){
    var d = new Date(); //Create an date object
    d.setTime(d.getTime() - (1000*60*60*24)); //Set the time to the past. 1000 milliseonds = 1 second
    var expires = "expires=" + d.toGMTString(); //Compose the expiration date
    window.document.cookie = "timesStopped"+"="+"; "+expires;//Set the cookie with name and the expiration date
    window.document.cookie = "time1"+"="+"; "+expires;//Set the cookie with name and the expiration date
    window.document.cookie = "time2"+"="+"; "+expires;//Set the cookie with name and the expiration date
    window.document.cookie = "time3"+"="+"; "+expires;//Set the cookie with name and the expiration date
    window.document.cookie = "time4"+"="+"; "+expires;//Set the cookie with name and the expiration date
    window.document.cookie = "time5"+"="+"; "+expires;//Set the cookie with name and the expiration date
    window.location.reload();
}