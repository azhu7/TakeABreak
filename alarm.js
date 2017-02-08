// Cancel all existing alarms.
function cancelAlarms() {
    chrome.alarms.getAll(function (alarms) {
        console.log("Cancelling " + alarms.length + " alarms");
        for (var i = 0; i < alarms.length; i++) {
            var time_left = minutesLeft(alarms[i].scheduledTime);
            console.log("Alarm canceled: " + alarms[i].name + " (" + time_left + " minutes remaining)")
            chrome.alarms.clear(alarms[i].name);
        }
    })
}

// Create alarm.
function createAlarm(duration) {
    alert("Setting alarm for " + duration + " minutes");
    var name = "Alarm " + genAlarmID();
    chrome.alarms.create(name, { delayInMinutes: duration });
    console.log("Alarm set: " + name + " (" + duration + " minutes)");
}

// Return next alarm ID
function genAlarmID() {
    if (typeof genAlarmID.counter == "undefined")
        genAlarmID.counter = 0;
    genAlarmID.counter++;
    return genAlarmID.counter;
}

// Given an alarm's scheduledTime, return remaining time in string format
function minutesLeft(scheduledTime) {
    var ms_left = scheduledTime - Date.now();
    var min = (ms_left / 1000 / 60) << 0;
    var sec = (ms_left / 1000) % 60 << 0;
    var separator = sec < 10 ? ":0" : ":";        
    return min + separator + sec;
}