function uniqueId(ids: {[id: string]: any}) {
  let id = crypto.randomUUID();
  while (id in ids)
      id = crypto.randomUUID();
  return id;
}