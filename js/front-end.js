var Alarm = require('./../js/back-end').alarmModule;

$(document).ready(function(){

  //Display time
  $('#time').text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));

  //Submit function
  $(".baby-goats-alarm").submit(function(event){
    event.preventDefault();

    // var userInput = parseInt($('.alarm-time').val());
      var userInput = parseInt($('.alarm-time').val());

      console.log(userInput);

      $('.output').html("<h2>" + userInput + "</h2>")
    // var newAlarm = new Alarm(time);

  });
});


// We want to have a form for users to choose time -- DONE :) killin it~
// Then we'll a button to submit -- DONE :) super killin it~


// We want to capture the time that the user sets with a variable
// We want something to happen when that time comes 'round

// And then we want it to be super kawaii with bb goat friend
