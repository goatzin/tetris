class GameModel{
    constructor(ctx){
        this.ctx = ctx
        this.fallingPiece = null
        this.grid = this.makeStartingGrid()
    }

    makeStartingGrid(){
        let grid = []
        for(let r = 0; r < ROW; r++){
            grid.push([])
            for(let c = 0; c < COLUMN; c++){
                grid[grid.length - 1].push(0)
            }
        }
        return grid
    }

    collision(x, y){
        const shape = this.fallingPiece.shape
        const len = shape.length
        for(let i = 0; i < len; i++){
            for(let j = 0; j < len; j++){
                if(shape[i][j] > 0){
                    let c = x + j
                    let r = y + i
                    if(c >= 0 && c < COLUMN && r < ROW){
                        // in bounds
                        if(this.grid[r][c] > 0){
                            return true
                        }
                    } else {
                        return true
                    }
                }
            }
        }
        return false
    }

    renderGameState(){
        for(let r = 0; r < this.grid.length; r++){
            for(let c = 0; c < this.grid[c].length; c++){
                let cell = this.grid[r][c]
                this.ctx.fillStyle = COLORS[cell]
                this.ctx.fillRect(c, r, 1, 1)
            }
        }
        if(this.fallingPiece !== null){
            this.fallingPiece.renderPiece()
        }
    }

    moveDown(){
        if(this.fallingPiece === null){
            this.renderGameState()
            return
        } else if(this.collision(this.fallingPiece.x, this.fallingPiece.y + 1)){
            const shape = this.fallingPiece.shape
            const x = this.fallingPiece.x
            const y = this.fallingPiece.y
            shape.map((row, i) => {
                row.map((cell, j) => {
                    let c = x + j
                    let r = y + i
                    if(c >= 0 && c < COLUMN && r < ROW && cell > 0){
                        this.grid[r][c] = shape[i][j]
                    }
                })
            })

            // check gameOver O_o
            if(this.fallingPiece.y === 0) {
                alert("Game Over!!!!!")
                this.grid = makeStartingGrid()
            }
            this.fallingPiece = null
        } else {
            this.fallingPiece.y += 1
        }
        this.renderGameState()
    }

    move(right){
        if(this.fallingPiece === null){
            return
        }

        let x = this.fallingPiece.x
        let y = this.fallingPiece.y
        if(right){
            if(!this.collision(x + 1, y)){
                this.fallingPiece.x += 1
            }
        } else {
            if(!this.collision(x - 1, y)){
                this.fallingPiece.x -= 1
            }
        }
        this.renderGameState()
    }

    rotate(){
        if(this.fallingPiece !== null){
            let shape = this.fallingPiece.shape
            for(let y = 0; y < shape.length; y++){
                for(let x = 0; x < y; x++){
                    [this.fallingPiece.shape[x][y], this.fallingPiece.shape[y][x]] =
                    [this.fallingPiece.shape[y][x], this.fallingPiece.shape[x][y]]
                }
            }

            this.fallingPiece.shape.forEach((row => row.reverse()))
        }
        this.renderGameState()
    }
}
