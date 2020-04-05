import { Settings } from "./settings";

export interface SettingsRepository {
  find(): Promise<Settings>;
}
