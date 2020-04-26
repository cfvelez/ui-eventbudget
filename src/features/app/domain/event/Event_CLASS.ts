import { categoryDto } from "./CategoryDto";
import { dateDto } from "./DateDto";
import { locationDto } from "./LocationDto";

export class EventClass {
  id: string;
  name: string;
  image: string;
  link: string;
  category: categoryDto;
  dates: dateDto;
  location: locationDto;

  constructor(
    _id: string = "",
    _name: string = "",
    _image: string = "",
    _link: string = "",
    _category: categoryDto = { id: "", name: "" },
    _dates: dateDto = { localDate: "", localTime: "", timezone: "" },
    _location: locationDto
  ) {
    this.id = _id;
    this.name = _name;
    this.image = _image;
    this.link = _link;
    this.category = _category;
    this.dates = _dates;
    this.location = _location;
  }
}
