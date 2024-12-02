import fs from 'node:fs/promises'

const input = await fs.readFile('./Input/day2.txt', 'utf8')
// const input = `7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9`

const lines = input.split('\n')
const reports = lines.map(l => l.split(' ').map(v => parseInt(v, 10)))

const DELTA_MIN = 1
const DELTA_MAX = 3

//? Part 1
{
  let nbSafe = 0
  for (const report of reports) {
    const lvl0 = report[0]
    const lvl1 = report[1]
    const sens = Math.sign(lvl1 - lvl0)

    let isSafe = true
    let nbSafeError = 1
    let curLevel = lvl0
    for (let j = 1; j < report.length; j++) {
      const nextLevel = report[j]
      const deltaSign = nextLevel - curLevel
      if (sens === -1 && deltaSign > 0 || sens === 1 && deltaSign < 0) {
        console.log('BREK1', report, curLevel, nextLevel, deltaSign)
        isSafe = false
        break
      }
      const deltaAbs = Math.abs(deltaSign)
      if (deltaAbs < DELTA_MIN || deltaAbs > DELTA_MAX) {
        isSafe = false
        break
      }
      curLevel = nextLevel

    }
    if (isSafe) { nbSafe++ }
  }
  console.log(nbSafe)
}


//? Part 2
{
  let nbSafe = 0
  for (const report of reports) {
    const lvl0 = report[0]
    const lvl1 = report[1]
    const sens = Math.sign(lvl1 - lvl0)

    let isSafe = true
    let nbSafeErrorLefy = 1
    let curLevel = lvl0

    for (let j = 1; j < report.length; j++) {
      let nextLevel = report[j]
      const deltaSign = nextLevel - curLevel
      if (sens === -1 && deltaSign > 0 || sens === 1 && deltaSign < 0) {
        if (nbSafeErrorLefy > 0) {
          nbSafeErrorLefy -= 1
          nextLevel = curLevel
        } else {
          isSafe = false
          break
        }
      }
      const deltaAbs = Math.abs(deltaSign)
      if (deltaAbs < DELTA_MIN || deltaAbs > DELTA_MAX) {
        if (nbSafeErrorLefy > 0) {
          nbSafeErrorLefy -= 1
          nextLevel = curLevel
        } else {
          isSafe = false
          break
        }
      }
      curLevel = nextLevel
    }
    if (isSafe) { nbSafe++ }
  }
  console.log(nbSafe)
}

