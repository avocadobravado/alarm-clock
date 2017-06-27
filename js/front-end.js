var Alarm = require('./../js/back-end').alarmModule;

$(document).ready(function(){

  //Display time
  $('#time').text(moment().format("dddd, MMMM, YYYY, h:mm:ss a"));

  //Submit function
  $(".baby-goats-alarm").submit(function(event){
    event.preventDefault();
    var newAlarm = new Alarm();
    var userInput = $('.alarm-time').val();
    var alarmCountdown = setInterval(alarmTimer, 1000);

    function alarmTimer() {
      console.log(newAlarm.alarmClock(userInput));
      if (newAlarm.alarmClock(userInput) === true) {
        $(".output").html("<h1>" + "起きて!" + "</h2>");
        clearInterval(alarmCountdown);
      }
    }

    $('.output').html("<h2>" + userInput + "</h2>");
  });
});


// We want to have a form for users to choose time -- DONE :) killin it~
// Then we'll a button to submit -- DONE :) super killin it~


// We want to capture the time that the user sets with a variable
// We want something to happen when that time comes 'round

// And then we want it to be super kawaii with bb goat friend
