import { SettingsDto } from "./settings-dto";
import { Settings } from "../../domain/settings/settings";

export class settingsMapper {
  map(SettingsDto: SettingsDto): Settings {
    return new Settings(
      SettingsDto.budget,
      SettingsDto.numTickets,
      SettingsDto.location,
      SettingsDto.startDate,
      SettingsDto.endDate,
      SettingsDto.categories
    );
  }
}
