/* complex_code.js */

// This code generates a calendar widget that displays the current month and allows users to navigate between months, select dates, and view events.

// Define variables
let currentDate = new Date(); // Get the current date
let selectedDate = null; // Holds the date selected by the user
let events = []; // Array to store events

// Create calendar function
function createCalendar(year, month) {
  let calendarDiv = document.querySelector('#calendar'); // Get the calendar div
  calendarDiv.innerHTML = ''; // Clear the calendar

  // Create header and navigation
  let header = document.createElement('div');
  header.classList.add('header');
  header.innerHTML = year + ' ' + getMonthName(month);
  calendarDiv.appendChild(header);

  let prevButton = document.createElement('button');
  prevButton.innerText = 'Prev';
  prevButton.addEventListener('click', () => {
    let prevMonth = month - 1;
    let prevYear = year;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }
    createCalendar(prevYear, prevMonth);
  });
  header.appendChild(prevButton);

  let nextButton = document.createElement('button');
  nextButton.innerText = 'Next';
  nextButton.addEventListener('click', () => {
    let nextMonth = month + 1;
    let nextYear = year;
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear++;
    }
    createCalendar(nextYear, nextMonth);
  });
  header.appendChild(nextButton);

  // Create days of the week
  let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let daysOfWeekRow = document.createElement('div');
  daysOfWeekRow.classList.add('row');
  for (let dayOfWeek of daysOfWeek) {
    let cell = document.createElement('div');
    cell.classList.add('cell', 'header-cell');
    cell.innerText = dayOfWeek;
    daysOfWeekRow.appendChild(cell);
  }
  calendarDiv.appendChild(daysOfWeekRow);

  // Calculate the first day of the month
  let firstDay = new Date(year, month, 1).getDay();
  if (firstDay === 0) firstDay = 7; // Convert Sunday to 7

  // Calculate the number of days in the month
  let daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create calendar cells
  let date = 1;
  for (let week = 0; week < 6; week++) {
    if (date > daysInMonth) break; // Stop if we reach the last day of the month

    let row = document.createElement('div');
    row.classList.add('row');
    for (let dayOfWeek = 1; dayOfWeek <= 7; dayOfWeek++) {
      let cell = document.createElement('div');
      cell.classList.add('cell');
      if (week === 0 && dayOfWeek < firstDay) {
        cell.classList.add('empty-cell');
      } else if (date > daysInMonth) {
        cell.classList.add('empty-cell');
      } else {
        cell.innerText = date;
        if (selectedDate && date === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
          cell.classList.add('selected');
        }
        date++;
      }
      row.appendChild(cell);
    }
    calendarDiv.appendChild(row);
  }

  // Add event listeners to cells
  let cells = document.querySelectorAll('.cell:not(.empty-cell)');
  for (let cell of cells) {
    cell.addEventListener('click', function() {
      removeSelectedClass();
      this.classList.add('selected');
      let day = parseInt(this.innerText);
      selectedDate = new Date(year, month, day);
      showEventsForSelectedDate();
    });
  }

  // Show events for selected date
  function showEventsForSelectedDate() {
    let eventsDiv = document.querySelector('#events');
    eventsDiv.innerHTML = ''; // Clear events div
    let eventsForSelectedDate = events.filter(event => isSameDate(event.date, selectedDate));
    if (eventsForSelectedDate.length === 0) {
      let noEventMessage = document.createElement('p');
      noEventMessage.innerText = 'No events for selected date.';
      eventsDiv.appendChild(noEventMessage);
    } else {
      for (let event of eventsForSelectedDate) {
        let eventItem = document.createElement('div');
        eventItem.classList.add('event');
        eventItem.innerHTML = `<strong>${formatDate(event.date)}</strong> - ${event.title}`;
        eventsDiv.appendChild(eventItem);
      }
    }
  }

  // Helper functions
  function getMonthName(month) {
    let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[month];
  }

  function removeSelectedClass() {
    let selectedCell = document.querySelector('.selected');
    if (selectedCell) {
      selectedCell.classList.remove('selected');
    }
  }

  function isSameDate(date1, date2) {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  }

  function formatDate(date) {
    let day = date.getDate();
    let month = getMonthName(date.getMonth());
    let year = date.getFullYear();
    return day + ' ' + month + ' ' + year;
  }
}

// Create initial calendar
createCalendar(currentDate.getFullYear(), currentDate.getMonth());