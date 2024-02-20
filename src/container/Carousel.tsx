import React, { useState } from 'react';

const CarouselComponent: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide === 0 ? 2 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide === 2 ? 0 : prevSlide + 1));
  };

  const handleSlideTo = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 " data-carousel="static">
        {/* Carousel wrapper */}
        <div className="overflow-hidden relative h-56 rounded-xl sm:h-64 xl:h-80 2xl:h-[400px]">
          {/* Slide Items */}
          {[0, 1, 2].map(index => (
            <div
              key={index}
              className={`duration-700 ease-in-out ${currentSlide === index ? '' : 'hidden'}`}
              data-carousel-item>
              {index === 0 && (
                <span className="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-gray-800">
                  First Slide
                </span>
              )}
              <img
                src={`https://flowbite.com/docs/images/carousel/carousel-${index + 1}.svg`}
                className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
        {/* Slider indicators */}
        <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
          {[0, 1, 2].map(index => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              aria-current={currentSlide === index ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
              onClick={() => handleSlideTo(index)}></button>
          ))}
        </div>
        {/* Slider controls */}
        <button
          type="button"
          className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
          data-carousel-prev
          onClick={handlePrevSlide}>
          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"></path>
            </svg>
            <span className="hidden">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
          data-carousel-next
          onClick={handleNextSlide}>
          <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"></path>
            </svg>
            <span className="hidden">Next</span>
          </span>
        </button>
      </div>

      <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
    </div>
  );
};

export default CarouselComponent;
