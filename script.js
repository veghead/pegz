/**
 * MIT No Attribution
 * Copyright 2025 dreadtech.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * Powered by http://vanilla-js.com/ 
*/

function boot()
{
    let colours = [
        {'name': 'orange'}, {'name': 'lightblue'}, {'name': 'lightgreen'}, {'name': 'red'}, {'name':'blue'}, {'name':'yellow'}, {'name':'green'}]
    let lobby = document.getElementById('lobby')
    let cur_col = 1
    let grid = []

    const newDot = (x, y, col) => {
        let dot = document.createElement('div')
        dot.className = "hole"
        dot.style.left = x * 80 + "px"
        dot.style.top = y * 80 + "px"
        dot.state = 0
        dot.x = x
        dot.y = y
        dot.setDot = (col) => {
            if (col != 0) {
                dot.style.backgroundImage="url('" + colours[col - 1]['name'] + "-peg.png')"
            } else {
                dot.style.backgroundImage="url('peg-hole.png')"
            }
            dot.state = col
        }
        dot.addEventListener('click', (event) => {
            let d = event.target
            if (d.state == '0') {
                d.setDot(cur_col)
            } else {
                d.setDot(0)
            }
        })
        return(dot)
    }

    const setState = (state) => {
        cur_col = state
    }

    const newColour = (colid) => {
        let col = document.createElement('div')
        col.className ='colourblock'
        col.state = colid + 1
        col.style.backgroundColor = colours[colid]['name']
        col.addEventListener('click', (event) => {
            setState(event.target.state)
        })
        return(col)
    }

    const exportGrid = () => {
        let s = "PZV1"
        grid.forEach((val, idx) => {
            val.forEach((dot, dix) => {
                s += dot.state
            })
            s += "\n"
        })
        download("grid.pgz", s)
    }

    const upload = (file) => {
        var reader = new FileReader();
        reader.onload = function (e) {
            console.log(e.target.result)
            importGrid(e.target.result)
        };
        reader.readAsText(file);
    }

    const download = (filename, text) => {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    const importGrid = (newGrid) => {
        if (newGrid.slice(0, 4) != "PZV1") return false;
        let row = 0
        let col = 0
        for(let i = 4; i < newGrid.length; i++ )
        {
            if (newGrid[i] == '\n') {
                row++
                col = 0
                continue
            }
            grid[row][col].setDot(newGrid[i])
            if (col < 25) {
                col++;
            } else {
                row++;
                col = 0;
            }
        }
    }

    for (y = 0; y < 50 ; y++) {
        grid[y] = []
        for (x = 0; x < 25 ; x++) {
            dot = newDot(x, y, cur_col)
            grid[y].push(dot)
            lobby.appendChild(dot)
        }
    }

    let c = document.getElementById('controls')
    colours.forEach((val, idx) => {
        c.appendChild(newColour(idx))
    })
    expBtn = document.createElement('button')
    expBtn.innerText = 'Export'
    expBtn.addEventListener('click', (event) => {
        exportGrid()
    })
    c.appendChild(expBtn)
    impBtn = document.createElement('button')
    impBtn.innerText= 'Import'
    impBtn.addEventListener('click', (event) => {
        document.getElementById('files').style.display='block'
       
    })
    c.appendChild(impBtn)
    document.getElementById('importfile').addEventListener('change', function(e) {
        document.getElementById('files').style.display='none'
        if (e.target.files[0]) {
            upload(e.target.files[0])         
        }
    })
    document.getElementById('files').addEventListener('click', function(event) {
        document.getElementById('files').style.display='none'
    })
}

