class Entity {
  constructor(id, components) {
    this.id = id;
    this.components = components || [];
  }

  move() {
    throw new Error('not implemented')
  }
}
