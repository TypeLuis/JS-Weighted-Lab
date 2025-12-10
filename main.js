const csv = "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor's Assistant,26"
const csv2 = "Index,Mass (kg),Spring 1 (m),Spring 2 (m)\n1,0.00,0.050,0.050\n2,0.49,0.066,0.066\n3,0.98,0.087,0.080\n4,1.47,0.116,0.108\n5,1.96,0.142,0.138\n6,2.45,0.166,0.158\n7,2.94,0.193,0.174\n8,3.43,0.204,0.192\n9,3.92,0.226,0.205\n10,4.41,0.238,0.232"

const seperateCells = (csv) =>{

    let cells = ["", "", "", ""]
    
    let cellIndex = 0
    let rowIndex = 0
    let header = []
    const obj = {}
    
    const flush = () => {
        if(rowIndex === 0){
            header = [...cells] //spread current cells array into new array 
            rowIndex ++
        } else{
            obj[cells[1]] = {
                [header[0]] : cells[0],
                [header[1]] : cells[1],
                [header[2]] : cells[2],
                [header[3]] : cells[3]
            }
        }
        cells =  ["", "", "", ""]
        cellIndex = 0
    }

    for (let i = 0; i < csv.length; i++) {
        const char = csv[i]
    
        if (char === ",") {
            cellIndex++
        }
        else if (char === "\n") {
            flush()
        }
        else {
            cells[cellIndex] += char
        }
    }
    
    
    flush() // Handle last row if no newline at end
    return obj
}

console.table(seperateCells(csv))
console.table(seperateCells(csv2)) //ignore the fact the mass is the key 😅 can fix later if necessary
console.log(seperateCells(csv))

// PART 2
// turns it into a nested array / matrix
csvToArray = (csv) => {
    const rows = []
    let currentRow = []
    let currentCell = ""
    let columnNum = {}

    for (let i = 0; i < csv.length; i++){
        const char = csv[i]

        if(char === ","){
            currentRow.push(currentCell)
            currentCell = ""
        }
        else if(char === "\n"){
            currentRow.push(currentCell)
            rows.push(currentRow)

            columnNum[currentRow[0]] = currentRow.length

            currentRow = []
            currentCell = ""
        }
        else currentCell += char

    }

    // if there's string in currentCell or the legnth of currentRow is more than zero
    // Handles last row
    if(currentCell || currentRow.length > 0){
        currentRow.push(currentCell)
        rows.push(currentRow)
        columnNum[currentRow[0]] = currentRow.length
    }

    return {
        rows,
        columnNum
    }
}
const table1 = csvToArray(csv).rows
const table2 = csvToArray(csv2).rows
console.log(table1)

// part 3
// turns the maxtrix into an array of objs
const matrixToObj = (table) => {
    const header = table[0].map(h => h.toLowerCase())
    const array = []

    // i = 1 to ignore header
    for(let i = 1; i < table.length; i++){
        const row = table[i]
        const obj = {}

        for(let p=0; p < row.length; p++) obj[header[p]] = row[p];
        array.push(obj)
    }
    return array
}

const arrTable = matrixToObj(table1)
console.log(arrTable)


// part 4
const arrCopy = [...arrTable]
arrCopy.pop()
arrCopy["splice"](1, 0,{ id: "48", name: "Barry", occupation: "Runner", age: "25" })
arrCopy.push({ id: "7", name: "Bilbo", occupation: "None", age: "111" })
console.log(arrCopy)

// part 5

const changeToCsv = (rows) => {

    const header = Object.keys(rows[0])

    const headersLine = header.join(',')

    const data = rows.map((row) => header.map(key => row[key]).join(','))

    return [headersLine, ...data].join('\n')
}

console.log(changeToCsv(arrCopy))
