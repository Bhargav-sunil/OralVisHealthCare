const dotenv = require("dotenv");
dotenv.config();

require("./config/database"); // ensure tables exist

const bcrypt = require("bcryptjs");
const { getUserByEmail, createUser } = require("./models/user.model");

async function upsertUser({ name, email, password, role }) {
  const existing = await getUserByEmail(email);
  if (existing) {
    console.log(`ℹ️  User exists: ${email}`);
    return existing.id;
  }
  const hash = await bcrypt.hash(password, 10);
  const id = await createUser({ name, email, password: hash, role });
  console.log(`✅ Created user ${email} (id=${id}, role=${role})`);
  return id;
}

(async () => {
  try {
    await upsertUser({
      name: "Technician One",
      email: "tech@example.com",
      password: "tech123",
      role: "technician",
    });
    await upsertUser({
      name: "Dentist One",
      email: "dentist@example.com",
      password: "dentist123",
      role: "dentist",
    });
    process.exit(0);
  } catch (e) {
    console.error("Seed error:", e);
    process.exit(1);
  }
})();
