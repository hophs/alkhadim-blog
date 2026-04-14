import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Deleting all posts...");
  const posts = await prisma.post.deleteMany();
  
  console.log("Deleting all categories...");
  const categories = await prisma.category.deleteMany();

  console.log(`Successfully deleted ${posts.count} posts and ${categories.count} categories.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });