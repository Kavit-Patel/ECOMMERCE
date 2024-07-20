import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  // Creating 100 categories with Faker
  const categoryPromises = Array.from({ length: 100 }, () => {
    return prisma.category.create({
      data: {
        name: faker.commerce.department(),
      },
    });
  });

  // Await all promises
  await Promise.all(categoryPromises);
}

// Self-invoking function to handle async code
void (async function main() {
  try {
    await seed();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect().catch((e) => {
      console.error("Error disconnecting from the database:", e);
    });
  }
})();
