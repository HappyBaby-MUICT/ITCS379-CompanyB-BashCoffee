import { PrismaClient } from '../../dist/client'
import { seedProducts } from './products.seed'

;(async () => {
  console.log('Seeding product')
  await seedProducts()
})()
