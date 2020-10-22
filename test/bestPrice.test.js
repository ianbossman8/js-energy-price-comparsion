const assert = require('assert')
const bestPrice = require('../bestPrice')

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

describe('price', function () {
  describe('given annualusage of 1000 ', function () {
    it('should return sorted providers', function () {
      const annualUsage = 1000
      const bestDeals = bestPrice(mockPlans, annualUsage)

      assert.deepStrictEqual(bestDeals, [
        ['eon', 'variable', 108.68],
        ['edf', 'fixed', 111.25],
        ['ovo', 'standard', 120.23],
        ['bg', 'standing-charge', 121.33],
      ])
    })
  })

  describe('given annualusage of negative number ', function () {
    it('should return an error message', function () {
      const annualUsage = -1
      const errorMesage = bestPrice(mockPlans, annualUsage)

      assert.strictEqual(errorMesage, 'annual usage has to be larger than 0')
    })
  })
})
