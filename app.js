const readline = require('readline')
const fs = require('fs')
const bestPrice = require('./bestPrice')
const annualEnergyUsage = require('./energyUsage')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
})

const filePathToPlans = process.argv[2]

function plansReader(path) {
  try {
    return JSON.parse(
      fs.readFileSync(path, 'utf8', (err, data) => {
        if (err) {
          throw new Error('wrong format')
        }

        return data
      })
    )
  } catch (error) {
    console.log(error.message)
    rl.close()
  }
}

const plans = plansReader(filePathToPlans)

rl.on('line', (input) => {
  const cleanedInput = input.trim().toLowerCase()
  const [command, ...args] = cleanedInput.split(' ')

  switch (command) {
    case 'price':
      if (args.length === 1) {
        bestPrice(plans, ...args)
      } else {
        console.log('price take one argument')
      }
      break
    case 'usage':
      if (args.length === 3) {
        annualEnergyUsage(plans, args[0], args[1], args[2])
      } else {
        console.log('usage take three arguments')
      }
      break
    case 'exit':
      rl.close()
    default:
      console.log('command available: price, usage, cexit')
  }
}).on('close', () => {
  console.log('thank you for using, bye')

  process.exit(0)
})
