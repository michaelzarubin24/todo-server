import "../scss/style.scss";

class TodoList {
  private taskInput: HTMLInputElement;
  private taskList: HTMLUListElement;

  constructor() {
    this.taskInput = document.getElementById("taskInput") as HTMLInputElement;
    this.taskList = document.getElementById("taskList") as HTMLUListElement;

    const todoForm = document.getElementById("todoForm") as HTMLFormElement;
    todoForm.addEventListener("submit", this.handleSubmit.bind(this));
  }

  addTask(taskText: string) {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => this.removeTask(taskItem));

    taskItem.appendChild(deleteButton);
    this.taskList.appendChild(taskItem);
    this.taskInput.value = "";
  }

  removeTask(taskItem: HTMLLIElement) {
    this.taskList.removeChild(taskItem);
  }

  handleSubmit(event: Event) {
    event.preventDefault(); // Prevent the default form submission

    const taskText = this.taskInput.value.trim();

    if (taskText !== "") {
      this.addTask(taskText);

      // Add logic to send taskText to the server using fetch or your preferred method
      fetch("http://localhost:3000/api/todo-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskText }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Check the response from the server
          // Handle success or redirect as needed
        })
        .catch((error) => console.error("Error:", error));
    }
  }
}

new TodoList();
// function submitTask() {
//   const taskText = document.querySelector('input[name="taskText"]').value;

//   fetch('http://localhost:3000/api/todo-form', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ taskText }),
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data); // Check the response from the server
//       // Handle success or redirect as needed
//     })
//     .catch(error => console.error('Error:', error));
// }
