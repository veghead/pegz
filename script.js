
function boot()
{
    let colours = [
        {'name': 'orange'}, {'name': 'lightblue'}, {'name': 'lightgreen'}, {'name': 'red'}, {'name':'blue'}, {'name':'yellow'}, {'name':'green'}]
    let lobby = document.getElementById('lobby')
    let cur_col = 'yellow'

    function newDot(x, y, col) {
        let dot = document.createElement('div')
        dot.className = "hole"
        dot.style.left = x + "px"
        dot.style.top = y + "px"
        dot.state = 'hole'
        dot.x = x
        dot.y = y
        dot.addEventListener('click', (event) => {
            let d = event.target
            if (d.state == 'hole') {
                d.style.backgroundImage="url('" + cur_col + "-peg.png')"
                d.state = cur_col
            } else {
                d.style.backgroundImage="url('peg-hole.png')"
                d.state = 'hole'
            }
        })
        return(dot)
    }

    function setState(state) {
        cur_col = state
    }

    function newColour(colname) {
        let col = document.createElement('div')
        col.className ='colourblock'
        col.state = colname
        col.style.backgroundColor = colname
        col.addEventListener('click', (event) => {
            setState(event.target.state)
        })
        return(col)
    }

    for (y = 0; y < 50 ; y++) {
        for (x = 0; x < 25 ; x++) {
            lobby.appendChild(newDot(80 * x, 80 * y, cur_col))
        }
    }

    colours.forEach((val) => {
        let c = document.getElementById('controls')
        let col = document.createElement('div')
        c.appendChild(newColour(val['name']))
    })
}


