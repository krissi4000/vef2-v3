import { prisma } from '../src/prisma.js';
import slug from 'slug';
async function main() {
    await prisma.author.create({
        data: {
            email: 'author1@example.org',
            name: 'author one'
        }
    });
    await prisma.author.create({
        data: {
            email: 'author2@example.org',
            name: 'author two'
        }
    });
    await prisma.author.create({
        data: {
            email: 'author3@example.org',
            name: 'author three'
        }
    });
    await prisma.author.create({
        data: {
            email: 'author4@example.org',
            name: 'author four'
        }
    });
    await prisma.author.create({
        data: {
            email: 'author5@example.org',
            name: 'author five'
        }
    });
    await prisma.author.create({
        data: {
            email: 'author6@example.org',
            name: 'author six'
        }
    });
    await prisma.author.create({
        data: {
            email: 'author7@example.org',
            name: 'author seven'
        }
    });
    await prisma.author.create({
        data: {
            email: 'author8@example.org',
            name: 'author seven'
        }
    });
    await prisma.author.create({
        data: {
            email: 'author9@example.org',
            name: 'author seven'
        }
    });
    await prisma.author.create({
        data: {
            email: 'author10@example.org',
            name: 'author seven'
        }
    });
    await prisma.author.create({
        data: {
            email: 'author11@example.org',
            name: 'author seven'
        }
    });
    await prisma.news.create({
        data: {
            title: 'title1',
            excerpt: 'excerpt1',
            content: 'content1',
            published: false,
            slug: slug('title1'),
            authorId: 7
        }
    });
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
