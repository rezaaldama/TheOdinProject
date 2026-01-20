const container = document.querySelector('#container')

let createGrid = function (numberGrid = 4) {
    if (numberGrid > 0 && numberGrid <= 100) {
        for (let i = 0; i < numberGrid; i++) {
            const rowContainer = document.createElement('div')
            rowContainer.classList.add('grid-row')

            for (let j = 0; j < numberGrid; j++) {
                const newBox = document.createElement('div')
                newBox.classList.add('grid-item')
                newBox.addEventListener('mouseenter', () => {
                    newBox.style.backgroundColor = 'black'
                })
                newBox.addEventListener('mouseleave', () => {
                    newBox.style.backgroundColor = 'white'
                })
                rowContainer.appendChild(newBox)
            }
            container.appendChild(rowContainer)
        }
    } else {
        return console.log('Please enter a number between 0 and 100!')
    }
}

const btn = document.querySelector('#button')
btn.addEventListener('click', () => {
    let numberGrid = prompt('Please enter a number between 0 and 100!')
    numberGrid = Number(numberGrid)

    // Reset the grid
    container.innerHTML = ''

    // Recreate the grid
    createGrid(numberGrid)
})

createGrid()
