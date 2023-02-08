import { Router, Request, Response } from 'express';

const items: any[] = [];

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send({
    success: true,
    items
  });
});

router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const item = items[id];

  if (!item) {
    return res.status(404).send({
      success: false,
      message: `Item with id ${id} not found`
    });
  }

  res.send({
    success: true,
    item
  });
});

router.post('/', (req: Request, res: Response) => {
  const item = req.body;
  items.push(item);

  res.send({
    success: true,
    message: 'Item added to the list',
    item
  });
});

router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const itemIndex = items.findIndex((i) => i.id === id);

  if (itemIndex === -1) {
    return res.status(404).send({
      success: false,
      message: `Item with id ${id} not found`
    });
  }

  items.splice(itemIndex, 1);

  res.send({
    success: true,
    message: `Item with id ${id} deleted`
  });
});

router.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const item = req.body;

  const itemIndex = items.findIndex((i) => i.id === id);

  if (itemIndex === -1) {
    return res.status(404).send({
      success: false,
      message: `Item with id ${id} not found`
    });
  }

  items[itemIndex] = item;

  res.send({
    success: true,
    message: `Item with id ${id} updated`,
    item
  });
});

export default router;
