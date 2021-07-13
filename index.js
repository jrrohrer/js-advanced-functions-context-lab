/* Your Code Here */
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeeRecord) { 
    return employeeRecord.map(function(arr){
      return createEmployeeRecord(arr);
    });
}

function createTimeInEvent(timeStamp) {
    let [date, hour] = timeStamp.split(' ');
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
    })
    return this;
}

function createTimeOutEvent(timeStamp) {
    let [date, hour] = timeStamp.split(' ');
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
    })
    return this;
}

function hoursWorkedOnDate(dateQuery) {
    let clockIn = this.timeInEvents.find(function(c) {
        return c.date === dateQuery
    })
    let clockOut = this.timeOutEvents.find(function(c) {
        return c.date === dateQuery
    })
    return (clockOut.hour - clockIn.hour) / 100
}

function wagesEarnedOnDate(dateQuery) {
    let wages = hoursWorkedOnDate.call(this, dateQuery) * this.payPerHour;
    return parseFloat(wages.toString())
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(e){
      return e.firstName === firstName;
    })
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(memo, e) {
      return memo + allWagesFor.call(e);
    }, 0)
}
  
  

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}