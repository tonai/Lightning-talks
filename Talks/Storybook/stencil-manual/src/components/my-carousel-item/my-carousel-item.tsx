import { Component, Prop, State } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import { carouselItemInit } from '../../redux/actions';

@Component({
  tag: 'my-carousel-item',
  styleUrl: 'my-carousel-item.css',
  shadow: true
})
export class MyCarouselItem {

  @Prop({ context: 'store' }) store: Store;
  @Prop() index: number;
  @State() active: number;

  carouselItemInit: Action;

  componentWillLoad() {
    this.store.mapStateToProps(this, state => ({ active: state.active }));
    this.store.mapDispatchToProps(this, {
      carouselItemInit
    });
  }

  componentDidLoad() {
    this.carouselItemInit();
  }

  render() {
    return (
      <div class={`my-carousel-item ${this.active === this.index ? 'is-active' : ''}`}>
        <slot/>
      </div>
    );
  }

}
