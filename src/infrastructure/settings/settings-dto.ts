// Data Transfer Object
export interface SettingsDto {
  budget: number;
  numTickets: number;
  location: string;
  startDate: string;
  endDate: string;
  categories: Array<string>;
}
