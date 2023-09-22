import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("Password123.,", 8);

  const admin = await prisma.user.upsert({
    where: { email: "admin@domain.com" },
    update: {
      email: "admin@domain.com",
      name: "Admin domain",
      password,
    },
    create: {
      email: "admin@domain.com",
      name: "Admin Admin",
      password,
    },
  });

  console.log({ admin });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });