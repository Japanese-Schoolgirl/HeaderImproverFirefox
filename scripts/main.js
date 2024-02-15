const button = document.getElementById('saveButton');
const slider = document.getElementById('slider');

console.log('button is ' + button);
console.log('slider is ' + slider);
console.log('main.js WORKS');

button.addEventListener('click', function (event) {
    browser.runtime.sendMessage({
        clickValue: 'nword'
    });
});

// Retrieve the slider value from storage when the page loads
browser.storage.sync.get(['sliderValue', 'randomModeValue'], function (data) {
    console.log('tried to GET');
    if (data.sliderValue !== undefined) {
        slider.value = data.sliderValue;
    }
    if (data.randomModeValue !== undefined) {
        // Update randomModeStatus here
        const randomModeStatus = data.randomModeValue;
        // Set checkbox state based on randomModeStatus
        document.getElementById('randomMode').checked = randomModeStatus;
    }
});

button.addEventListener('click', function (event) {
    // Get the current value of the slider
    const sliderValue = slider.value;
    // Get the current value of the checkbox
    const randomModeStatus = document.getElementById('randomMode').checked;

    // Send a message with slider value and click value
    browser.runtime.sendMessage({
        sliderValue: sliderValue,
        clickValue: 'iClicked',
        randomModeValue: randomModeStatus
    });

    // Store the slider value and checkbox value in Firefox storage
    browser.storage.sync.set({ 'sliderValue': sliderValue });
    browser.storage.sync.set({ 'randomModeValue': randomModeStatus });
});
