import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const RAM_OPTION = [8, 16, 32]; // Available RAM options
const COLOR = ['Black', 'White', 'Silver', 'Gold']; // Available colors
const STORAGE_OPTION = ['128', '256', '512', '1TB']; // Available storage options
const OS_VERSION = ['iOS 15', 'iOS 16']; // Available OS versions

async function main() {
  // Generate manufacturer
  const manufacturer = await prisma.manufacturer.create({
    data: {
      name: 'Apple',
    },
  });

  // Generate product series for iPhone 14 and 15
  const productSeries = [];
  for (let i = 14; i <= 15; i++) {
    const series = await prisma.productSeries.create({
      data: {
        manufacturer_id: manufacturer.id,
        name: `iPhone ${i}`,
        release_year: 2022,
      },
    });
    productSeries.push(series);
  }

  // Generate product models (mini, plus, promax) for each product series
  const productModels = [];
  for (const series of productSeries) {
    const models = ['mini', 'plus', 'promax'];
    for (const model of models) {
      const productModel = await prisma.productModel.create({
        data: {
          product_series_id: series.id,
          name: `${series.name} ${model}`,
        },
      });
      productModels.push(productModel);
    }
  }

  // Generate configurations for each product model
  for (const model of productModels) {
    await prisma.configuration.create({
      data: {
        ram: faker.helpers.arrayElement(RAM_OPTION),
        color: faker.helpers.arrayElement(COLOR),
        storage_capacity: faker.helpers.arrayElement(STORAGE_OPTION),
        os_version: faker.helpers.arrayElement(OS_VERSION),
        product_variant: {
          create: {
            product_model_id: model.id,
            imei: faker.phone.imei(), // Generate a fake IMEI
            inventory: {
              create: {
                price: +faker.commerce.price({
                  min: 100,
                  max: 200,
                  dec: 2,
                }), // Generate a random price
                quantity: faker.datatype.number({ min: 0, max: 100 }), // Generate a random quantity
              },
            },
          },
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
