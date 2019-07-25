function wait(name, duration) {
  const start = Date.now();
  timeline.start(name);
  do {} while(Date.now() - start < duration);
  timeline.end(name);
}

const drawer = {
  init() {
    wait('drawer', 300);
  }
};

const contentLoader = {
  init() {
    wait('contentLoader', 300);
  }
};

const breakpoints = {
  init() {
    wait('breakpoints', 300);
  }
};

let idleValue;
const alerts = {
  init() {
    document.getElementById('alert').addEventListener('click', this.alert);
    idleValue = new IdleValue(() => {
      wait('alerts', 300);
    });
  },
  alert: () => {
    console.log('alert', Date.now() - window.timeline.startTime);
    if (!timeline.exists('alert-click')) {
      idleValue.getValue();
      wait('alert-click', 300);
    }
  },
  clean() {
    document.getElementById('alert').removeEventListener('click', this.alert);
  }
};

const analytics = {
  init() {
    wait('analytics', 300);
  }
};

const button = {
  init() {
    console.log('button', Date.now() - window.timeline.startTime);
    if (!timeline.exists('button')) {
      wait('alert-button', 300);
    }
  }
};
