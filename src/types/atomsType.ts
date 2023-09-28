import { SingleValue } from "react-select";
import { banData } from "./pageType";

export type buttonSingIN = {
  divClass: string;
  className: string;
  type?: "button" | "submit" | "reset";
  textBtn: string;
};

export type DivHrType = {
    divClass: string;
    className: string
}

export type DivTxtMesErr = {
  className: string
  text: string;
}

export type Dropdown = {
  className: string;
  name: string;
  onChange?: (selectedOption: SingleValue<banData>) => void;
  placeholder?: string;
  required?: boolean;
  isClearable?: boolean;
  isSearchable? : boolean;
  options: Opprovince[];
  label: string;
}

type Opprovince = {
  value : number;
  label: string;
}