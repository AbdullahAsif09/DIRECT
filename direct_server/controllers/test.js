const Admin = require("../modals/admin/admin"); // Adjust the path accordingly

const createAdminUser = async (userDetails) => {
  try {
    const { email, firstName, phone, lastName, password, role } = userDetails;

    // Create a new Admin instance
    const newAdmin = new Admin({
      email,
      firstName,
      phone,
      lastName,
      password,
      role: role || ["subadmin"], // Default role if none provided
      verification: {
        verified: true,
      },
      profileComplete: true,
      verify: true,
    });

    // Save the new Admin to the database
    const savedAdmin = await newAdmin.save();
    console.log("Admin user created successfully: ", savedAdmin);

    return savedAdmin;
  } catch (error) {
    console.error("Error creating admin user:", error);
    throw error;
  }
};
const createOrganization = async (userDetails) => {
  try {
    const { email, firstName, phone, lastName, password, role } = userDetails;

    // Create a new Admin instance
    const newAdmin = new Admin({
      email,
      firstName,
      phone,
      lastName,
      password,
      role: role || ["subadmin"], // Default role if none provided
      verification: {
        verified: true,
      },
      profileComplete: true,
      verify: true,
    });

    // Save the new Admin to the database
    const savedAdmin = await newAdmin.save();
    console.log("Admin user created successfully: ", savedAdmin);

    return savedAdmin;
  } catch (error) {
    console.error("Error creating admin user:", error);
    throw error;
  }
};
module.exports = { createAdminUser, createOrganization };

// createAdminUser({
//   email: "ishaq10866@gmail.com",
//   firstName: "Muhammad",
//   lastName: "Ishaq",
//   phone: "03477631929",
//   role: "super",
//   password: "ishaq10866",
// });
