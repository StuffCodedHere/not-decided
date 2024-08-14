import EnglishWords from "./English_Words.js"
import PersianWords from "./Persian_Words.js"

const home = document.querySelector(".home")
const play = document.querySelector(".play")
const modeTitle = document.querySelector(".mode-title")
const modeDescribtion = document.querySelector(".mode-describtion")
const mode = document.querySelector(".mode")
const settings = document.querySelector(".settings")
const levelContainer = document.querySelector(".level-container")
const levelBack = document.querySelector(".level-back")
const question = document.querySelector(".question")
const answer = document.querySelector(".answer")
const settingsContainer = document.querySelector(".settings-container")
const settingsBack = document.querySelector(".settings-back")
const language = document.querySelector(".language")

let questionArray = PersianWords
let answerArray = EnglishWords

let questionNumber = 0

const nextQuestion = () =>
 typeof questionArray[questionNumber] === "string" ? questionArray[questionNumber] : questionArray[questionNumber][0]

question.textContent = nextQuestion()

let keyboard = document.querySelector(".keyboard:not(.notActive)")

let modes = ["Normal", "Practice"]
let modesDescribtion = [
 "You have 3 hearts, you can win by finishing all the words before losing all your hearts.",
 "The questions will be a list of all the words that you typed wrong. Try to empty this list!",
]

window.addEventListener("touchmove", (event) => event.preventDefault(), { passive: false })
document.addEventListener("keydown", handleKeydown)
document.addEventListener("click", () =>
 document.fullscreenElement ? null : document.documentElement.requestFullscreen()
)

function handleClick(e) {
 if (!document.fullscreenElement && e.key !== "Alt") document.documentElement.requestFullscreen()
 if (e.target.textContent.match(/^[a-zا-ی]$/)) addLetter(e.target.textContent)
 else if (e.target.textContent === "del") removeLetter()
 else if (e.target.textContent === "ent") check()
 else if (e.target.classList.contains("space-bar")) addLetter(" ")
}

function handleKeydown(e) {
 if (
  (questionArray === PersianWords && e.key === " ") ||
  (questionArray === PersianWords && e.key.match(/^[ا-ی]$/)) ||
  (questionArray !== PersianWords && e.key.match(/^[a-z]$/))
 )
  return
 if (e.key.match(/^[a-zا-ی]$/) || e.key === " ") addLetter(e.key)
 else if (e.key === "Backspace") removeLetter()
 else if (e.key === "Enter") check()
}

function toggleKeyboards() {
 document.querySelectorAll(".keyboard").forEach((keyboard) => keyboard.classList.toggle("notActive"))
 keyboard = document.querySelector(".keyboard:not(.notActive)")
 keyboard.addEventListener("click", handleClick)
}

play.onclick = () => {
 home.style.display = "none"
 levelContainer.style.display = "flex"
 keyboard.addEventListener("click", handleClick)
 document.addEventListener("keydown", handleKeydown)
}

mode.onclick = () => {
 let nextIndex = modes.indexOf(mode.textContent) + 1
 if (!modes[nextIndex]) nextIndex = 0
 mode.textContent = modes[nextIndex]
 modeTitle.textContent = modes[nextIndex] + " mode:"
 modeDescribtion.innerHTML = modesDescribtion[nextIndex]
}

settings.onclick = () => {
 home.style.display = "none"
 settingsContainer.style.display = "block"
}

settingsBack.onclick = () => {
 settingsContainer.style.display = "none"
 home.style.display = "flex"
}

levelBack.onclick = () => {
 levelContainer.style.display = "none"
 home.style.display = "flex"
 document.removeEventListener("keydown", handleKeydown)
 questionNumber = 0
 question.textContent = nextQuestion()
 document.querySelectorAll(".heart").forEach((heart) => {
  if (heart.classList.contains("remaining-heart")) return
  heart.style.opacity = 1
  heart.classList.add("remaining-heart")
 })
}

language.onclick = () => {
 if (language.textContent === "Persian") {
  language.textContent = "English"
  questionArray = EnglishWords
  answerArray = PersianWords
 } else {
  language.textContent = "Persian"
  questionArray = PersianWords
  answerArray = EnglishWords
 }

 questionNumber = 0
 question.textContent = nextQuestion()
 toggleKeyboards()
}

function addLetter(letter) {
 if (answer.textContent.length > 15) return
 answer.textContent += letter
}

function removeLetter() {
 if (answer.textContent.length === 0) return
 answer.textContent = answer.textContent.slice(0, -1)
}

function check() {
 if (answer.textContent.length === 0) return
 if (answerArray[questionNumber + 1] === undefined) {
  alert("You won!")
  location.reload()
 }

 if (typeof answerArray[questionNumber] === "object") {
  if (answerArray[questionNumber].includes(answer.textContent)) proceed()
  else wrongAnswer()
 } else if (answer.textContent === answerArray[questionNumber]) proceed()
 else wrongAnswer()
}

function proceed() {
 questionNumber++
 question.textContent = nextQuestion()
 answer.textContent = ""
}

function wrongAnswer() {
 const remainingHeart = document.querySelector(".remaining-heart")
 if (remainingHeart) {
  answer.textContent = ""
  remainingHeart.style.opacity = "0.2"
  remainingHeart.classList.remove("remaining-heart")
  if (!document.querySelector(".remaining-heart")) lose()
 }
}

function lose() {
 location.reload()
}
