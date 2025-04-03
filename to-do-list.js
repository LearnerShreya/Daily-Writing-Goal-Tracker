document.addEventListener("DOMContentLoaded", () => {
  const habitInput = document.getElementById("habit-input");
  const addHabitButton = document.getElementById("add-habit");
  const habitList = document.getElementById("habit-list");
  const emptyMessage = document.getElementById("empty-message");

  function toggleEmptyMessage() {
    if (habitList.children.length === 1) {
      emptyMessage.style.display = "block";
    } else {
      emptyMessage.style.display = "none";
    }
  }

  function addHabit() {
    const habitName = habitInput.value.trim();
    if (habitName === "") return;

    const habitElement = document.createElement("div");
    habitElement.className = "habit";
    habitElement.innerHTML = `
      <span>${habitName}</span>
      <div>
        <button class="mark-complete">Complete</button>
        <button class="delete-habit">Delete</button>
      </div>
    `;

    habitElement.querySelector(".mark-complete").addEventListener("click", () => {
      habitElement.classList.toggle("completed");
    });

    habitElement.querySelector(".delete-habit").addEventListener("click", () => {
      habitElement.remove();
      toggleEmptyMessage();
    });

    habitList.appendChild(habitElement);
    habitInput.value = "";
    toggleEmptyMessage();
  }

  addHabitButton.addEventListener("click", addHabit);
  toggleEmptyMessage();
});
