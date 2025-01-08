document.addEventListener("DOMContentLoaded", () => {
    const habitInput = document.getElementById("habit-input");
    const addHabitButton = document.getElementById("add-habit");
    const habitList = document.getElementById("habit-list");
  
    function addHabit() {
      const habitName = habitInput.value.trim();
      if (habitName === "") return;
  
      const habitElement = document.createElement("div");
      habitElement.className = "habit";
      habitElement.innerHTML = `
        <span>${habitName}</span>
        <button class="mark-complete">Complete</button>
      `;
  
      habitElement.querySelector(".mark-complete").addEventListener("click", () => {
        habitElement.classList.toggle("completed");
      });
  
      habitList.appendChild(habitElement);
      habitInput.value = "";
    }
  
    addHabitButton.addEventListener("click", addHabit);
  });
  