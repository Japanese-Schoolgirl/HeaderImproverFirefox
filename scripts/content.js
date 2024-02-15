console.log('this is a firefox test branch pls');

const wordsToInsert = [' ИЗ ЖОПЫ', ' ГОВНА', ' ВОТ ПИЗДЕЦ', ' НО ХУЙ ТАМ', ' НУ АХУЕТЬ ТЕПЕРЬ', ', НО КОГО ЕБЁТ?', ' ДА И ХУЙ С НИМ', ' НУ И ЗАЕБИСЬ'];
let headerToChange = document.querySelectorAll('h1, h2, h3, h1 > span, .icon icon--tick_redaction');

function getRandomNumber() {
  return Math.floor(Math.random() * 8);
}

function improveHeader(header) {
  if (!randomON) {
    header.textContent = header.textContent + wordsToInsert[dialPosition];
  } else if (randomON) {
    header.textContent = header.textContent + wordsToInsert[getRandomNumber()];
  }
}

let dialPosition = 10;
let randomON = true;
let enableM = true;

// Retrieve the slider value from storage when the content script loads
browser.storage.sync.get(['sliderValue', 'randomModeValue', 'enableBtnValue'], function (data) {
  if (data.sliderValue !== undefined) {
    dialPosition = Number(data.sliderValue);
  }
  if (data.randomModeValue !== undefined) {
    randomON = data.randomModeValue;
  }
  if (data.enableBtnValue !== undefined) {
    enableM = data.enableBtnValue;
  }
  if (dialPosition !== 10 && dialPosition !== undefined && enableM == true) {
    headerToChange.forEach(element => {
      improveHeader(element);
    });
  } else if (enableM == false) {
    console.log('Enable is OFF');
  }
});

browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.clickValue !== undefined) {
    console.log('chu say???');
  }
  if (message.clickValue !== undefined && message.randomModeValue !== undefined) {
    console.log('tick is: ' + message.randomModeValue + 'its type is ' + typeof message.randomModeValue);
    randomON = message.randomModeValue;
    console.log('randomON = ' + randomON);
    dialPosition = Number(message.sliderValue);
    // if (dialPosition !== 10 && enableM == true) {
    //   headerToChange.forEach(element => {
    //     improveHeader(element);
    //   });
    // } else {
    //   console.log('Cant improve:(');
    // }
  }
});
