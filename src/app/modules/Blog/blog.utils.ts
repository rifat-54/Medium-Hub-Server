import slugify from "slugify";
import { prisma } from "../../lib/prisma";

export const generateSlugFromTitle = async (title: string) => {
    const baseSlug = slugify(title, {
        lower: true,
        strict: true,
        trim: true
    })

    if (!baseSlug) {
        throw new Error("Failed to generate slug,Invalid blog title")
    }

    let slug = baseSlug;
    let counter = 2;

    while (await prisma.blog.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
}