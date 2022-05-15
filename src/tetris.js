// Hello O_o
"use strict"
let canvas = document.querySelector("#thecanvas")
let scoreboard = document.querySelector("#scoreboard")
let score = 0
let ctx = canvas.getContext("2d")
ctx.scale(BLOCK_SIDE_LENGTH, BLOCK_SIDE_LENGTH)
let model = new GameModel(ctx)

setInterval(() => {
    newGameState()
}, GAME_CLOCK)

let newGameState = () => {
    fullSend()
    if(model.fallingPiece === null){
        const rand = Math.round(Math.random() * 6) + 1
        const newPiece = new Piece(SHAPES[rand], ctx)
        model.fallingPiece = newPiece
        model.moveDown()
    } else {
        model.moveDown()
    }
}

const fullSend = () => {
    const allFilled = (row) => {
        for(let x of row){
            if(x === 0){
                return false
            }
        }
        return true
    }
    for(let i = 0; i < model.grid.length; i++){
        if(allFilled(model.grid[i])){
            score += SCORE_WORTH
            model.grid.splice(i, 1)
            model.grid.unshift([0,0,0,0,0,0,0,0,0,0])
        }
    }
    scoreboard.innerHTML = `Score: ${score}`
}

document.addEventListener("keydown", (e) => {
    e.preventDefault()
    switch(e.key){
        case "w":
            model.rotate()
            break
        case "d":
            model.move(true)
            break
        case "a":
            model.move(false)
            break
        case "s":
            model.moveDown()
            break
    }
})
