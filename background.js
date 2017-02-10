// Called when an alarm rings.
chrome.alarms.onAlarm.addListener(function (alarm) {
    alert("Do something with your life");
    chrome.alarms.clear(alarm.name);
    console.log("Alarm triggered: " + alarm.name);
});