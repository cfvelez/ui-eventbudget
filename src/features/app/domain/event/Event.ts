import { categoryDto } from "./CategoryDto";
import { dateDto } from "./DateDto";
import { locationDto } from "./LocationDto";

export interface EventInterface {
  id: string;
  name: string;
  image: string;
  link: string;
  category: categoryDto;
  date: dateDto;
  location: locationDto;
}
