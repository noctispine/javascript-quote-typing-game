import {quotes} from './quotes.js'


let words = [];
let wordIndex = 0;

const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedText = document.getElementById("typed");
const btnStart = document.getElementById("start");

quote.innerHTML = `<span>--------------</span>`;



btnStart.addEventListener("click", () => {
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const [quote, author] = [quotes[quoteIndex].text, quotes[quoteIndex].author];

  wordIndex = 0;
  words = quote.split(" ");

  const htmlWords = words.map((word) => {
    return `<span id='word' key=${quoteIndex}>${word}</span>`;
  });

  quoteElement.innerHTML = htmlWords.join(" ");

  // enable input
  typedText.disabled = false;

  // clear text-box
  typedText.value = "";
  typedText.focus();

  // clear author
  messageElement.innerHTML = "###";

  quoteElement.childNodes[0].className = "highlight";

  // clear link
  document.querySelector("#message").removeAttribute("href");
});



typedText.addEventListener("input", () => {
  const currentWord = words[wordIndex];
  const currentType = typedText.value;

  // match case
  if (currentType === currentWord && wordIndex === words.length - 1) {
    const author =
      quotes[document.querySelector("#word").getAttribute("key")].author;
    const message = `-${author ?? "anonymous"}`;
    if (message !== "-anonymous") {
      document
        .querySelector("#message")
        .setAttribute(
          "href",
          `https://en.wikipedia.org/wiki/${author.replaceAll(" ", "_")}`
        );
    }
    messageElement.innerText = message;

    // disable input
    typedText.disabled = true;
    typedText.value = "";

    // focus button
    setTimeout(() => btnStart.focus(), 1000);

    // remove the last highlighted class
    document.querySelectorAll("#word")[wordIndex].className = "";
  }
  // input controls for highlights
  else if (currentType.endsWith(" ") && currentType.trim() === currentWord) {
    typedText.value = "";

    document.querySelectorAll("#word")[wordIndex].className = "";

    wordIndex++;
    console.log();

    document.querySelectorAll("#word")[wordIndex].className = "highlight";
  } else if (currentWord.startsWith(currentType)) {
    typedText.className = "";
  } else {
    typedText.className = "error";
  }
});
