import React, { useState, useEffect, useContext } from "react";
import styles from "./settings.module.css";
import { TextInput } from "../../../../components/form/text-input/text-input";
import { SelectInput } from "../../../../components/form/select/base-select";
import { Button } from "../../../../components/button/button";
import { bind } from "../../../../utils/bind";
import { City } from "../../domain/city";
import { SettingsClass } from "../../domain/settings";
import { getCities } from "../../../../infrastructure/cities/cities";
import {
  getSettings,
  postSettings,
} from "../../../../infrastructure/settings/settings";
import { DateInput } from "../../../../components/form/date-input/date-input";
import { Checkbox } from "../../../../components/form/checkbox-input/checkbox-input";
import { Category } from "../../domain/category";
import { serverResponse } from "../../domain/serverResponse";
import { AppContext } from "../../../../app-context";

export const Settings: React.FunctionComponent<{}> = () => {
  const item: City[] = [];
  const category: Category = {
    music: false,
    arts: false,
    sports: false,
    other: false,
  };
  const defaultSettings = new SettingsClass("", 0, 0, "", "", "", []);
  const [budget, setBudget] = useState("");
  const [tickets, setTickets] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState(item);
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const [settings, setSettings] = useState(defaultSettings);
  const [categories, setCategories] = useState(category);
  const { status, updateApp } = useContext(AppContext);
  const cx = bind(styles);

  const onHandleBudgetChange = (value: string) => {
    if (Number(value)) {
      setBudget(value);
    }
    if (value.length === 0) setBudget("");
  };

  const onHandleTicketsChange = (value: string) => {
    if (Number(value)) {
      setTickets(value);
    }

    if (value.length === 0) setTickets("");
  };

  const handleCitiesPromise = async () => {
    const list: City[] = await getCities();
    setCities(list);
  };

  const handleSettingsPromise = async () => {
    const settings: SettingsClass = await getSettings();
    setSettings(settings);
    setBudget(String(settings.budget));
    setTickets(String(settings.numTickets));
    setCity(settings.location);
    setStartDate(settings.startDate);
    setEndDate(settings.endDate);
    setCategories(settings.getCategories());
  };

  const onHandleCheckboxChange = (value: boolean, category: string) => {
    switch (category) {
      case "music":
        setCategories({ ...categories, music: value });
        break;
      case "art":
        setCategories({ ...categories, arts: value });
        break;
      case "sports":
        setCategories({ ...categories, sports: value });
        break;
      case "other":
        setCategories({ ...categories, other: value });
        break;
    }
  };

  const updateSettings = async () => {
    settings.updateSettings(
      parseInt(budget),
      parseInt(tickets),
      city,
      startdate,
      enddate,
      categories
    );
    setSettings(settings);
    updateApp({ ...status, app: "1" });
    const response: serverResponse = await postSettings(settings);

    if (response.data.status === "ok" || response.data.status === "error")
      updateApp({ ...status, msg: response.data.message });
  };

  useEffect(() => {
    handleCitiesPromise();
  }, []);

  useEffect(() => {
    handleSettingsPromise();
  }, []);

  return (
    <>
      <h3>Settings</h3>
      <div className={cx("container")}>
        <div className={cx("box")}>
          <TextInput
            name={"budget"}
            label={"Presupuesto"}
            value={budget}
            onChange={(value) => onHandleBudgetChange(value)}
            className={cx("input")}
          ></TextInput>
        </div>
        <div className={cx("box")}>
          <TextInput
            name={"tickets"}
            label={"Tickets"}
            value={tickets}
            onChange={(value) => onHandleTicketsChange(value)}
            className={cx("input")}
          ></TextInput>
        </div>
        <div className={cx("box")}>
          <SelectInput
            className={cx("select")}
            currentValue={city}
            name={"city"}
            label={"Ciudad"}
            options={cities}
            onChange={(e) => {
              setCity(e);
            }}
          ></SelectInput>
        </div>
        <div className={cx("box")}>
          <DateInput
            name={"startdate"}
            label={"Fecha Inicio"}
            value={startdate}
            onChange={(value) => {
              setStartDate(value);
            }}
            className={cx("input")}
          ></DateInput>

          <DateInput
            name={"enddate"}
            label={"Fecha Fin"}
            value={enddate}
            onChange={(value) => {
              setEndDate(value);
            }}
            className={cx("input")}
          ></DateInput>
        </div>
        <div className={cx("box")}>
          <Checkbox
            name={"music"}
            label={"Música"}
            value={"music"}
            checked={categories.music}
            onChange={(value) => onHandleCheckboxChange(value, "music")}
          ></Checkbox>
          <Checkbox
            name={"arts"}
            label={"Arte y Teatro"}
            value={"arts"}
            checked={categories.arts}
            onChange={(value) => onHandleCheckboxChange(value, "art")}
          ></Checkbox>
          <Checkbox
            name={"sports"}
            label={"Deportes"}
            value={"sports"}
            checked={categories.sports}
            onChange={(value) => onHandleCheckboxChange(value, "sports")}
          ></Checkbox>
          <Checkbox
            name={"other"}
            label={"Otro"}
            value={"other"}
            checked={categories.other}
            onChange={(value) => onHandleCheckboxChange(value, "other")}
          ></Checkbox>
        </div>
        <div className={cx("row")}>
          <Button onClick={() => updateSettings()} theme="primary">
            Actualizar
          </Button>
        </div>
      </div>
    </>
  );
};
