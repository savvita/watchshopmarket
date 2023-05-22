

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel as BCarousel, CarouselItem, CarouselControl, CarouselIndicators } from 'reactstrap';

import { selectValues, selectStatus, getAsync } from '../../app/slideSlice';

import './Carousel.css';
import CarouselSlide from './CarouselSlide';

const Carousel = (args) => {
    const values = useSelector(selectValues);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    const [items, setItems] = useState([]);

    const emptySlides = [
      {
          imageUrl: '/images/slide1.jpg'
      },
      {
          imageUrl: '/images/slide2.jpg'
      },
      {
          imageUrl: '/images/slide3.jpg'
      },
    ];

    useEffect(() => {
        dispatch(getAsync());
    }, []);

    useEffect(() => {
        if(!values) {
            return;
        }

        const tmp = [...values];
        tmp.sort(comparator);

        if(tmp.length < 6) {
            const idx = tmp[tmp.length - 1].index;

            let i = 0;

            while(tmp.length < 6 && i < emptySlides.length) {
                tmp.push({ ...emptySlides[i]})
                i++;
            }
        }
        setItems([...tmp]);
    }, [values]);
  
    const comparator = (a, b) => {
        if(a.index < b.index) {
          return 1;
        }

        if(a.index > b.index) {
          return -1;
        }

        return 0;
    }

    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    };

    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    };

    const slides = items.map((item) => {
      return (
        <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={item.index}>
            <CarouselSlide item={ item } />
        </CarouselItem>
      );
    });

    return (
        <BCarousel className={ status === 'loading' ? 'd-none' : "carousel"} activeIndex={ activeIndex } next={ next } previous={ previous } { ...args }>
          <CarouselIndicators items={ items } activeIndex={ activeIndex } onClickHandler={ goToIndex } />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={ previous } />
          <CarouselControl direction="next" directionText="Next" onClickHandler={ next } />
        </BCarousel>
    );
}

export default Carousel;