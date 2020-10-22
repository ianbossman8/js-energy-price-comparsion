function bestPrice(plans, annualUsage) {
  try {
    if (annualUsage <= 0) {
      throw new Error('annual usage has to be larger than 0')
    }

    const deals = []
    const vat = 1.05

    plans.map((individialPlan) => {
      let remainingConsumption = annualUsage
      let totalPrice = 0

      if (typeof individialPlan.standing_charge !== 'undefined') {
        totalPrice += individialPlan.standing_charge * 365
      }

      individialPlan.rates.map((rate) => {
        const { price, threshold } = rate

        if (typeof threshold !== 'undefined') {
          remainingConsumption -= threshold

          return (totalPrice += threshold * price)
        }

        return (totalPrice += remainingConsumption * price)
      })

      deals.push([
        individialPlan.supplier,
        individialPlan.plan,
        Math.round(((totalPrice * vat) / 100 + Number.EPSILON) * 100) / 100,
      ])
    })

    deals.sort((a, b) => a[2] - b[2])

    for (let deal of deals) {
      console.log(`${deal[0]},${deal[1]},${deal[2]} \n`)
    }

    return deals
  } catch (error) {
    console.log(`${error.message} \n`)

    return error.message
  }
}

module.exports = bestPrice
