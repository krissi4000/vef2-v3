import { Hono } from "hono";
import * as z from 'zod'
import { prisma } from '../prisma.js'
import { zValidator } from "@hono/zod-validator";
import xss from 'xss'

export const app = new Hono();

const pagingSchema = z.object({
  limit: z.coerce.number().min(1).max(100).optional().default(10),
  offset: z.coerce.number().min(0).max(100).optional().default(0)
}).strict()

const authorSchema = z.object({
  // id tekinn inn sem parameter í routing, þannig getum ekki parse-að
  name: z.string().min(1).max(100),
  email: z.email().max(100),
}).strict()

// Tekur við offset og limit querystring breytum sem stýra paging
// ef valid, annars e-ð default
app.get('/',
  zValidator('query', pagingSchema),

  async (c) => {
    const limit = c.req.valid('query').limit
    const offset = c.req.valid('query').offset

    const authors = await prisma.author.findMany({ skip: offset, take: limit })
    const authorsCount = await prisma.author.count()

    if (!authors) { return c.json({ error: 'internal error' }, 500) }

    const response = {
      data: authors,
      paging: {
        limit,
        offset,
        count: authorsCount
      }
    }

    return c.json({ data: response }, 200)
  })

app.get('/:id', async (c) => {
  const id = c.req.param('id');

  const author = await prisma.author.findUnique({
    where: { id: Number(id) },
  });

  if (!author) {
    return c.json({ error: 'not found' }, 404)
  }

  return c.json({ data: author }, 200);
})

app.delete('/:id', async (c) => {
  const id = c.req.param('id');

  const author = await prisma.author.findUnique(
    { where: { id: Number(id) }, })

  if (!author) { return c.json({ error: 'author not found' }, 404) }


  const deletedAuthor = await prisma.author.delete({
    where: { id: Number(id) },
  })

  if (!deletedAuthor) { return c.json({ error: 'internal error' }, 500) }

  return c.json(null, 200);
})


app.put('/:id',
  zValidator('json', authorSchema, (result, c) => {
    if (!result.success) {
      return c.json({ error: 'bad request (zod error)' }, 400)
    }
  }),

  async (c) => {

    const id = Number(xss(c.req.param('id')))
    const email = xss(c.req.valid('json').email)
    const name = xss(c.req.valid('json').name)


    const authorId = await prisma.author.findUnique(
      { where: { id: Number(id) }, })

    if (!authorId) { return c.json({ error: 'author not found' }, 404) }

    const updatedAuthor = await prisma.author.update({
      where: { id: id },
      data: { name: name, email: email },
    });


    if (!updatedAuthor) {
      return c.json({ error: 'internal error' }, 500)
    }

    return c.json({ data: updatedAuthor }, 200)

  })


app.post('/',
  zValidator('json', authorSchema, (result, c) => {
    if (!result.success) {
      return c.json({ error: 'bad request (zod error)' }, 400)
    }
  }),
  async (c) => {

    const email = xss(c.req.valid('json').email)
    const name = xss(c.req.valid('json').name)

    const author = await prisma.author.create({
      data: {
        email: email,
        name: name,
      },
    });

    if (!author) {
      return c.json({ error: 'internal error' }, 500)
    }

    return c.json({ data: author }, 201)
  })
