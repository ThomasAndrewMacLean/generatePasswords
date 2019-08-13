const superb = require('superb');
const badwordsArray = require('badwords/array');

const badWord = badwordsArray[Math.floor(Math.random() * badwordsArray.length)];
const goodWord = superb.random();

let password =
randomUpperCase(goodWord) +
randomString(2, '@*#?!$%') +
  randomUpperCase(badWord);

password = password.split(' ').join('');
password = password.split("'").join('');
password = password.split('"').join('');

password += randomString(3, '0123456789');

const placeholder = document.getElementById('password');
placeholder.innerHTML = password;

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
