const searchForm = document.querySelector("#search-form");
const searchFormInput = document.querySelector("#search-form-input");
const searchBtn = document.querySelector("#searchBtn");
const micBtn = document.querySelector("#micBtn");
const micIcon = document.querySelector("#micIcon");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if(SpeechRecognition) {
    console.log("Speech Recognition on");
} else {
    console.log("Speech Recognition off");
}