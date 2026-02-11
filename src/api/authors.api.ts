import { Hono } from "hono";

export const app = new Hono();

type Author = {
    id: string;
    name: string
}

let tempAuthors: Array<Author> = [
    { id: '1', name: 'temp author 1'},
    {  id: '2',name: 'temp author 2'},
    {  id: '3',name: 'temp author 3'},
    {  id: '4',name: 'temp author 4'},
]

app.get('/', (c) => {
    return c.json(tempAuthors)
})

app.get('/:id', (c) => {
    const id = c.req.param('id');

    const author = tempAuthors.find(i => i.id === id);

    if (!author) {
        return c.json({ error: 'not found' }, 404)
    }

    return c.json(author);
})

app.delete('/:id', (c) => {
    const id = c.req.param('id');

    const author = tempAuthors.find(i => i.id === id);

    if (!author) {
        return c.json({ error: 'not found' }, 404)
    }

    tempAuthors = tempAuthors.filter(i => i.id !== id);

    return c.json(null, 200);
})

app.post('/', (c) => {

    // TODO
})
