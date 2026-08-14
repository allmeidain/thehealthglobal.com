/* Testimonial Carousel Handler */
document.addEventListener('DOMContentLoaded', function() {
  const carousels = document.querySelectorAll('.testimonials-carousel-wrapper');

  carousels.forEach(wrapper => {
    const carousel = wrapper.querySelector('.testimonials-carousel');
    const cards = wrapper.querySelectorAll('.testimonial-card');
    const prevBtn = wrapper.querySelector('.carousel-arrow.prev');
    const nextBtn = wrapper.querySelector('.carousel-arrow.next');
    const pagination = wrapper.querySelector('.carousel-pagination');

    if (!carousel || cards.length === 0) return;

    // Generate pagination dots if needed
    if (pagination && pagination.children.length === 0) {
      cards.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => scrollToCard(idx));
        pagination.appendChild(dot);
      });
    }

    const dots = pagination ? pagination.querySelectorAll('.carousel-dot') : [];

    function scrollToCard(index) {
      if (cards[index]) {
        cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }

    function updateActiveDot() {
      const carouselRect = carousel.getBoundingClientRect();
      let activeIndex = 0;
      let minDistance = Infinity;

      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const distance = Math.abs((cardRect.left + cardRect.width / 2) - (carouselRect.left + carouselRect.width / 2));
        if (distance < minDistance) {
          minDistance = distance;
          activeIndex = index;
        }
      });

      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
      });
    }

    carousel.addEventListener('scroll', function() {
      clearTimeout(carousel._scrollTimeout);
      carousel._scrollTimeout = setTimeout(updateActiveDot, 50);
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -carousel.clientWidth * 0.8, behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: carousel.clientWidth * 0.8, behavior: 'smooth' });
      });
    }
  });
});
