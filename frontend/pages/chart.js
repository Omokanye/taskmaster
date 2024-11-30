    // Function to generate the graph
    function generateTaskGraph() {
        // Get the context of the canvas
        const ctx = document.getElementById('task-graph').getContext('2d');
        
        // Define data for the graph
        const taskData = {
            labels: ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'], // Task names or stages
            datasets: [{
                label: 'Task Progress',
                data: [65, 80, 50, 90, 40], // Progress percentage of each task (0-100)
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Light blue background
                borderColor: 'rgba(75, 192, 192, 1)', // Dark blue border
                borderWidth: 1
            }]
        };

        // Define options for the graph
        const options = {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true, // Start the Y-axis at 0
                    max: 100 // Max value for the Y-axis (100%)
                }
            }
        };

        // Create the graph using Chart.js
        new Chart(ctx, {
            type: 'bar', // Type of graph: bar chart
            data: taskData,
            options: options
        });
    }

    // Call the function to generate the graph when the page loads
    window.onload = generateTaskGraph;