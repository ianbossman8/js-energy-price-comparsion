function annualEnergyUsage(plans, supplier, plan, spend) {
  try {
    if (spend <= 0) {
      throw new Error('spending has to be larger than 0')
    }

    let standingCharge = 0

    const chosenPlanRates = plans.reduce((chosenProviderRate, curProvider) => {
      if (curProvider.supplier === supplier && curProvider.plan === plan) {
        chosenProviderRate = curProvider.rates

        if (typeof curProvider.standing_charge !== 'undefined') {
          standingCharge = curProvider.standing_charge
        }
      }

      return chosenProviderRate
    }, undefined)

    if (typeof chosenPlanRates === 'undefined') {
      throw new Error('plan does not exist')
    }

    const annualSpending = spend * 100 * 12
    const vat = 1.05

    let affordableEnergy = 0
    let remainingBudget = (annualSpending - standingCharge * 365 * vat) / vat

    chosenPlanRates.map((rate) => {
      const { price, threshold } = rate

      if (typeof threshold === 'undefined' || remainingBudget - threshold * price < 0) {
        affordableEnergy += remainingBudget / price
        remainingBudget = 0
      } else {
        affordableEnergy += threshold
        remainingBudget -= threshold * price
      }
    })

    console.log(Math.round(affordableEnergy))

    return Math.round(affordableEnergy)
  } catch (error) {
    console.log(`${error.message} \n`)

    return error.message
  }
}

module.exports = annualEnergyUsage
