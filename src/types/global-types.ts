// Generic types for fetch data
export interface UseFetchProps<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface IReport {
  title: string;
  body: string;
  backBtn: string;
  btnMyrep: string;
}


export interface IReportForm {
  img: string;
  title: string;
  paragraph: string;
  icon: string;
  onSubmit: (source: string) => void;
  paragraph_first: string;
  paragraph_second: string;
  paragraph_third: string;
}
