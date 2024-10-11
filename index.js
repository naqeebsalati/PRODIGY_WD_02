let startTime = 0;  // To store the start time of the stopwatch
let elapsedTime = 0;  // To store the total elapsed time (important for resuming after pause)
let timerInterval;  // This will hold the reference to the interval that updates the stopwatch display
let running = false;  // A boolean to track whether the stopwatch is running (true) or paused (false)


// Start or pause the stopwatch when the button is clicked
const startPauseButton = document.getElementById('start-pause');  // Get the Start/Pause button from the HTML
startPauseButton.addEventListener('click', function () {
    if (!running) {  // If the stopwatch is not running (i.e., paused or just starting)
        startTime = Date.now() - elapsedTime;  // Set the start time, subtracting the paused elapsed time to resume properly
        timerInterval = setInterval(updateTime, 10);  // Start the timer, updating the display every 10 milliseconds
        startPauseButton.textContent = 'Pause';  // Change button text to 'Pause' when the stopwatch is running
        running = true;  // Set running to true, indicating the stopwatch is now active
    } else {  // If the stopwatch is already running (i.e., user clicked 'Pause')
        clearInterval(timerInterval);  // Stop updating the time (pause the stopwatch)
        elapsedTime = Date.now() - startTime;  // Calculate and store the total elapsed time so far
        startPauseButton.textContent = 'Start';  // Change button text back to 'Start' (ready to resume)
        running = false;  // Set running to false, indicating the stopwatch is paused
    }
});


// Reset the stopwatch to 0 when the reset button is clicked
document.getElementById('reset').addEventListener('click', function () {
    clearInterval(timerInterval);  // Stop any ongoing timer interval
    running = false;  // Set running to false, since the stopwatch is now reset
    elapsedTime = 0;  // Reset the elapsed time to 0
    document.getElementById('display').textContent = '00:00:00.000';  // Reset the display to the initial time
    document.getElementById('laps').innerHTML = '';  // Clear any lap times that were recorded
    startStopButton.textContent = 'Start';  // Change the start button text back to 'Start'
});


// Record a lap time when the lap button is clicked
document.getElementById('lap').addEventListener('click', function () {
    if (running) {  // Only record a lap if the stopwatch is running
        const lapTime = formatTime(Date.now() - startTime);  // Calculate the current time since the stopwatch started
        const lapElement = document.createElement('div');  // Create a new div element to display the lap time
        lapElement.textContent = `Lap: ${lapTime}`;  // Set the content of the new div to the formatted lap time
        document.getElementById('laps').appendChild(lapElement);  // Add the new lap time to the list of laps in the HTML
    }
});


// Function to update the display time continuously (called every 10ms)
function updateTime() {
    const currentTime = Date.now() - startTime;  // Calculate how much time has passed since the stopwatch started
    document.getElementById('display').textContent = formatTime(currentTime);  // Update the displayed time with the formatted value
}


// Format the time into hours:minutes:seconds.milliseconds
function formatTime(time) {
    const milliseconds = Math.floor(time % 1000);  // Calculate the milliseconds portion of the time (remainder of division by 1000)
    const seconds = Math.floor((time / 1000) % 60);  // Calculate the seconds portion (total time divided by 1000, remainder by 60)
    const minutes = Math.floor((time / (1000 * 60)) % 60);  // Calculate the minutes portion (total time divided by 60,000, remainder by 60)
    const hours = Math.floor(time / (1000 * 60 * 60));  // Calculate the hours portion (total time divided by 3,600,000)

    return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(milliseconds, 3)}`;  // Return the formatted time as a string
}


// Function to add leading zeros to numbers (e.g., 1 -> 01)
function pad(number, length) {
    return number.toString().padStart(length, '0');  // Convert the number to a string and pad it with leading zeros to the desired length
}
