// TODO: Query user to input alarm time
// TODO: Turn type commands into buttons

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) {
    createAlarm(0.1);
});

// Get user input. Poses some suggested times.
chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
    suggest([
        { content: text + 30, description: " 30 minutes" },
        { content: text + 60, description: " 60 minutes" }
    ]);
});

// On user input, set alarm accordingly.
chrome.omnibox.onInputEntered.addListener(function (text) {
    if (text === "cancel") {
        cancelAlarms();
        return;
    }
    var duration = parseFloat(text);
    if (isNaN(duration))
        alert("Invalid time duration entered!")
    else
        createAlarm(duration);
})

// Called when an alarm rings.
chrome.alarms.onAlarm.addListener(function (alarm) {
    alert("Do something with your life");
    chrome.alarms.clear(alarm.name);
    console.log("Alarm triggered: " + alarm.name);
});