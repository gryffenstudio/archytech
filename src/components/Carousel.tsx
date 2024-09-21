import { useEffect, useState, memo } from 'react';
import { useSwipeable } from 'react-swipeable';

export interface CarouselImage {
    image: any;
    alt: string;
    height?: number;
    width?: number;
    href?: string;
}

export interface CarouselImageProps {
    mobileImages: CarouselImage[];
    desktopImages?: CarouselImage[];
}

export interface CarouselTestimonial {
    mobileImage: CarouselImage;
    desktopImage: CarouselImage;
    quote: string;
    clientName: string;
}

interface CarouselProps {
    images?: CarouselImageProps;
    testimonials?: CarouselTestimonial[];
}

//Custom hook for checking for mobile or desktop
function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(false);

    useEffect(() => {
        const mediaQuery: MediaQueryList = window.matchMedia(query);
        setMatches(mediaQuery.matches);

        const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
        mediaQuery.addEventListener('change', handler);

        return () => mediaQuery.removeEventListener('change', handler);
    }, [query]);

    return matches;
}

function Carousel(props: CarouselProps) {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const isMobile = useMediaQuery('(max-width: 640px)');

    const previousSlide = () => {
        setCurrentSlide((prevSlide) => {
            if (props.images) {
                return prevSlide === 0 ? props.images.mobileImages.length - 1 : prevSlide - 1;
            } else if (props.testimonials) {
                return prevSlide === 0 ? props.testimonials.length - 1 : prevSlide - 1;
            }
            return prevSlide;
        });
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => {
            if (props.images) {
                return prevSlide === props.images.mobileImages.length - 1 ? 0 : prevSlide + 1;
            } else if (props.testimonials) {
                return prevSlide === props.testimonials.length - 1 ? 0 : prevSlide + 1;
            }
            return prevSlide;
        });
    };

    // Define swipe handlers using react-swipeable useSwipeable hook
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => nextSlide(),
        onSwipedRight: () => previousSlide(),
    });

    return (
        <div className='relative w-full max-w-full overflow-x-hidden ' {...swipeHandlers}>
            {props.testimonials ? (
                <h2 className='relative mb-10 w-fit place-self-start text-start text-2xl font-semibold uppercase tracking-wide text-brand-black lg:text-3xl'>
                    Reviews From Our Clients
                    <span className='after:absolute after:mt-2 after:block after:h-[3px] after:w-[15%] after:bg-brand-black'></span>
                </h2>
            ) : null}
            <div
                className='flex transition duration-1000 ease-in-out'
                style={{
                    transform: `translateX(-${currentSlide * 103.5}%)`,
                }}
            >
                <div className='flex'>
                    {isMobile && props.images && (
                        <div
                            className='grid gap-x-3'
                            style={{
                                gridTemplateColumns: `repeat(${props.images.mobileImages.length}, 100%)`,
                            }}
                        >
                            {props.images.mobileImages.map(
                                (carouselImage: CarouselImage, index) => {
                                    if (carouselImage.href) {
                                        return (
                                            <a
                                                className='block h-auto min-w-full sm:hidden'
                                                href={carouselImage.href}
                                                key={`mobile-${index}`}
                                            >
                                                <img
                                                    src={carouselImage.image.src}
                                                    alt={carouselImage.alt}
                                                    height={
                                                        carouselImage.height
                                                            ? carouselImage.height
                                                            : 681
                                                    }
                                                    width={
                                                        carouselImage.width
                                                            ? carouselImage.width
                                                            : 327
                                                    }
                                                    className='mr-5 h-auto min-w-full'
                                                    decoding='async'
                                                />
                                            </a>
                                        );
                                    }
                                    return (
                                        <img
                                            key={`mobile-${index}`}
                                            src={carouselImage.image.src}
                                            alt={carouselImage.alt}
                                            height={681}
                                            width={327}
                                            className='mr-3 block h-auto max-h-[600px] min-w-full sm:hidden'
                                            decoding='async'
                                        />
                                    );
                                },
                            )}
                        </div>
                    )}
                    {!isMobile && props.images && props.images.desktopImages && (
                        <div
                            className='grid gap-x-5 lg:gap-x-6 xl:gap-x-[46px]'
                            style={{
                                gridTemplateColumns: `repeat(${props.images.desktopImages.length}, 100%)`,
                            }}
                        >
                            {props.images.desktopImages.map(
                                (carouselImage: CarouselImage, index) => (
                                    <img
                                        key={`desktop-${index}`}
                                        src={carouselImage.image.src}
                                        alt={carouselImage.alt}
                                        height={681}
                                        width={1196}
                                        className='h-auto max-h-[850px] min-w-full'
                                        decoding='async'
                                    />
                                ),
                            )}
                        </div>
                    )}
                    {isMobile && props.testimonials && (
                        <div
                            className='grid gap-x-3'
                            style={{
                                gridTemplateColumns: `repeat(${props.testimonials.length}, 100%)`,
                            }}
                        >
                            {props.testimonials.map((testimonial: CarouselTestimonial, index) => {
                                return (
                                    <div className='min-w-full' key={`testimonial-${index}`}>
                                        <img
                                            src={testimonial.desktopImage.image}
                                            alt={testimonial.desktopImage.alt}
                                            className='h-[250px] w-full'
                                            decoding='async'
                                            height={300}
                                            width={375}
                                        />
                                        <div className='relative mt-4 flex flex-col space-y-8 p-1'>
                                            <q className='text-xl font-medium'>
                                                {testimonial.quote}
                                            </q>
                                            <div className='flex items-center'>
                                                <span className='pr-2 before:block before:h-[3px] before:w-[33px] before:bg-brand-black' />
                                                <p className='italic'>{testimonial.clientName}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {!isMobile && props.testimonials && (
                        <div
                            className='grid gap-x-5 lg:gap-x-6 xl:gap-x-[46px]'
                            style={{
                                gridTemplateColumns: `repeat(${props.testimonials.length}, 100%)`,
                            }}
                        >
                            {props.testimonials.map((testimonial: CarouselTestimonial, index) => {
                                return (
                                    <div
                                        className='flex min-w-full items-center justify-between'
                                        key={`testimonial-${index}`}
                                    >
                                        <div className='relative flex w-1/2 flex-col space-y-10'>
                                            <q className='text-2xl font-medium '>
                                                {testimonial.quote}
                                            </q>
                                            <span className='absolute bottom-4 before:absolute before:block before:h-[3px] before:w-[33px] before:bg-brand-black' />
                                            <p className='ml-10 text-xl italic'>
                                                {testimonial.clientName}
                                            </p>
                                        </div>
                                        <div>
                                            <img
                                                key={`desktop-${index}`}
                                                src={testimonial.desktopImage.image}
                                                alt={testimonial.desktopImage.alt}
                                                className='h-[400px] w-[600px]'
                                                height={400}
                                                width={500}
                                                decoding='async'
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {props.images ? (
                <>
                    <div className='item-center absolute top-0 hidden h-full w-full justify-between text-white sm:flex'>
                        <button
                            className='h-fit w-fit place-self-center focus:outline-none'
                            aria-label='Previous Slide Button'
                            onClick={previousSlide}
                        >
                            <span className='icon-[iconamoon--arrow-left-2-thin] h-24 w-24'></span>
                        </button>
                        <button
                            className='h-fit w-fit place-self-center focus:outline-none'
                            aria-label='Next Slide Button'
                            onClick={nextSlide}
                        >
                            <span className='icon-[iconamoon--arrow-right-2-thin] h-24 w-24'></span>
                        </button>
                    </div>
                    <div className='absolute bottom-0 flex w-full items-center justify-center gap-6 py-4 sm:hidden'>
                        {props.images &&
                            props.images.mobileImages.map((image: CarouselImage, i: number) => (
                                <div
                                    key={'carousel-circle-' + i}
                                    className={`cursor-pointer rounded-full transition-all duration-500 ${i === currentSlide ? 'h-5 w-5 bg-brand-black ' : 'h-4 w-4 bg-white'}`}
                                    onClick={() => setCurrentSlide(i)}
                                />
                            ))}
                    </div>
                </>
            ) : null}
            {props.testimonials ? (
                <>
                    <div className='item-center mt-8 flex w-full justify-center space-x-8 text-brand-black'>
                        <button
                            className='flex h-fit w-fit items-center focus:outline-none'
                            aria-label='Previous Slide Button'
                            onClick={previousSlide}
                        >
                            <span className='icon-[iconamoon--arrow-left-2-thin] h-24 w-24'></span>
                        </button>
                        <button
                            className='flex h-fit w-fit items-center focus:outline-none'
                            aria-label='Next Slide Button'
                            onClick={nextSlide}
                        >
                            <span className='icon-[iconamoon--arrow-right-2-thin] h-24 w-24'></span>
                        </button>
                    </div>
                </>
            ) : null}
        </div>
    );
}

export default memo(Carousel);
