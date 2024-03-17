import { ComponentProps, ReactNode } from "react";
import { getPagination } from "../utils/getPagination";

export type IconProps = ComponentProps<"svg"> & {
  size?: number;
};

export interface Language {
  lang: string;
  alias: string;
}

export enum Breakpoints {
  xs = 0,
  sm = 480,
  md = 768,
  lg = 992,
  xl = 1200,
}

export type Paginate = ReturnType<typeof getPagination>;

type FormField = {
  label: ReactNode;
  error?: string;
};

export type FormFieldProps<T> = FormField & T;
