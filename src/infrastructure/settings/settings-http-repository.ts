import { SettingsDto } from "./settings-dto";
import { settingsMapper } from "./settings_mapper";
import { Settings } from "../../domain/settings/settings";
import { SettingsRepository } from "../../domain/settings/settings-repository";
import { httpClient } from "../http-client";

export class SettingsHttpRepository implements SettingsRepository {
  constructor(private readonly settingsMapper: settingsMapper) {}

  async find(): Promise<Settings> {
    const result = await httpClient.get<SettingsDto>("/");
    return this.settingsMapper.map(result.data);
  }
}
