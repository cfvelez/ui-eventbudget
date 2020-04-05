import { SettingsHttpRepository } from "./settings-http-repository";
import { settingsMapper } from "./settings_mapper";
import { SettingsRepository } from "../../domain/settings/settings-repository";

export class SettingsRepositoryFactory {
  static get(): SettingsRepository {
    return new SettingsHttpRepository(new settingsMapper());
  }
}
