/**
    Author: Alexander Zhu
    Date Created: February 7, 2017
    Description: Scripts for browser action popup
*/

// Add listeners to html input forms and buttons.
document.addEventListener("DOMContentLoaded", function () {
    displayAlarms();
    var alarmInput = document.querySelector("#alarmInput");
    var alarmCancel = document.querySelector("#alarmCancel");
    var alarmCancelAll = document.getElementById("alarmCancelAll");
    if (!(alarmInput && alarmCancel && alarmCancelAll)) {
        alert("Error: Could not find button from popup.html!");
        return;
    }
    alarmInput.addEventListener("keydown", createAlarm);
    alarmCancel.addEventListener("keydown", cancelAlarm);
    alarmCancelAll.addEventListener("click", cancelAllAlarms);
});

// Create alarm if user enters a valid float. Triggered on enter keydown in 
// alarmInput form.
function createAlarm(e) {
    if (e.keyCode !== 13)
        return;
    input = document.getElementById("alarmInput").value;
    var duration = parseFloat(input);
    if (isNaN(duration))
        alert("Invalid time duration entered!");
    else {
        var name = "Alarm " + Date.now();  // Generate unique alarm name
        chrome.alarms.create(name, { delayInMinutes: duration });
        console.log("Alarm set. (" + duration + " minutes)");
    }
}

// Cancel a single alarm, given an id.
function cancelAlarm(e) {
    if (e.keyCode !== 13)
        return;
    id = document.getElementById("alarmCancel").value;
    chrome.alarms.getAll(function (alarms) {
        if (id <= 0 || alarms.length < id) {
            alert("Alarm " + id + " does not exist!");
            return;
        }
        chrome.alarms.clear(alarms[id - 1].name);
    });
}

// Cancel all existing alarms.
function cancelAllAlarms() {
    chrome.alarms.clearAll();
}

// Display remaining time for all existing alarms in popup body.
function displayAlarms() {
    setInterval(myTimer, 100);
    function myTimer() {
        chrome.alarms.getAll(function (alarms) {
            var output = "";
            if (!alarms.length)
                output = "No alarms set."
            else
                for (var i = 0; i < alarms.length; i++) {
                    var time_left = minutesLeft(alarms[i].scheduledTime);
                    output += "Alarm " + (i + 1) + " - " + time_left + " min remaining\n";
                }
            document.getElementById("time").innerHTML = output;
        });
    }
}

// Given an alarm's scheduledTime, return remaining time in string format.
function minutesLeft(scheduledTime) {
    var ms_left = scheduledTime - Date.now();
    var min = ms_left / 1000 / 60 << 0;
    var sec = ms_left / 1000 % 60 << 0;
    var separator = sec < 10 ? ":0" : ":";
    return min + separator + sec;
}
