import {
    Carousel,
    CarouselMainContainer,
    CarouselThumbsContainer,
    SliderMainItem,
    SliderThumbItem,
  } from "@/components/ui/extension/carousel";

export default function MealCarousel() {
return (
    <Carousel orientation="vertical" className="h-full w-full flex items-center gap-2">
    <div className="h-full flex-1">
        <CarouselMainContainer className="flex flex-1 h-full">
        {Array.from({ length: 10 }).map((_, index) => (
            <SliderMainItem
            key={index}
            className="border flex items-center justify-center h-full rounded-md"
            >
            Meal {index + 1}
            </SliderMainItem>
        ))}
        </CarouselMainContainer>
    </div>
    <CarouselThumbsContainer className="h-60 basis-1/4">
        {Array.from({ length: 10 }).map((_, index) => (
        <SliderThumbItem
            key={index}
            index={index}
            className="rounded-md bg-transparent"
        >
            <span className="border flex items-center justify-center h-full w-full rounded-md cursor-pointer bg-background">
            Meal {index + 1}
            </span>
        </SliderThumbItem>
        ))}
    </CarouselThumbsContainer>
    </Carousel>
);
};