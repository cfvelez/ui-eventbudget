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
    updateApp({ ...status, app: "1", msg: "" });
    const response: serverResponse = await postSettings(settings);

    if (response.data.status === "ok") {
      updateApp({ ...status, msg: "s|" + response.data.message });
    } else {
      updateApp({ ...status, msg: "w|" + response.data.message });
    }
  };

  useEffect(() => {
    updateApp({ ...status, msg: "" });
    if (status.user === "1") {
      handleCitiesPromise();
      handleSettingsPromise();
    }
  }, []);

  return (
    <>
      <div className={cx("box")}>
        <div className={cx("item")}>
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
      </div>
      <div className={cx("wrapper", "box")}>
        <div className={cx("item")}>
          <TextInput
            name={"budget"}
            label={"Presupuesto"}
            value={budget}
            onChange={(value) => onHandleBudgetChange(value)}
            className={cx("input")}
          ></TextInput>
        </div>
        <div className={cx("item")}>
          <TextInput
            name={"tickets"}
            label={"Tickets"}
            value={tickets}
            onChange={(value) => onHandleTicketsChange(value)}
            className={cx("input")}
          ></TextInput>
        </div>
      </div>
      <div className={cx("box", "wrapper")}>
        <div className={cx("item")}>
          <DateInput
            name={"startdate"}
            label={"Fecha Inicio"}
            value={startdate}
            onChange={(value) => {
              setStartDate(value);
            }}
            className={cx("input")}
          ></DateInput>
        </div>
        <div className={cx("item")}>
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
      </div>
      <div className={cx("wrapper", "box")}>
        <div className={cx("item")}>
          <Checkbox
            name={"music"}
            label={"Música"}
            value={"music"}
            checked={categories.music}
            onChange={(value) => onHandleCheckboxChange(value, "music")}
          ></Checkbox>
        </div>
        <div className={cx("item")}>
          <Checkbox
            name={"arts"}
            label={"Arte"}
            value={"arts"}
            checked={categories.arts}
            onChange={(value) => onHandleCheckboxChange(value, "art")}
          ></Checkbox>
        </div>
        <div className={cx("item")}>
          <Checkbox
            name={"sports"}
            label={"Deporte"}
            value={"sports"}
            checked={categories.sports}
            onChange={(value) => onHandleCheckboxChange(value, "sports")}
          ></Checkbox>
        </div>
        <div className={cx("item")}>
          <Checkbox
            name={"other"}
            label={"Otro"}
            value={"other"}
            checked={categories.other}
            onChange={(value) => onHandleCheckboxChange(value, "other")}
          ></Checkbox>
        </div>
      </div>
      <div className={cx("box", "wrapper")}>
        <Button onClick={() => updateSettings()} theme="primary">
          Actualizar
        </Button>
      </div>
    </>
  );
};
