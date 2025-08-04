import {
  Carousel,
  CarouselMainContainer,
  CarouselThumbsContainer,
  SliderMainItem,
  SliderThumbItem,
} from '@/components/ui/extension/carousel';

import WorkoutTable from './workout-table';

export default function WorkoutCarousel() {
  return (
    <Carousel
      className="flex h-full w-full items-center gap-2"
      orientation="vertical"
    >
      <div className="h-full flex-1">
        <CarouselMainContainer className="flex h-full flex-1">
          <SliderMainItem className="flex h-full justify-center rounded-md border">
            <WorkoutTable />
          </SliderMainItem>
          <SliderMainItem className="flex h-full justify-center rounded-md border">
            <WorkoutTable />
          </SliderMainItem>
          <SliderMainItem className="flex h-full justify-center rounded-md border">
            <WorkoutTable />
          </SliderMainItem>
          <SliderMainItem className="flex h-full justify-center rounded-md border">
            <WorkoutTable />
          </SliderMainItem>
        </CarouselMainContainer>
      </div>
      <CarouselThumbsContainer className="h-60 basis-1/4">
        {Array.from({ length: 7 }).map((_, index) => (
          <SliderThumbItem
            key={index}
            className="rounded-md bg-transparent"
            index={index}
          >
            <span className="bg-background flex h-full w-full cursor-pointer items-center justify-center rounded-md border">
              Day {index + 1}
            </span>
          </SliderThumbItem>
        ))}
      </CarouselThumbsContainer>
    </Carousel>
  );
}
