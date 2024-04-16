const computerGeneratedArr = [];
const playerArr = [];

function initializeComputerArr(){
    while (computerGeneratedArr.length < 4) {
    let randomNumber = Math.floor(Math.random() * 10)
    if(!computerGeneratedArr.includes(randomNumber)){
        computerGeneratedArr.push(randomNumber)
    }
} 
    console.log(computerGeneratedArr);
}
initializeComputerArr()