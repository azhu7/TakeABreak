// Add keydown listener to alarmInput input form.
document.addEventListener('DOMContentLoaded', function () {
    var alarmInput = document.querySelector("#alarmInput");
    if (alarmInput) {
        alarmInput.addEventListener('keydown', userCreateAlarm);
    }
});