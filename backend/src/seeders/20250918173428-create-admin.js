import bcrypt from "bcryptjs";

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("admin_users", [
      {
        first_name: "Admin",
        last_name: "User",
        email: "admin@example.com",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("admin_users", { email: "admin@example.com" });
  },
};
