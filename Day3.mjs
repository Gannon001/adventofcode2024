import fs from 'node:fs/promises'

const input = await fs.readFile('./Input/day3.txt', 'utf8')
const input2 = input

// const input = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`
// const input2 = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"

//? Part 1
{
  const opeMuls = [...input.matchAll(/mul\(\d{1,3},\d{1,3}\)/g)]
  const result = opeMuls.reduce((acc, [mul]) => {
    const [op1, op2] = mul
      .substring(4, mul.length - 1)
      .split(',')
      .map(i => parseInt(i, 10))
    return acc + (op1 * op2)
  }, 0)
  console.log("Part 1 :", result)
}


//? Part 2
{
  const searchs = ["don't()", "do()"]
  let input2Active = input2
  while (true) {
    let nextIndexDont = input2Active.indexOf(searchs[0])
    if (nextIndexDont === -1) {
      break
    }
    let nextIndexDo = input2Active.indexOf(searchs[1], nextIndexDont)

    if (nextIndexDo === -1) {
      input2Active = input2Active.slice(0, nextIndexDont)
      break
    }

    input2Active = input2Active.slice(0, nextIndexDont)
      + input2Active.slice(nextIndexDo + searchs[1].length)
  }
  const opeMuls = [...input2Active.matchAll(/mul\(\d{1,3},\d{1,3}\)/g)]
  const result = opeMuls.reduce((acc, [mul]) => {
    const [op1, op2] = mul
      .substring(4, mul.length - 1)
      .split(',')
      .map(i => parseInt(i, 10))
    return acc + (op1 * op2)
  }, 0)
  console.log("Part 2 :", result)
}



