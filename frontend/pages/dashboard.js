document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-title");
    const taskDescInput = document.getElementById("task-desc");
    const taskCategoryInput = document.getElementById("task-priority");
    const taskDeadlineInput = document.getElementById("task-deadline");
    const taskLists = {
        "urgent-important": document.getElementById('urgent-important-list'),
        "schedule-lessurgent": document.getElementById('schedule-lessurgent-list'),
        "lessimportant-delegate": document.getElementById('lessimportant-delegate-list'),
        "dontdo-discover": document.getElementById('dontdo-discover-list')
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render tasks
    const renderTasks = (filteredTasks = tasks) => {
        Object.values(taskLists).forEach(list => list.innerHTML = '');
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <strong>${task.title}</strong> - ${task.description} <br>
                Deadline: ${task.deadline} 
                <button onclick="deleteTask(${task.id})">Delete</button>
                <button onclick="updateTask(${task.id})">Edit</button>
            `;
            taskLists[task.priority].appendChild(taskItem);
        });
    };

    // Add task to localStorage
    const addTaskToLocalStorage = (task) => {
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Search functionality
    const searchButton = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();

        // Filter tasks based on the search term in title or description
        const filteredTasks = tasks.filter(task =>
            task.title.toLowerCase().includes(searchTerm) || task.description.toLowerCase().includes(searchTerm)
        );

        renderTasks(filteredTasks); // Render the filtered tasks
    });

    // Handle form submission to add a task
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const taskTitle = taskInput.value.trim();
        const taskDesc = taskDescInput.value.trim();
        const taskPriority = taskCategoryInput.value;
        const taskDeadline = taskDeadlineInput.value.trim();

        if (taskTitle && taskDesc && taskPriority && taskDeadline) {
            const task = {
                id: Date.now(),
                title: taskTitle,
                description: taskDesc,
                priority: taskPriority,
                deadline: taskDeadline
            };

            addTaskToLocalStorage(task); // Add task to localStorage
            renderTasks(); // Render all tasks

            // Clear form inputs after submission
            taskInput.value = '';
            taskDescInput.value = '';
            taskCategoryInput.value = '';
            taskDeadlineInput.value = '';
        }
    });

    // Delete task by ID
    window.deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Update localStorage
        renderTasks(); // Re-render the list after deletion
    };

    // Update task (simple re-entry for demo purposes)
    window.updateTask = (id) => {
        const taskToEdit = tasks.find(task => task.id === id);
        taskInput.value = taskToEdit.title;
        taskDescInput.value = taskToEdit.description;
        taskCategoryInput.value = taskToEdit.priority;
        taskDeadlineInput.value = taskToEdit.deadline;
        deleteTask(id); // Remove old task and wait for the new one
    };

    // Initialize the dashboard by rendering tasks from localStorage
    renderTasks();

    // Get the sidebar and toggle button
    const sidebar = document.querySelector('.sidebar');
    const toggleButton = document.getElementById('sidebar-toggle');

    // Toggle sidebar visibility when the button is clicked
    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('show');
    });
    
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    sidebarToggle.addEventListener('click', () => {
        sidebar.style.transform = sidebar.style.transform === 'translateX(0%)' ? 'translateX(-100%)' : 'translateX(0%)';
    });

});
