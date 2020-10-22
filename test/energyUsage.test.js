const assert = require('assert')
const energyUsage = require('../energyUsage')

const mockPlans = [
  { supplier: 'eon', plan: 'variable', rates: [{ price: 13.5, threshold: 100 }, { price: 10 }] },
  { supplier: 'ovo', plan: 'standard', rates: [{ price: 12.5, threshold: 300 }, { price: 11 }] },
  {
    supplier: 'edf',
    plan: 'fixed',
    rates: [{ price: 14.5, threshold: 250 }, { price: 10.1, threshold: 200 }, { price: 9 }],
  },
  { supplier: 'bg', plan: 'standing-charge', rates: [{ price: 9 }], standing_charge: 7 },
]

describe('enjergy usage', function () {
  describe('given a monthly spending', function () {
    describe('edf, fixed, 350', () => {
      it('should return the correct amount of energy', function () {
        const annualEnergyUsage = energyUsage(mockPlans, 'edf', 'fixed', 350)
        assert.strictEqual(annualEnergyUsage, 44267)
      })
    })

    describe('bg, standing-charge, 120', () => {
      it('should return the correct amount of energy', function () {
        const annualEnergyUsage = energyUsage(mockPlans, 'bg', 'standing-charge', 120)
        assert.strictEqual(annualEnergyUsage, 14954)
      })
    })

    describe('bg, standing-charge, 0', () => {
      it('should return the error message', function () {
        const errorMessage = energyUsage(mockPlans, 'bg', 'standing-charge', 0)
        assert.strictEqual(errorMessage, 'spending has to be larger than 0')
      })
    })
  })

  describe('given a non exist plan', () => {
    it('should return the error message', () => {
      const errorMessage = energyUsage(mockPlans, 'bg', 'fixed', 100)
      assert.strictEqual(errorMessage, 'plan does not exist')
    })
  })
})
