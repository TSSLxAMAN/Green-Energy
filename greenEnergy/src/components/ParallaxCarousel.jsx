import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sample data - replace with your actual content
const slides = [
    {
        id: 1,
        title: "Global Warming",
        description: "Increasing day by day in current world",
        imageUrl: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2xvYmFsJTIwd2FybWluZ3xlbnwwfHwwfHx8MA%3D%3D",
        backgroundColor: "bg-green-100"
    },
    {
        id: 2,
        title: "Green Energy",
        description: "Switch to Green Energy. Save Earth",
        imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29sYXIlMjB3aW5kfGVufDB8fDB8fHww",
        backgroundColor: "bg-green-100"
    },
    {
        id: 3,
        title: "Solar Power",
        description: "Find the perfect Solar panel for your home",
        imageUrl: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c29sYXIlMjBlbmVyZ3l8ZW58MHx8MHx8fDA%3D",
        backgroundColor: "bg-green-100"
    },
];

export default function ParallaxCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [parallaxOffset, setParallaxOffset] = useState(0);
    const sliderRef = useRef(null);
    const slideContainerRef = useRef(null);
    const autoPlayRef = useRef();
    const transitionRef = useRef(true);

    // Parallax effect on mouse move
    const handleMouseMove = (e) => {
        if (!sliderRef.current) return;
        const { left, width } = sliderRef.current.getBoundingClientRect();
        const x = e.clientX - left;
        const offset = ((x / width) - 0.5) * -30;
        setParallaxOffset(offset);
    };

    // Navigation functions
    const goToSlide = (index) => {
        let slideIndex = index;
        if (index < 0) {
            slideIndex = slides.length - 1;
        } else if (index >= slides.length) {
            slideIndex = 0;
        }
        setActiveIndex(slideIndex);
    };

    const nextSlide = (e) => {
        if (e) e.stopPropagation();
        goToSlide(activeIndex + 1);
    };

    const prevSlide = (e) => {
        if (e) e.stopPropagation();
        goToSlide(activeIndex - 1);
    };

    // Touch and drag handlers
    const handleDragStart = (e) => {
        if (e.target.closest('button')) return; // Ignore if clicking on a button

        setIsDragging(true);
        setStartPosition(e.type.includes('mouse') ? e.pageX : e.touches[0].clientX);
        clearInterval(autoPlayRef.current);
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;

        const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        const diff = currentPosition - startPosition;
        setCurrentTranslate(diff);

        // Apply the translation directly to eliminate lag
        if (slideContainerRef.current) {
            transitionRef.current = false;
            const translateValue = -activeIndex * 100 + (diff / sliderRef.current.offsetWidth) * 100;
            slideContainerRef.current.style.transform = `translateX(${translateValue}%)`;
            slideContainerRef.current.style.transition = 'none';
        }
    };

    const handleDragEnd = () => {
        if (!isDragging) return;

        setIsDragging(false);
        const moveThreshold = 100;

        if (currentTranslate > moveThreshold) {
            prevSlide();
        } else if (currentTranslate < -moveThreshold) {
            nextSlide();
        } else {
            // Reset to current slide if threshold not met
            if (slideContainerRef.current) {
                transitionRef.current = true;
                slideContainerRef.current.style.transition = 'transform 500ms ease-out';
                slideContainerRef.current.style.transform = `translateX(-${activeIndex * 100}%)`;
            }
        }

        setCurrentTranslate(0);
        startAutoPlay();
    };

    useEffect(() => {
        // Apply transition when activeIndex changes
        if (slideContainerRef.current) {
            if (transitionRef.current) {
                slideContainerRef.current.style.transition = 'transform 500ms ease-out';
            } else {
                // Reset transition flag for next slide change
                transitionRef.current = true;
            }
            slideContainerRef.current.style.transform = `translateX(-${activeIndex * 100}%)`;
        }
    }, [activeIndex]);

    // Autoplay functionality
    const startAutoPlay = () => {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = setInterval(() => {
            goToSlide(activeIndex + 1);
        }, 5000);
    };

    useEffect(() => {
        startAutoPlay();
        return () => clearInterval(autoPlayRef.current);
    }, [activeIndex]);

    return (
        <div
            className="w-full overflow-hidden relative h-96 bg-gray-50 rounded-xl shadow-lg"
            ref={sliderRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setParallaxOffset(0)}
        >
            {/* Slide container */}
            <div
                ref={slideContainerRef}
                className="flex h-full"
                style={{
                    cursor: isDragging ? 'grabbing' : 'grab'
                }}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
            >
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`min-w-full h-full flex flex-col justify-center items-center relative ${slide.backgroundColor} overflow-hidden`}
                    >
                        {/* Parallax image */}
                        <div
                            className="absolute inset-0 z-0 transition-transform duration-700 ease-out scale-110"
                            style={{
                                transform: index === activeIndex ? `translateX(${parallaxOffset}px)` : 'none'
                            }}
                        >
                            <img
                                src={slide.imageUrl}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="z-10 text-center px-6 py-8 bg-green-100  bg-opacity-80 rounded-lg max-w-md mx-auto transform transition-transform duration-500 hover:scale-105">
                            <h2 className="text-3xl font-bold mb-2 text-green-800">{slide.title}</h2>
                            <p className="text-green-600 font-semibold">{slide.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-green-100 bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-300 hover:scale-110"
                aria-label="Previous slide"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-green-100 bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-300 hover:scale-110"
                aria-label="Next slide"
            >
                <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-white w-8' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}