import React from "react";
import DatePickerCom from "./DatePickerCom";
import { useEffect } from "react";
import TotalLineChart from "./TotalLineChart";
import {
  getDatabase,
  ref,
  orderByChild,
  startAt,
  endAt,
  equalTo,
  get,
  query,
} from "firebase/database";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector, useDispatch } from "react-redux";

import { useState } from "react";
export default function Dashboard() {
  const [value, setValue] = React.useState(new Date());
  const [value2, setValue2] = React.useState(new Date());
  const [dateSwitch1, setDateSwitch1] = useState(false);
  const [dateSwitch2, setDateSwitch2] = useState(false);
  const [allData, setAllData] = useState([]);
  const [total, settotal] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [profit, setProfit] = useState(0);

  useEffect(() => {
    const db = getDatabase();
    const queryRef = query(
      ref(db, "Hi_Mobile/Bill/2023/"),
      orderByChild("Date_Month"),
      startAt(dateSwitch1 ? value["$M"] + 1 : value.getMonth() + 1),
      endAt(dateSwitch2 ? value2["$M"] + 1 : value2.getMonth() + 1)
    );
    get(queryRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setAllData(snapshot.val());
          // console.log(allData);
        } else {
          console.log("no data");
          setAllData([]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [value, value2, dateSwitch1, dateSwitch2]);

  useEffect(() => {
    const totala = [];
    const costa = [];

    Object.values(allData).forEach((e) => {
      totala.push(e.Total);
      Object.values(e.Items).forEach((e) => {
        costa.push(e.Cost);
      });
    });
    let totalall = 0;
    let costall = 0;
    totala.map((value, index) => (totalall += totala[index]));
    costa.map((value, index) => (costall += costa[index]));
    settotal(totalall);
    setTotalCost(costall);
    setProfit(totalall - costall);
  }, [allData]);

  return (
    <div className="flex">
      <div className="">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack direction={"row"} spacing={3} marginY={"1rem"}>
            <>
              <DatePicker
                className="w-40"
                disableFuture
                label="Start Date"
                openTo="day"
                views={["year", "month"]}
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                  setDateSwitch1(true);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                className="w-40"
                disableFuture
                label="Start Date"
                openTo="day"
                views={["year", "month"]}
                value={value2}
                onChange={(newValue) => {
                  setValue2(newValue);
                  setDateSwitch2(true);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </>
          </Stack>
        </LocalizationProvider>
        <h1 className="text-3xl font-bold my-5">Income</h1>
        <h3 className=" font-semibold text-lg">Total Amount- {total}</h3>
        <h3 className=" font-semibold text-lg">Total Cost- {totalCost}</h3>
        <h3 className=" font-semibold text-lg">Profit- {profit}</h3>
      </div>
    </div>
  );
}
