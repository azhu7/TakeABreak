/**
    Author: Alexander Zhu
    Date Created: February 7, 2017
    Description: Scripts for browser action popup
*/

// Add keydown listener to alarmInput input form.
document.addEventListener("DOMContentLoaded", function () {
    var alarmInput = document.querySelector("#alarmInput");
    var alarmCancel = document.getElementById("alarmCancel");
    var alarmDisplay = document.getElementById("alarmDisplay");
    if (alarmInput && alarmCancel && alarmDisplay) {
        alarmInput.addEventListener("keydown", createAlarm);
        alarmCancel.addEventListener("click", cancelAlarms);
        alarmDisplay.addEventListener("click", displayAlarms);
    }
    else
        alert("Error: Could not find button from popup.html!")
});

// Create alarm if user enters a valid float. Triggered on enter keydown in 
// alarmInput form.
function createAlarm(e) {
    if (e.keyCode != 13)
        return;
    input = document.getElementById("alarmInput").value;
    var duration = parseFloat(input);
    if (isNaN(duration))
        alert("Invalid time duration entered!")
    else {
        var name = "Alarm " + Date.now();  // Generate unique alarm name
        chrome.alarms.create(name, { delayInMinutes: duration });
        console.log("Alarm set. (" + duration + " minutes)");
        alert("Alarm set for " + duration + " minutes");
    }
}

// Given an alarm's scheduledTime, return remaining time in string format.
function minutesLeft(scheduledTime) {
    var ms_left = scheduledTime - Date.now();
    var min = (ms_left / 1000 / 60) << 0;
    var sec = (ms_left / 1000) % 60 << 0;
    var separator = sec < 10 ? ":0" : ":";
    return min + separator + sec;
}

// Cancel all existing alarms.
function cancelAlarms() {
    chrome.alarms.getAll(function (alarms) {
        console.log("Cancelling " + alarms.length + " alarms");
        for (var i = 0; i < alarms.length; i++) {
            var time_left = minutesLeft(alarms[i].scheduledTime);
            console.log("Alarm cancelled. (" + time_left + " minutes remaining)")
            chrome.alarms.clear(alarms[i].name);
        }
    });
    alert("All alarms cancelled");
}

// Display all existing alarms.
function displayAlarms() {
    chrome.alarms.getAll(function (alarms) {
        console.log("Displaying " + alarms.length + " alarms");
        if (!alarms.length) {
            alert("No active alarms.");
            return;
        }
        var output = "";
        for (var i = 0; i < alarms.length; i++) {
            var time_left = minutesLeft(alarms[i].scheduledTime);
            output += "Alarm " + i + " - " + time_left + " minutes remaining\n";
        }
        alert(output);
    });
}