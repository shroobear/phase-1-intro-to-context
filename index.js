// Your code here
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

function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });
    return employee
};
function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return employee
};
function hoursWorkedOnDate(employee, dateStamp) {
    const timeIn = employee.timeInEvents.find(event => event.date === dateStamp);
    const timeOut = employee.timeOutEvents.find(event => event.date === dateStamp);
    if (timeIn && timeOut) {
        const hoursWorked = (timeOut.hour - timeIn.hour)/100;
        return hoursWorked;
    } else {
        return 0;
    }
};
function wagesEarnedOnDate(employee, dateStamp) {
    const hoursWorked = hoursWorkedOnDate(employee, dateStamp);
    const payOwed = hoursWorked * employee.payPerHour;
    return payOwed;
}

function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((acc, date) => {
        return acc + wagesEarnedOnDate(employee, date);
    }, 0);
    return totalWages;
}

function calculatePayroll(employees) {
    const totalPayroll = employees.reduce((acc, employee) => {
      return acc + allWagesFor(employee);
    }, 0);
    return totalPayroll;
  }
  