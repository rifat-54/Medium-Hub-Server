import { text } from "node:stream/consumers"


import { auth } from "../lib/auth"
import { prisma } from "../lib/prisma"
import { UserRole } from "../../../generated/prisma/enums"
import { envVariables } from "../config/env"


export const seedAdmin = async () => {
    try {
        const isAdminExist = await prisma.user.findFirst({
            where: {
                role: UserRole.ADMIN
            }
        })

        if (isAdminExist) {
            console.log("admin already exists.skipping seeding admin")
            return
        }

        const AdminUser = await auth.api.signUpEmail({
            body: {
                email: envVariables.ADMIN.email,
                password: envVariables.ADMIN.pass,
                name: "Admin",
                role: UserRole.ADMIN,
            }
        })

        const Admin = await prisma.user.update({
            where: {
                id: AdminUser.user.id
            },
            data: {
                emailVerified: true
            }
        })

        console.log("Admin Created successfully", Admin)


    } catch (error) {
        console.error("Error seeding Admin", error)
    }
}

seedAdmin()
    .finally(async () => {
        await prisma.$disconnect();
    })