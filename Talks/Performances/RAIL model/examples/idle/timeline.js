const Timeline = function(container) {
  this.total = 3000;
  this.items = {};
  this.startTime = Date.now();

  // clean.
  container.innerHTML = '';
  alerts.clean();

  setTimeout(() => this.draw(container), this.total);
};

Timeline.prototype = {
  start(name) {
    this.items[name] = { name, start: Date.now() };
  },
  end(name) {
    this.items[name].end = Date.now();
  },
  draw(container) {
    const items = Object.values(this.items);
    const start = items.reduce((acc, item) => Math.min(acc, item.start), Infinity);
    // const end = items.reduce((acc, item) => Math.max(acc, item.end), 0);
    // const total = end - start;
    const total = this.total;

    items.forEach(item => {
      const divItem = document.createElement('div');
      divItem.classList.add('item');
      divItem.style.left = `${(item.start - start)  / total * 100}%`;
      divItem.style.width = `${(item.end - item.start) / total * 100}%`;
      const divTitle = document.createElement('div');
      const title = document.createTextNode(`${item.name} (${item.end - item.start}ms)`);
      divTitle.appendChild(title);
      divItem.appendChild(divTitle);
      container.appendChild(divItem);
    });
  },
  exists(name) {
    return Object.keys(this.items).indexOf(name) !== -1;
  }
};
