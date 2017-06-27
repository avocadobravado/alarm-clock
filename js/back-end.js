function Alarm(time) {
  this.time = time;
}

Alarm.prototype.alarmClock = function(goatAlarm) {
  var alarm = false;
  if ((moment(this.time).format("HH:mm")) === goatAlarm) {
    alarm = true;
  }
  return alarm;
};

exports.alarmModule = Alarm;
