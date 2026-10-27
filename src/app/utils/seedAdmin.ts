
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";
import { UserRole } from "../../../generated/prisma/enums";
import { envVariables } from "../config/env";

const seedAdmin = async () => {
    try {
        const existingAdmin = await prisma.user.findFirst({
            where: {
                role: UserRole.ADMIN,
            },
        });

        if (existingAdmin) {
            console.log("Admin already exists. Skipping seeding.");
            return;
        }

        console.log("Starting to seed admin...")

        const adminUser = await auth.api.signUpEmail({
            body: {
                email: envVariables.ADMIN.email,
                password: envVariables.ADMIN.pass,
                name: "Admin",
                role: UserRole.ADMIN,
            },
        });

        const admin = await prisma.user.update({
            where: {
                id: adminUser.user.id,
            },
            data: {
                emailVerified: true,
            },
        });

        console.log("Admin created successfully:", admin.email);
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exitCode = 1;
    } finally {
        await prisma.$disconnect();
    }
};

seedAdmin();

