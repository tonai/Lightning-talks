import { Component, Prop } from '@stencil/core';
import { Store, Action } from '@stencil/redux';
import { carouselPrev, carouselNext } from '../../redux/actions';

@Component({
  tag: 'my-carousel',
  styleUrl: 'my-carousel.css',
  shadow: true
})
export class MyCarousel {

  @Prop({ context: 'store' }) store: Store;

  carouselPrev: Action;
  carouselNext: Action;

  componentWillLoad() {
    this.store.mapDispatchToProps(this, {
      carouselPrev,
      carouselNext
    });
  }

  handlePrev = () => {
    this.carouselPrev();
  };

  handleNext = () => {
    this.carouselNext();
  };

  render() {
    return (
      <div class="my-carousel">
        <div class="my-carousel__content">
          <slot />
        </div>
        <button type="button" class="my-carousel__prev" onClick={this.handlePrev}>&lt;</button>
        <button type="button" class="my-carousel__next" onClick={this.handleNext}>&gt;</button>
      </div>
    );
  }

}
