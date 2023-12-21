import ReportFormComponent from "@/components/Report-Form/report-form";

import { NextPage } from "next";
import React from "react";

const ReportForm: NextPage = () => {
  const handleSubmit = () => {};
  return (
    <>
      <ReportFormComponent
        img={""}
        title={"Пријави загадување"}
        paragraph={"Избери извор на загадување"}
        icon={""}
        onSubmit={handleSubmit}
        paragraph_first={"Фабрика"}
        paragraph_second={"Домаќинство"}
        paragraph_third={"Друго"}
      />
    </>
  );
};

export default ReportForm;
