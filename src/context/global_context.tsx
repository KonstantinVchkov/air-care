import React, { createContext, useContext, useState } from "react";
interface ILocation {
  longitude: number;
  latitude: number;
}
export interface IReportData {
  id: string;
  level: string;
  img_path: string | null;
  status: string;
  description: string;
  polution_type: string;
  polution_from: string;
  pollutant: string;
  created_at: string;
  adress: string;
  [key: string]: any;
}

interface LocationType {
  location: ILocation | null;
  saveLocation: (newLocation: ILocation) => void;
  loading: boolean;
  isSubmitted: boolean;
  reportData?: IReportData[];
  submitReport: (data: IReportData) => void;
  handleClose: () => void;
  adress: string;
  saveAddress: (newAddress: string) => void;
}
export const GlobalContext = createContext<LocationType>(null as any);

interface LocationProviderProps {
  children: React.ReactNode;
}

export const LocationProvider = ({ children }: LocationProviderProps) => {
  const [location, setLocation] = useState<ILocation | null>(null);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<IReportData[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [adress, setAdress] = useState("");

  const saveLocation = (newLocation: ILocation) => {
    setLocation(newLocation);

    setLoading(false);
  };
  const saveAddress = (newAddress: string) => {
    setAdress(newAddress);
  };
  const submitReport = (data: IReportData) => {
    if (!data.img_path) {
      return;
    }

    setReportData((prevReports) => [...prevReports, data]);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        location,
        saveLocation,
        loading,
        submitReport,
        reportData,
        isSubmitted,
        handleClose,
        adress,
        saveAddress,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
