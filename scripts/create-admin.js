const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "..", "data");
const usersFilePath = path.join(dataDir, "users.json");

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize users file if it doesn't exist
if (!fs.existsSync(usersFilePath)) {
  fs.writeFileSync(usersFilePath, JSON.stringify([], null, 2));
}

async function createAdmin() {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (query) =>
    new Promise((resolve) => readline.question(query, resolve));

  try {
    const email = await question("Enter admin email: ");
    const password = await question("Enter admin password: ");
    const name = await question("Enter admin name (optional): ");

    if (!email || !password) {
      console.error("Email and password are required!");
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

    // Check if user already exists
    if (users.find((u) => u.email === email)) {
      console.error("User with this email already exists!");
      process.exit(1);
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      name: name || undefined,
      role: "admin",
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    console.log("Admin user created successfully!");
    console.log(`Email: ${email}`);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  } finally {
    readline.close();
  }
}

createAdmin();

