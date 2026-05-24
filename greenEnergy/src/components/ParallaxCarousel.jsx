import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        tag: 'CLIMATE CRISIS',
        title: 'Global Warming',
        description: 'Temperatures are rising 0.2°C every decade. Switching to clean energy is the single biggest impact you can make.',
        imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1400&auto=format&fit=crop&q=80',
        accent: '#f97316',
    },
    {
        id: 2,
        tag: 'RENEWABLE ENERGY',
        title: 'Green Energy',
        description: 'Solar now produces cheaper electricity than coal in most of the world. The clean energy revolution is already here.',
        imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1400&auto=format&fit=crop&q=80',
        accent: '#10b981',
    },
    {
        id: 3,
        tag: 'SOLAR POWER',
        title: 'Solar for Your Home',
        description: 'The average Indian household saves ₹2,000–₹5,000 per month after going solar. Find your perfect setup below.',
        imageUrl: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=1400&auto=format&fit=crop&q=80',
        accent: '#f59e0b',
    },
];

export default function ParallaxCarousel() {
    const [activeIndex, setActiveIndex]       = useState(0);
    const [isDragging, setIsDragging]         = useState(false);
    const [startPosition, setStartPosition]   = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [parallaxOffset, setParallaxOffset] = useState(0);

    const sliderRef        = useRef(null);
    const slideContainerRef = useRef(null);
    const autoPlayRef      = useRef();
    const transitionRef    = useRef(true);

    /* ── Parallax on mouse move ── */
    const handleMouseMove = (e) => {
        if (!sliderRef.current) return;
        const { left, width } = sliderRef.current.getBoundingClientRect();
        const offset = (((e.clientX - left) / width) - 0.5) * -25;
        setParallaxOffset(offset);
    };

    /* ── Navigation ── */
    const goToSlide = (index) => {
        let i = index;
        if (i < 0) i = slides.length - 1;
        else if (i >= slides.length) i = 0;
        setActiveIndex(i);
    };

    const nextSlide = (e) => { if (e) e.stopPropagation(); goToSlide(activeIndex + 1); };
    const prevSlide = (e) => { if (e) e.stopPropagation(); goToSlide(activeIndex - 1); };

    /* ── Drag / swipe ── */
    const handleDragStart = (e) => {
        if (e.target.closest('button')) return;
        setIsDragging(true);
        setStartPosition(e.type.includes('mouse') ? e.pageX : e.touches[0].clientX);
        clearInterval(autoPlayRef.current);
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;
        const pos  = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        const diff = pos - startPosition;
        setCurrentTranslate(diff);
        if (slideContainerRef.current) {
            transitionRef.current = false;
            const pct = -activeIndex * 100 + (diff / sliderRef.current.offsetWidth) * 100;
            slideContainerRef.current.style.transform  = `translateX(${pct}%)`;
            slideContainerRef.current.style.transition = 'none';
        }
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if      (currentTranslate >  100) prevSlide();
        else if (currentTranslate < -100) nextSlide();
        else if (slideContainerRef.current) {
            transitionRef.current = true;
            slideContainerRef.current.style.transition = 'transform 600ms cubic-bezier(0.25,0.46,0.45,0.94)';
            slideContainerRef.current.style.transform  = `translateX(-${activeIndex * 100}%)`;
        }
        setCurrentTranslate(0);
    };

    /* ── Sync strip position on index change ── */
    useEffect(() => {
        if (!slideContainerRef.current) return;
        slideContainerRef.current.style.transition = transitionRef.current
            ? 'transform 600ms cubic-bezier(0.25,0.46,0.45,0.94)'
            : 'none';
        slideContainerRef.current.style.transform  = `translateX(-${activeIndex * 100}%)`;
        transitionRef.current = true;
    }, [activeIndex]);

    /* ── Autoplay ── */
    useEffect(() => {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = setInterval(() => { goToSlide(activeIndex + 1); }, 5000);
        return () => clearInterval(autoPlayRef.current);
    }, [activeIndex]);

    const active = slides[activeIndex];

    /* ════════════════════════════════════════
       RENDER
    ════════════════════════════════════════ */
    return (
        <div
            ref={sliderRef}
            className="relative w-full overflow-hidden rounded-2xl select-none"
            style={{ height: '440px' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setParallaxOffset(0)}
        >

            {/* ── Slide strip ── */}
            <div
                ref={slideContainerRef}
                className="flex h-full"
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
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
                        className="min-w-full h-full relative overflow-hidden"
                    >
                        {/* Parallax image */}
                        <div
                            className="absolute inset-0"
                            style={{
                                transform: index === activeIndex
                                    ? `translateX(${parallaxOffset}px) scale(1.08)`
                                    : 'scale(1.08)',
                                transition: 'transform 0.8s ease-out',
                                willChange: 'transform',
                            }}
                        >
                            <img
                                src={slide.imageUrl}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                                draggable={false}
                                loading="lazy"
                            />
                        </div>

                        {/* Dark gradient — bottom heavy */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.08) 100%)',
                            }}
                        />

                        {/* Accent colour wash from left */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: `linear-gradient(105deg, ${slide.accent}28 0%, transparent 55%)`,
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* ── Slide content (outside strip so it doesn't drag) ── */}
            <div
                className="absolute bottom-0 left-0 right-0 z-10 px-8 pb-20 pointer-events-none"
                key={activeIndex}              /* remount → CSS entrance */
                style={{ animation: 'contentIn 0.55s ease-out both' }}
            >
                {/* Tag badge */}
                <span
                    className="inline-block mb-3 text-white font-bold"
                    style={{
                        fontSize: '10px',
                        letterSpacing: '2.5px',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        background: active.accent,
                    }}
                >
                    {active.tag}
                </span>

                {/* Headline */}
                <h2
                    className="font-extrabold text-white leading-tight mb-2"
                    style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.02em' }}
                >
                    {active.title}
                </h2>

                {/* Description */}
                <p
                    className="max-w-lg"
                    style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)', lineHeight: '1.65' }}
                >
                    {active.description}
                </p>
            </div>

            {/* ── Bottom bar: counter · dots · arrows ── */}
            <div
                className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-between px-8"
            >
                {/* Slide counter */}
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 500, lineHeight: 1 }}>
                    <span style={{ color: '#fff', fontSize: '22px', fontWeight: 800, letterSpacing: '-1px' }}>
                        {String(activeIndex + 1).padStart(2, '0')}
                    </span>
                    {' / '}
                    {String(slides.length).padStart(2, '0')}
                </div>

                {/* Dot indicators */}
                <div className="flex items-center gap-2">
                    {slides.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => goToSlide(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            style={{
                                height: '3px',
                                width: i === activeIndex ? '30px' : '10px',
                                borderRadius: '2px',
                                background: i === activeIndex ? '#fff' : 'rgba(255,255,255,0.3)',
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.35s ease',
                                padding: 0,
                            }}
                        />
                    ))}
                </div>

                {/* Arrow buttons */}
                <div className="flex items-center gap-2">
                    {[
                        { handler: prevSlide, Icon: ChevronLeft,  label: 'Previous' },
                        { handler: nextSlide, Icon: ChevronRight, label: 'Next'     },
                    ].map(({ handler, Icon, label }) => (
                        <button
                            key={label}
                            onClick={handler}
                            aria-label={label}
                            style={{
                                width: '36px', height: '36px',
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.14)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                border: '1px solid rgba(255,255,255,0.28)',
                                color: '#fff',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')}
                            onMouseOut={e  => (e.currentTarget.style.background = 'rgba(255,255,255,0.14)')}
                        >
                            <Icon size={16} strokeWidth={2.5} />
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Animated progress bar ── */}
            <div
                className="absolute bottom-0 left-0 right-0 z-30"
                style={{ height: '3px', background: 'rgba(255,255,255,0.12)' }}
            >
                <div
                    key={activeIndex}
                    style={{
                        height: '100%',
                        background: active.accent,
                        animation: 'slideProgress 5s linear forwards',
                    }}
                />
            </div>

            {/* ── Keyframe for content entrance ── */}
            <style>{`
                @keyframes contentIn {
                    from { opacity: 0; transform: translateY(18px); }
                    to   { opacity: 1; transform: translateY(0);    }
                }
            `}</style>
        </div>
    );
}
