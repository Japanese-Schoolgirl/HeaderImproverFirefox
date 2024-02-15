const button = document.getElementById('saveButton');
const slider = document.getElementById('slider');
const enableBtn = document.getElementById('enableButton');

console.log('button is ' + button);
console.log('slider is ' + slider);
console.log('enableBtn is ' + enableBtn);
console.log('main.js WORKS');

// button.addEventListener('click', function (event) {
//     browser.runtime.sendMessage({
//         clickValue: 'nword'
//     });
// });

// Retrieve the slider value from storage when the page loads
browser.storage.sync.get(['sliderValue', 'randomModeValue', 'enableBtnValue'], function (data) {
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
    if (data.enableBtnValue !== undefined){
        const enableBtnStatus = data.enableBtnValue;  
        enableBtn.checked = data.enableBtnValue;
    }
});

button.addEventListener('click', function (event) {
    // Get the current value of the slider
    const sliderValue = slider.value;
    // Get the current value of the checkbox
    const randomModeStatus = document.getElementById('randomMode').checked;
    enableBtnStatus = enableBtn.checked;

    // Send a message with slider value and click value
    browser.runtime.sendMessage({
        sliderValue: sliderValue,
        clickValue: 'iClicked',
        randomModeValue: randomModeStatus,
        enableBtnValue: enableBtnStatus
    });

    // Store the slider value and checkbox value in Firefox storage
    browser.storage.sync.set({ 'sliderValue': sliderValue });
    browser.storage.sync.set({ 'randomModeValue': randomModeStatus });
    browser.storage.sync.set({ 'enableBtnValue' : enableBtnStatus });
});
