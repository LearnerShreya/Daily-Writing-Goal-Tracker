// =====================================
// Habit Tracker - Add, Mark Complete, and Delete
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  // Get references to input field, buttons, and habit list container
  const habitInput = document.getElementById("habit-input");
  const addHabitButton = document.getElementById("add-habit");
  const habitList = document.getElementById("habit-list");
  const emptyMessage = document.getElementById("empty-message");

  // =====================================
  // Function to Show/Hide Empty Message
  // =====================================

  /**
   * Toggles the visibility of the empty message
   * based on the number of habits in the list.
   */
  function toggleEmptyMessage() {
    if (habitList.children.length === 1) {
      emptyMessage.style.display = "block"; // Show empty message
    } else {
      emptyMessage.style.display = "none";  // Hide empty message
    }
  }

  // =====================================
  // Function to Add a New Habit
  // =====================================

  /**
   * Adds a new habit to the habit list.
   * Prevents adding empty habits.
   */
  function addHabit() {
    const habitName = habitInput.value.trim(); // Get input value
    if (habitName === "") return; // Prevent empty habits

    // Create a new habit element
    const habitElement = document.createElement("div");
    habitElement.className = "habit";
    habitElement.innerHTML = `
      <span>${habitName}</span>
      <div>
        <button class="mark-complete">Complete</button>
        <button class="delete-habit">Delete</button>
      </div>
    `;

    // =====================================
    // Mark Habit as Completed
    // =====================================

    /**
     * Toggles the "completed" class on the habit element.
     */
    habitElement.querySelector(".mark-complete").addEventListener("click", () => {
      habitElement.classList.toggle("completed");
    });

    // =====================================
    // Delete Habit
    // =====================================

    /**
     * Removes the habit from the list and updates the empty message.
     */
    habitElement.querySelector(".delete-habit").addEventListener("click", () => {
      habitElement.remove();
      toggleEmptyMessage(); // Update message visibility
    });

    // Append the new habit to the list
    habitList.appendChild(habitElement);

    // Clear input field after adding
    habitInput.value = "";
    
    // Update empty message visibility
    toggleEmptyMessage();
  }

  // =====================================
  // Event Listeners
  // =====================================

  // Add habit when button is clicked
  addHabitButton.addEventListener("click", addHabit);

  // Initialize the empty message on page load
  toggleEmptyMessage();
});
