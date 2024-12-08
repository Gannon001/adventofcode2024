import fs from 'node:fs/promises'

const input = await fs.readFile('./Input/day4.txt', 'utf8')
// const input = `MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX`


const lignes = input.split(/\r?\n/)


//? Part 1
{
  const wordSearch = 'XMAS'
  const wordSearchReverse = wordSearch.split('').reverse().join('')
  const wordLength = wordSearch.length
  let nbFound = 0
  for (let y = 0; y < lignes.length; y++) {
    for (let x = 0; x < lignes[y].length; x++) {

      const lineX = lignes[y].substring(x, x + wordLength)
      const lineY = Array(wordLength).fill('').map((_, i) => {
        return lignes[y + i]?.[x]
      }).join('')
      const lineXY = Array(wordLength).fill('').map((_, i) => {
        return lignes[y + i]?.[x + i] ?? ''
      }).join('')

      const lineYX = Array(wordLength).fill('').map((_, i) => {
        return lignes[y + i]?.[x - i] ?? ''
      }).join('')

      nbFound = nbFound
        + (lineX === wordSearch) + (lineX === wordSearchReverse)
        + (lineY === wordSearch) + (lineY === wordSearchReverse)
        + (lineXY === wordSearch) + (lineXY === wordSearchReverse)
        + (lineYX === wordSearch) + (lineYX === wordSearchReverse)
    }

  }
  console.log('Part 1 :', nbFound)
}


//? Part 2
{
  let nbFound = 0
  for (let y = 1; y < lignes.length -1; y++) {
    for (let x = 1; x < lignes[y].length -1; x++) {
      if (lignes[y][x] === 'A') {
        const tl = lignes[y-1][x-1]
        const tr = lignes[y-1][x+1]
        const bl = lignes[y+1][x-1]
        const br = lignes[y+1][x+1]

        if (
          ((tl === 'M' && br === 'S') || (tl === 'S' && br === 'M'))
          &&
          ((tr === 'M' && bl === 'S') || (tr === 'S' && bl === 'M'))
        ) {
          nbFound += 1
        }
      }
    }
  }
  console.log('Part 2 :', nbFound)
}

