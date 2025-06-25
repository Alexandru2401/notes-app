function createId() {
  let id = Math.random().toString(16).slice(2);
  return id;
}

export { createId };
