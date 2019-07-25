import { Component, Prop } from '@stencil/core';
import { Store } from '@stencil/redux';
import { configureStore } from '../../redux/store'; // index required due to bug

@Component({
  tag: 'my-app'
})
export class MyApp {

  @Prop({ context: 'store' }) store: Store;

  componentWillLoad() {
    this.store.setStore(configureStore());
  }

  render() {
    return (<slot/>);
  }

}
