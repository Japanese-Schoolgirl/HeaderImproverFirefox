const button = document.getElementById('saveButton');
const slider = document.getElementById('slider');
const enableBtn = document.getElementById('enableButton');


// Загружает штуки из памяти когда страница грузится
browser.storage.sync.get(['sliderValue', 'randomModeValue', 'enableBtnValue'], function (data) {
    console.log('tried to GET');
    if (data.sliderValue !== undefined) {
        slider.value = data.sliderValue;
    }
    
    if (data.randomModeValue !== undefined) {

        const randomModeStatus = data.randomModeValue;

        document.getElementById('randomMode').checked = randomModeStatus;
    }
    if (data.enableBtnValue !== undefined){
        const enableBtnStatus = data.enableBtnValue;  
        enableBtn.checked = data.enableBtnValue;
    }
});

button.addEventListener('click', function (event) {

    const sliderValue = slider.value;

    const randomModeStatus = document.getElementById('randomMode').checked;
    enableBtnStatus = enableBtn.checked;

    // По клику СОХРАНЯТОРА отправляем позиции юая в контент-скрипт
    browser.runtime.sendMessage({
        sliderValue: sliderValue,
        clickValue: 'iClicked',
        randomModeValue: randomModeStatus,
        enableBtnValue: enableBtnStatus
    });

    //По клику СОХРАНЯТОРА сохраняем релевантные значения для юая (Сделать чтобы сохранялось не по клику, а по факту изменения)
    browser.storage.sync.set({ 'sliderValue': sliderValue });
    browser.storage.sync.set({ 'randomModeValue': randomModeStatus });
    browser.storage.sync.set({ 'enableBtnValue' : enableBtnStatus });
});
