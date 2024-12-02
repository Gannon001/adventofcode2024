import fs from 'node:fs/promises'

const input = await fs.readFile('./Input/day1.txt', 'utf8')
// const input = `3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3`

const lines = input.split('\n')
const [list1, list2] = lines.reduce(([l1, l2], line) => {
  const [n1, n2] = line.split('   ').map(v => parseInt(v, 10))
  return [
    [...l1, n1],
    [...l2, n2]
  ]
}, [[], []])

list1.sort()
list2.sort()

//? Part 1
// const distances = list1.map((n1, i) => Math.abs(n1 - list2[i]))
// const totalDistance = distances.reduce((acc, d) => acc + d, 0)

// console.log({ list1, list2 })
// console.log(distances)
// console.log(totalDistance)


//? Part 2
const mapCountList2 = list2.reduce((acc, v) => {
  if (acc[v]) {
    acc[v] += 1
  } else {
    acc[v] = 1
  }
  return acc
}, {})
let detailsSimilarityScore = []
for (const v of list1) {
  detailsSimilarityScore.push(v * (mapCountList2[v] ?? 0))
}
const totalScore = detailsSimilarityScore.reduce((acc, v) => acc + v, 0)

console.log(totalScore)

