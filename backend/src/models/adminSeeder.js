import "dotenv/config";
import AdminUser from "../models/AdminUser.js";

const seedAdmin = async () => {
  try {
    // Check if an admin user already exists
    const existingAdmin = await AdminUser.findOne({
      where: { email: process.env.ADMIN_EMAIL },
    });

    if (!existingAdmin) {
      await AdminUser.create({
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      });
      console.log("✅ Admin user created successfully.");
    } else {
      console.log("ℹ️ Admin user already exists.");
    }
  } catch (error) {
    console.error("❌ Error seeding admin user:", error);
  }
};

export default seedAdmin;