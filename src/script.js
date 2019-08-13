const superb = require('superb');
const badwordsArray = require('badwords/array');
const placeholder = document.getElementById('password');

console.log('starting 🚀');
const createPassword = () => {
  const badWord =
    badwordsArray[Math.floor(Math.random() * badwordsArray.length)];
  const goodWord = superb.random();

  let password =
    randomUpperCase(goodWord) +
    randomString(2, '@*#?!$%') +
    randomUpperCase(badWord);

  password = password.split(' ').join('');
  password = password.split("'").join('');
  password = password.split('"').join('');

  password += randomString(3, '0123456789');

  placeholder.innerHTML = password;
};

function randomString(len, charSet) {
  charSet =
    charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var randomString = '';
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
}

function randomUpperCase(word) {
  return word
    .split('')
    .map(function(v) {
      var chance = Math.round(Math.random());
      return (v = chance ? v.toUpperCase() : v.toLowerCase());
    })
    .join('');
}

const button = document.getElementById('btn');
button.addEventListener('click', () => {
  copyTextToClipboard(placeholder.innerHTML);
});

password.addEventListener('click', () => {
  copyTextToClipboard(placeholder.innerHTML);
});

const newPassword = document.getElementById('newPasswordbtn');
newPassword.addEventListener('click', () => {
  createPassword();
});

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function() {
      console.log('Async: Copying to clipboard was successful!');
      placeholder.classList.add('copied');
      setTimeout(() => {
        placeholder.classList.remove('copied');
      }, 400);
    },
    function(err) {
      console.error('Async: Could not copy text: ', err);
    }
  );
}
createPassword();
