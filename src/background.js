/**
    Author: Alexander Zhu
    Date Created: February 6, 2017
    Description: Background scripts that exist for the lifetime of the extension
*/

// Called when an alarm rings.
chrome.alarms.onAlarm.addListener(function (alarm) {
    alert("Do something with your life");
    chrome.alarms.clear(alarm.name);
    console.log("Alarm triggered: " + alarm.name);
});