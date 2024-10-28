import path from 'path'
import { PrismaClient } from '../../dist/client'
import xlsx from 'xlsx'

type ProductRow = {
  'Menu(s) Name': string
  Description: string
  Hot: string
  Cold: string
  'Price (For Bakery)': string
  'Images (Hot)': Buffer
  'Images (Cold)': Buffer
  'Images (Bakery)': Buffer
  'No.': string
}

const db = new PrismaClient()

export const seedProducts = async () => {
  const workbook = xlsx.readFile(
    path.resolve(__dirname, './data/store-menu.xlsx'),
    { cellDates: true, cellNF: false, cellText: false },
  )
  const sheetName = 'Menu & Details'
  const sheet = workbook.Sheets[sheetName]
  const rows: ProductRow[] = xlsx.utils.sheet_to_json(sheet, { raw: true })

  for (const [index, row] of rows.entries()) {
    const baseName = row['Menu(s) Name']
    const description = row['Description']
    const hotPrice = parseFloat(row['Hot'])
    const coldPrice = parseFloat(row['Cold'])
    const bakeryPrice = parseFloat(row['Price (For Bakery)'])
    const hotImage = row['Images (Hot)']
    const coldImage = row['Images (Cold)']
    const bakeryImage = row['Images (Bakery)']

    const createProduct = async (
      name: string,
      price: number,
      image: Buffer | null,
    ) => {
      if (!isNaN(price)) {
        const productTemplate = await db.product_template.create({
          data: {
            name: name ? { en_US: name } : {},
            description: description ? { en_US: description } : {},
            type: 'service',
            detailed_type: 'service',
            sale_ok: true,
            purchase_ok: true,
            active: true,
            uom_id: 1,
            uom_po_id: 1,
            tracking: 'none',
            categ_id: 1,
            sequence: 1,
            available_in_pos: true,
            list_price: price.toFixed(2),
            create_date: new Date(),
            write_date: new Date(),
            can_image_1024_be_zoomed: false,
            create_uid: 1,
            write_uid: 1,
            default_code: 'BASH',
            volume: 0.0,
            weight: 0.01,
            has_configurable_attributes: false,
          },
        })

        await db.product_product.create({
          data: {
            product_tmpl_id: productTemplate.id,
            active: true,
            create_date: new Date(),
            write_date: new Date(),
            create_uid: 1,
            write_uid: 1,
            barcode: 'BASH',
            default_code: 'BASH',
            volume: 0.0,
            weight: 0.01,
            can_image_variant_1024_be_zoomed: false,
          },
        })
        console.log(
          `Seeded product: ${name} with price: ${price} and image: ${imageUrl}`,
        )
      }
    }

    // Create "Hot" product
    if (!isNaN(hotPrice)) {
      const hotName = `Hot ${baseName}`
      console.log('Hot Image: ', hotImage)
      await createProduct(hotName, hotPrice, hotImage)
    }

    // Create "Iced" product
    if (!isNaN(coldPrice)) {
      const icedName = `Iced ${baseName}`
      await createProduct(icedName, coldPrice, coldImage)
    }

    // Create Bakery product without prefix
    if (!isNaN(bakeryPrice)) {
      await createProduct(baseName, bakeryPrice, bakeryImage)
    }
  }

  console.log('Seeding completed.')
}

seedProducts()
  .catch(error => {
    console.error('Error during seeding:', error)
  })
  .finally(async () => {
    await db.$disconnect()
  })
