document.addEventListener('DOMContentLoaded', () =>{
const squares = document.querySelectorAll('.grid div')
const timeLeft = document.querySelector('#timeLeft')
const startPause = document.querySelector('#startPause')
const result = document.querySelector('#result')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const width = 9
let currentTime = 20
let currentIndex = 76
let timerId

//render frog on starting block
squares[currentIndex].classList.add('frog')

//move frog [l,u,r,d] = keyCodes [37,38,39,40]
function moveFrog(e){
  //clear frog class to prevent "smudging"
  squares[currentIndex].classList.remove('frog')
  //handle
  switch(e.keyCode){
    case 37:
      //if not against left border
      if(currentIndex % width !== 0) currentIndex -=1
      break
    case 38:
      //if not against the top border
      if(currentIndex - width >= 0) currentIndex -= width
      break
    case 39:
      //if not against the right border
      if(currentIndex % width < width -1) currentIndex +=1
      break
    case 40:
      if(currentIndex + width <= squares.length) currentIndex += width
      break
  }
  squares[currentIndex].classList.add('frog')
  lose()
  win()
}

//win
function win() {
  if (squares[4].classList.contains('frog')){
    result.innerHTML = 'YOU WON'
    squares[currentIndex].classList.remove('frog')
    clearInterval(timerId)
    document.removeEventListener('keyup', moveFrog)
  }
}

//lose
function lose() {
  if ((timeLeft === 0) ||
      (squares[currentIndex].classList.contains('c1')) ||
      (squares[currentIndex].classList.contains('l4')) ||
      (squares[currentIndex].classList.contains('l5'))){
      result.innerHTML = 'You Lose'
      squares[currentIndex].classList.remove('frog')
      clearInterval(timerId)
      document.removeEventListener('keyup', moveFrog)
    }

}

//frogOnALog - frog on a log moves with the log
function frogOnALogLeft() {
  if (currentIndex >= 27 && currentIndex < 35){
    squares[currentIndex].classList.remove('frog')
    currentIndex += 1
    squares[currentIndex].classList.add('frog')

  }
}

function frogOnALogRight() {
  if (currentIndex > 18 && currentIndex <= 26){
    squares[currentIndex].classList.remove('frog')
    currentIndex -= 1
    squares[currentIndex].classList.add('frog')

  }
}

//move cars
function autoMoveCars() {
  carsLeft.forEach(carLeft => moveCarLeft(carLeft))
  carsRight.forEach(carRight => moveCarRight(carRight))
}

//move the cars left on a time loop
function moveCarLeft(carLeft){
  switch(true){
    case carLeft.classList.contains('c1'):
      carLeft.classList.remove('c1')
      carLeft.classList.add('c2')
      break
    case carLeft.classList.contains('c2'):
      carLeft.classList.remove('c2')
      carLeft.classList.add('c3')
      break
    case carLeft.classList.contains('c3'):
      carLeft.classList.remove('c3')
      carLeft.classList.add('c1')
      break
  }
}

//move the cars right on a time loop
function moveCarRight(carRight){
  switch(true){
    case carRight.classList.contains('c1'):
      carRight.classList.remove('c1')
      carRight.classList.add('c3')
      break
    case carRight.classList.contains('c2'):
      carRight.classList.remove('c2')
      carRight.classList.add('c1')
      break
    case carRight.classList.contains('c3'):
      carRight.classList.remove('c3')
      carRight.classList.add('c2')
      break
  }
}

//move logs
function autoMoveLogs(){
  logsLeft.forEach(logLeft => moveLogLeft(logLeft))
  logsRight.forEach(logRight => moveLogRight(logRight))
}

//move logs left on a time loop
function moveLogLeft(logLeft){
  switch(true){
    case logLeft.classList.contains('l1'):
      logLeft.classList.remove('l1')
      logLeft.classList.add('l2')
      break
    case logLeft.classList.contains('l2'):
      logLeft.classList.remove('l2')
      logLeft.classList.add('l3')
      break
    case logLeft.classList.contains('l3'):
      logLeft.classList.remove('l3')
      logLeft.classList.add('l4')
      break
    case logLeft.classList.contains('l4'):
      logLeft.classList.remove('l4')
      logLeft.classList.add('l5')
      break
    case logLeft.classList.contains('l5'):
      logLeft.classList.remove('l5')
      logLeft.classList.add('l1')
      break
  }
}

//move logs right on a time loop
function moveLogRight(logRight){
  switch(true){
    case logRight.classList.contains('l1'):
      logRight.classList.remove('l1')
      logRight.classList.add('l5')
      break
    case logRight.classList.contains('l2'):
      logRight.classList.remove('l2')
      logRight.classList.add('l1')
      break
    case logRight.classList.contains('l3'):
      logRight.classList.remove('l3')
      logRight.classList.add('l2')
      break
    case logRight.classList.contains('l4'):
      logRight.classList.remove('l4')
      logRight.classList.add('l3')
      break
    case logRight.classList.contains('l5'):
      logRight.classList.remove('l5')
      logRight.classList.add('l4')
      break
  }
}

function movePieces(){
  currentTime--
  timeLeft.textContent = currentTime
  autoMoveCars()
  autoMoveLogs()
  frogOnALogLeft()
  frogOnALogRight()
  lose()
}

//starts and pauses the game
startPause.addEventListener('click', () =>{
  if(timerId) {
    clearInterval(timerId)
  } else {
    timerId = setInterval(movePieces, 1000)
    document.addEventListener('keyup', moveFrog)
  }
})










})
