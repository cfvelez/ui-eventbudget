import { Category } from "../../app/domain/category";

export class SettingsClass {
  id: string = "";
  budget: number = 0;
  numTickets: number = 0;
  location: string = "";
  startDate: string = "";
  endDate: string = "";
  categories: Array<string> | [""];

  private categoriesDB = [
    { music: "KZFzniwnSyZfZ7v7nJ" },
    { arts: "KZFzniwnSyZfZ7v7na" },
    { sports: "KZFzniwnSyZfZ7v7nE" },
    { other: "KZFzniwnSyZfZ7v7n1" },
  ];

  constructor(
    _id: string,
    _budget: number,
    _numTickets: number,
    _location: string,
    _startDate: string,
    _endDate: string,
    _categories: Array<string>
  ) {
    this.id = _id !== null && _id !== undefined ? _id : "";
    this.budget = _budget !== null && _budget !== undefined ? _budget : 0;
    this.numTickets =
      _numTickets !== null && _numTickets !== undefined ? _numTickets : 0;
    this.location =
      _location !== null && _location !== undefined ? _location : "";
    this.startDate =
      _startDate !== null && _startDate !== undefined ? _startDate : "";
    this.endDate = _endDate !== null && _endDate !== undefined ? _endDate : "";
    this.categories =
      _categories !== null && _categories !== undefined ? _categories : [];
  }

  getCategories(): Category {
    const categoryList: Category = {
      music: false,
      arts: false,
      sports: false,
      other: false,
    };

    this.categoriesDB.forEach((item: any) => {
      let key = Object.keys(item);

      switch (key[0]) {
        case "music":
          if (this.categories.includes(item.music)) categoryList.music = true;
          break;

        case "arts":
          if (this.categories.includes(item.arts)) categoryList.arts = true;
          break;

        case "sports":
          if (this.categories.includes(item.sports)) categoryList.sports = true;
          break;

        case "other":
          if (this.categories.includes(item.other)) categoryList.other = true;
          break;
      }
    });

    return categoryList;
  }

  setCategories(_categories: Category) {
    this.categories = [];
    if (_categories.music) {
      const music: string = this.categoriesDB[0].music ?? "";
      this.categories.push(music);
    }

    if (_categories.arts) {
      const arts: string = this.categoriesDB[1].arts ?? "";
      this.categories.push(arts);
    }

    if (_categories.sports) {
      const sports: string = this.categoriesDB[2].sports ?? "";
      this.categories.push(sports);
    }

    if (_categories.other) {
      const other: string = this.categoriesDB[3].other ?? "";
      this.categories.push(other);
    }
  }

  updateSettings(
    _budget: number,
    _numTickets: number,
    _location: string,
    _startDate: string,
    _endDate: string,
    _categories: Category
  ): void {
    this.budget = _budget;
    this.numTickets = _numTickets;
    this.location = _location;
    this.startDate = _startDate;
    this.endDate = _endDate;
    this.setCategories(_categories);
  }

  getStartDate(): string {
    return this.startDate;
  }

  getEndDate(): string {
    return this.endDate;
  }
}
