
import { Hono } from "hono";
import * as z from 'zod'
import { prisma } from '../prisma.js'
import { zValidator } from "@hono/zod-validator";
import xss from 'xss'

export const app = new Hono();

// schema úr prisma
//
// model News {
//   id        Int     @id @default(autoincrement())
//   title     String
//   excerpt   String
//   content   String
//   published Boolean @default(false)
//   author    Author  @relation(fields:  [authorId], references: [id])
//   authorId  Int
// }

const pagingSchema = z.object({
  limit: z.coerce.number().min(1).max(100).optional().default(10),
  offset: z.coerce.number().min(0).max(100).optional().default(0)
}).strict()

const newsSchema = z.object({
  // id tekinn inn sem parameter í routing, þannig getum ekki parse-að
  title: z.string().min(1).max(200),
  excerpt: z.string().min(1).max(500),
  content: z.string().min(1),
  published: z.coerce.boolean().optional(),
  authorId: z.coerce.number().int().positive(),
}).strict()


// Tekur við offset og limit querystring breytum sem stýra paging
// ef valid, annars e-ð default
app.get('/',
  zValidator('query', pagingSchema),

  async (c) => {
    const limit = c.req.valid('query').limit
    const offset = c.req.valid('query').offset

    const news = await prisma.author.findMany({ skip: offset, take: limit })
    const newsCount = await prisma.author.count()

    if (!news) { return c.json({ error: 'internal error' }, 500) }

    const response = {
      data: news,
      paging: {
        limit,
        offset,
        count: newsCount,
      }
    }

    return c.json({ data: response }, 200)
  })


app.get('/:id', async (c) => {
  const id = c.req.param('id');

  const news = await prisma.news.findUnique({
    where: { id: Number(id) },
  });

  if (!news) {
    return c.json({ error: 'not found' }, 404)
  }

  return c.json({ data: news }, 200);
})

app.delete('/:id', async (c) => {
  const id = c.req.param('id');

  const news = await prisma.news.findUnique(
    { where: { id: Number(id) }, })

  if (!news) { return c.json({ error: 'news not found' }, 404) }


  const deletedNews = await prisma.news.delete({
    where: { id: Number(id) },
  })

  if (!deletedNews) { return c.json({ error: 'internal error' }, 500) }

  return c.json(null, 200);
})


// schema úr prisma
//
// model News {
//   id        Int     @id @default(autoincrement())
//   title     String
//   excerpt   String
//   content   String
//   published Boolean @default(false)
//   author    Author  @relation(fields:  [authorId], references: [id])
//   authorId  Int
// }
app.put('/:id',
  zValidator('json', newsSchema, (result, c) => {
    if (!result.success) {
      return c.json({ error: 'bad request (zod error)' }, 400)
    }
  }),

  async (c) => {

    const id = Number(xss(c.req.param('id')))
    const title = xss(c.req.valid('json').title)
    const excerpt = xss(c.req.valid('json').excerpt)
    const content = xss(c.req.valid('json').content)
    const published = xss(c.req.valid('json').published)

    const authorId = xss(c.req.valid('json').authorId)


    const authorId = await prisma.author.findUnique(
      { where: { id: Number(id) }, })

    if (!authorId) { return c.json({ error: 'author not found' }, 404) }

    const updatedAuthor = await prisma.author.update({
      where: { id: id },
      data: { name: name, email: email },
    });
//
//
//     if (!updatedAuthor) {
//       return c.json({ error: 'internal error' }, 500)
//     }
//
//     return c.json({ data: updatedAuthor }, 200)
//
//   })
//
//
// app.post('/',
//   zValidator('json', authorSchema, (result, c) => {
//     if (!result.success) {
//       return c.json({ error: 'bad request (zod error)' }, 400)
//     }
//   }),
//   async (c) => {
//
//     const email = xss(c.req.valid('json').email)
//     const name = xss(c.req.valid('json').name)
//
//     const author = await prisma.author.create({
//       data: {
//         email: email,
//         name: name,
//       },
//     });
//
//     if (!author) {
//       return c.json({ error: 'internal error' }, 500)
//     }
//
//     return c.json({ data: author }, 201)
//   })
