import path from 'path'
import { PrismaClient } from '../../dist/client'
import xlsx from 'xlsx'

type ProductRow = {
  'Menu(s) Name': string
  Description: string
  Hot: string
  Cold: string
  'Price (For Bakery)': string
  'No.': string
}

export const seedProducts = async () => {
  const db = new PrismaClient()

  const workbook = xlsx.readFile(path.resolve(__dirname, './data/store-menu.xlsx'))

  const sheetName = 'Menu & Details'

  const sheet = workbook.Sheets[sheetName]
  const rows: ProductRow[] = xlsx.utils.sheet_to_json(sheet)

  for (const row of rows) {
    const productName = row['Menu(s) Name']
    const description = row['Description']

    // Create a product_template entry
    const productTemplate = await db.product_template.create({
      data: {
        name: productName ? { en_US: productName } : {},
        description: description ? { en_US: description } : {},
        detailed_type: 'consu',
        sale_ok: true,
        purchase_ok: true,
        active: true,
        uom_id: 1,
        uom_po_id: 1,
        tracking: 'none',
        categ_id: 1,
        sequence: 1,
        available_in_pos: true,
        list_price: parseFloat(row['Hot']),
      },
    })

    const variants = [
      { name: 'Hot', price: parseFloat(row['Hot']), defaultCodeSuffix: 'HOT' },
      {
        name: 'Cold',
        price: parseFloat(row['Cold']),
        defaultCodeSuffix: 'COLD',
      },
      {
        name: 'Bakery',
        price: parseFloat(row['Price (For Bakery)']),
        defaultCodeSuffix: 'BAKERY',
      },
    ]

    for (const variant of variants) {
      if (!isNaN(variant.price)) {
        await db.product_product.create({
          data: {
            product_tmpl_id: productTemplate.id,
            default_code: `PROD-${row['No.']}-${variant.defaultCodeSuffix}`,
            active: true,
          },
        })

        console.log(
          `Seeded product variant: ${productName} (${variant.name}) with price: ${variant.price}`,
        )
      }
    }
  }

  console.log('Seeding completed.')
}
