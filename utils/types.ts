export type DateFilterType = {
  day?: number;
  month: number;
  year: number;
};

export type DummyEventType = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
};

export type NavItems = {
  id: string;
  label: string;
  href: string;
  url?: string;
  icon?: string;
};

export type MonthOptions = {
  label: string;
  value: string;
};

export type GenericObj = {
  [key: string]: string | number;
};
