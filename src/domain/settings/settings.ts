export class Settings {
  budget: number = 0;
  numTickets: number = 0;
  location: string = "";
  startDate: string = "";
  endDate: string = "";
  categories: Array<string> | undefined;

  constructor(
    _budget: number,
    _numTickets: number,
    _location: string,
    _startDate: string,
    _endDate: string,
    _categories: Array<string>
  ) {
    this.budget = _budget;
    this.numTickets = _numTickets;
    this.location = _location;
    this.startDate = _startDate;
    this.endDate = _endDate;
    this.categories = _categories;
  }
}
