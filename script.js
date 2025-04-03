// ==========================
// Calendar Event Management
// ==========================

// DOM Elements
const calendarGrid = document.getElementById('calendarGrid');
const currentMonthYear = document.getElementById('currentMonthYear');
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');
const eventModal = document.getElementById('eventModal');
const eventTitle = document.getElementById('eventTitle');
const eventDescription = document.getElementById('eventDescription');
const saveEvent = document.getElementById('saveEvent');
const deleteEvent = document.getElementById('deleteEvent');
const cancelEvent = document.getElementById('cancelEvent');
const boldBtn = document.getElementById('boldBtn');
const italicBtn = document.getElementById('italicBtn');
const bulletBtn = document.getElementById('bulletBtn');

// Current Date Variables
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let activeCell = null;
let events = JSON.parse(localStorage.getItem('events')) || {};  // Load events from localStorage


// ==============================
// Render Calendar
// ==============================

function renderCalendar(month, year) {
  calendarGrid.innerHTML = '';     // Clear calendar grid
  const firstDay = new Date(year, month).getDay();  // First day of the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();  // Total days in the month

  // Display current month & year
  currentMonthYear.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;


  // Add empty cells before first day of the month
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    calendarGrid.appendChild(emptyCell);
  }


  // Populate calendar with days
  for (let i = 1; i <= daysInMonth; i++) {
    const cell = document.createElement('div');
    cell.classList.add('calendar-cell');
    cell.textContent = i;

    const eventKey = `${year}-${month + 1}-${i}`;  // Key to store events in the format "YYYY-MM-DD"

    // Mark days with events
    if (events[eventKey]) {
      cell.innerHTML = `<strong>${i}</strong> 📌`;  // Add 📌 if there is an event
      cell.classList.add('event-marker');
    }

    // Open the modal when clicking on a day with an event
    cell.addEventListener('click', () => openModal(cell, eventKey));
    calendarGrid.appendChild(cell);
  }
}


// ==============================
// Event Modal Management
// ==============================

// Open Event Modal to Add/Edit Event
function openModal(cell, eventKey) {
  activeCell = { cell, eventKey };
  const eventData = events[eventKey] || {};  // Get event data or empty object if no event
  eventTitle.value = eventData.title || '';  // Set title if available
  eventDescription.value = eventData.description || '';  // Set description if available
  eventModal.classList.remove('hidden');  // Show the modal
}

// Close the Event Modal
function closeModal() {
  eventModal.classList.add('hidden');  // Hide the modal
}

// Save the Event
saveEvent.addEventListener('click', () => {
  const { cell, eventKey } = activeCell;
  const title = eventTitle.value.trim();  // Get the event title
  const description = eventDescription.value.trim();  // Get the event description

  if (title || description) {
    events[eventKey] = { title, description };  // Save event data
    localStorage.setItem('events', JSON.stringify(events));  // Store in localStorage
    cell.innerHTML = `<strong>${cell.textContent}</strong> 📌`;  // Add 📌 marker to the day cell
    cell.classList.add('event-marker');  // Add event marker to the cell
  }
  closeModal();  // Close the modal
});

// Delete the Event
deleteEvent.addEventListener('click', () => {
  const { cell, eventKey } = activeCell;
  if (confirm('Are you sure you want to delete this event?')) {
    delete events[eventKey];  // Delete the event from the events object
    localStorage.setItem('events', JSON.stringify(events));  // Update the events in localStorage
    cell.textContent = cell.textContent.replace('📌', '').trim();  // Remove 📌 marker from the cell
    cell.classList.remove('event-marker');  // Remove event marker from the cell
    closeModal();  // Close the modal
  }
});


// ==============================
// Calendar Navigation
// ==============================

// Navigate to the Previous Month
prevMonth.addEventListener('click', () => {
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
  renderCalendar(currentMonth, currentYear);
});

// Navigate to the Next Month
nextMonth.addEventListener('click', () => {
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
  renderCalendar(currentMonth, currentYear);
});


// ====================================================
// Text Formatting Functions for the Event Description
// ====================================================

// Bold Text
boldBtn.addEventListener('click', () => {
  eventDescription.style.fontWeight = eventDescription.style.fontWeight === 'bold' ? 'normal' : 'bold';
});

// Italic Text
italicBtn.addEventListener('click', () => {
  eventDescription.style.fontStyle = eventDescription.style.fontStyle === 'italic' ? 'normal' : 'italic';
});

// Bullet Points
bulletBtn.addEventListener('click', () => {
  eventDescription.value += '\n• ';  // Add a bullet point
});

// Cancel the Event Edit/Delete
cancelEvent.addEventListener('click', closeModal);


// ==============================
// Initialize Calendar
// ==============================
renderCalendar(currentMonth, currentYear);


cell.addEventListener('click', () => {
  openModal(cell, eventKey);  // Open the modal when the day is clicked
});

// Close the Event Modal
function closeModal() {
  eventModal.classList.add('hidden');
}
// Open the modal when clicking on a day
cell.addEventListener('click', () => openModal(cell, eventKey));



document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Check localStorage for saved theme
  if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark-mode");
      themeToggle.checked = true;
  }

  // Toggle Dark Mode when switch is clicked
  themeToggle.addEventListener("change", function () {
      if (this.checked) {
          body.classList.add("dark-mode");
          localStorage.setItem("theme", "dark");
      } else {
          body.classList.remove("dark-mode");
          localStorage.setItem("theme", "light");
      }
  });
});
