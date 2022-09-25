function createHourRows() {
    // 08:00 to 17:00
    for (var i = 8; i < 17; i++) {
        var alpha = $('#hr-template').clone();
        alpha.attr('id', 'hr-' + i);

        $('#container').append(alpha);
    }
}

function updateDay() {
    var date = moment().format('dddd, MMMM Do YYYY');
    $('#currentDay').html(date);
}

function updateRows() {
    var hr = moment().hour();
    for (var i = 8; i <= 17; i++) {
        var el = $('#hour-' + i);
        var cl = "past";

        if (i == hr) { cl = "present"; }
        if (i > hr) { cl = "future"; }

        el.addClass(cl);
    }
}


function attachEventListeners() {
    for (var i = 8; i <= 17; i++) {
        var el = $('#btn-' + i);
        el.click(function () {
            var taskVal = $('#task-' + i).val();
            localStorage.setItem(i, taskVal);
        });
    }
}

/*
 * this function loops through the hours
 * then gets the value stored in localStorage for that hour
 * then sets that value as the current value of the task textarea
 */
function loadSavedData() {
    for (var i = 8; i <= 17; i++) {
        // grab the value from localStorage ( or null if it doesn't exist)
        var value = localStorage.getItem(i);
        // now set it on the textarea
        $('#task-' + i).val(taskVal);
    }
}

/*
 * these 4 functions are run everytime the page loads
 */
updateDay();
updateRows();
attachEventListeners();
loadSavedData();

/* 
 * call some functions every every minute
 * we can then handle when:
 * 1. the day changes (i.e midnight)
 * 2. the hour changes (change the colors of the rows)
 */
setInterval(
    function () {
        /* these are run every minute */
        updateDay();
        updateRows();
    },
    60000 // 60,000 milliseconds is 1 minute
);