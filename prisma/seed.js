require('dotenv').config();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('123456', 10);
  const users = [
    { name:'Ozan Güldümen', email:'ozan@modulerotomasyon.com', isPartner:true },
    { name:'Celal Eşli', email:'celal@modulerotomasyon.com', isPartner:true }
  ];
  for (const user of users) {
    await prisma.user.upsert({
      where:{ email:user.email },
      update:{ name:user.name, isActive:true, isPartner:true },
      create:{ ...user, passwordHash, isActive:true }
    });
  }
  console.log('Seed tamamlandı. Varsayılan şifre: 123456');
}
main().catch(e=>{console.error(e);process.exit(1)}).finally(()=>prisma.$disconnect());
