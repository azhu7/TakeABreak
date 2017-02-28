// Add keydown listener to alarmInput input form.
document.addEventListener('DOMContentLoaded', function () {
    var alarmInput = document.querySelector("#alarmInput");
    if (alarmInput)
        alarmInput.addEventListener('keydown', userCreateAlarm);
    else
        alert("Error: Could not find alarmInput input form!")
});

// Create alarm if user enters a valid float. Triggered on enter keydown in 
// alarmInput form.
function userCreateAlarm(e) {
    if (e.keyCode != 13)
        return;
    input = document.getElementById("alarmInput").value;
    var duration = parseFloat(input);
    if (isNaN(duration))
        alert("Invalid time duration entered!")
    else
        createAlarm(duration);
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
}

// Create alarm.
function createAlarm(duration) {
    var name = "Alarm " + Date.now();  // Generate unique alarm name
    chrome.alarms.create(name, { delayInMinutes: duration });
    alert("Alarm set for " + duration + " minutes");

}

// Given an alarm's scheduledTime, return remaining time in string format
function minutesLeft(scheduledTime) {
    var ms_left = scheduledTime - Date.now();
    var min = (ms_left / 1000 / 60) << 0;
    var sec = (ms_left / 1000) % 60 << 0;
    var separator = sec < 10 ? ":0" : ":";        
    return min + separator + sec;
}