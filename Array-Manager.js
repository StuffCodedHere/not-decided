import Persian_Words from "./Persian_Words.js"
import English_Words from "./English_Words.js"

const persianWordsArray = Persian_Words
const englishWordsArray = English_Words

function repeatedWords(array) {
 const wordCount = {}

 array.forEach((item) => (wordCount[item] = (wordCount[item] || 0) + 1))

 const noRepeat = Object.values(wordCount).every((value) => value === 1)
 if (noRepeat) console.log("There are no repeated words!")
 else for (const word in wordCount) console.log(`${word} has repeated itself ${wordCount[word]} times.`)
}

repeatedWords(persianWordsArray)
repeatedWords(englishWordsArray)
