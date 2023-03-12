import * as React from "react";

import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector, useDispatch } from "react-redux";
import { setInDate, setEndDate } from "../Store/bilingDateSlice";
import { useEffect } from "react";
import { useState } from "react";
export default function DatePickerCom(props) {
  const [value, setValue] = React.useState(new Date());
  const [value2, setValue2] = React.useState(new Date());
  const startDate = useSelector((state) => state.date.startdate);
  const endDate = useSelector((state) => state.date.enddate);
  const dispatch = useDispatch();
  const [sswitch, setsswitch] = useState(false);

  useEffect(() => {
    dispatch(
      setInDate({
        year: sswitch ? value["$y"] : value.getFullYear(),
        month: sswitch ? value["$M"] + 1 : value.getMonth() + 1,
        day: sswitch ? value["$D"] : value.getDay(),
      })
    );
  }, [value, value2, dispatch]);
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack direction={"row"} spacing={3} marginY={"1rem"}>
          <>
            <DatePicker
              className="w-40"
              disableFuture
              label="Start Date"
              openTo="day"
              views={["year", "month", "day"]}
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
                setsswitch(true);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </>
        </Stack>
      </LocalizationProvider>
    </div>
  );
}
