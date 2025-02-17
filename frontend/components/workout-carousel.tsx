import {
    Carousel,
    CarouselMainContainer,
    CarouselThumbsContainer,
    SliderMainItem,
    SliderThumbItem,
  } from "@/components/ui/extension/carousel";
import WorkoutTable from "./workout-table";

export default function WorkoutCarousel() {
return (
    <Carousel orientation="vertical" className="h-full w-full flex items-center gap-2">
    <div className="h-full flex-1">
        <CarouselMainContainer className="flex flex-1 h-full">
            <SliderMainItem className="border flex justify-center h-full rounded-md">
                <WorkoutTable />
            </SliderMainItem>
            <SliderMainItem className="border flex justify-center h-full rounded-md">
                <WorkoutTable />
            </SliderMainItem>
            <SliderMainItem className="border flex justify-center h-full rounded-md">
                <WorkoutTable />
            </SliderMainItem>
            <SliderMainItem className="border flex justify-center h-full rounded-md">
                <WorkoutTable />
            </SliderMainItem>
        </CarouselMainContainer>
    </div>
    <CarouselThumbsContainer className="h-60 basis-1/4">
        {Array.from({ length: 7 }).map((_, index) => (
        <SliderThumbItem
            key={index}
            index={index}
            className="rounded-md bg-transparent"
        >
            <span className="border flex items-center justify-center h-full w-full rounded-md cursor-pointer bg-background">
            Day {index + 1}
            </span>
        </SliderThumbItem>
        ))}
    </CarouselThumbsContainer>
    </Carousel>
);
};