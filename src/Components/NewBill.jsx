import React from "react";
import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  ChakraProvider,
  Input,
  InputGroup,
  InputLeftElement,
  background,
} from "@chakra-ui/react";
import { useRef } from "react";
import CallIcon from "@mui/icons-material/Call";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";
import { setPrintData, addprintItem } from "../Store/printDataSlice";
import { openBillModel } from "../Store/billopenSlice";
import { useSelector, useDispatch } from "react-redux";
import AddBill from "./AddBill";
import { deleteItem, removeItem } from "../Store/billDataSlice";
import {
  getDatabase,
  ref,
  onValue,
  child,
  push,
  update,
  set,
} from "firebase/database";
import { printModalOpen } from "../Store/printSlice";
import BillPrint from "./BillPrint";

import { resetItem } from "../Store/printDataSlice";
export default function NewBill() {
  const [total, setTotal] = useState(0);

  const data = useSelector((state) => state.allItemData.itemData);
  const dispatch = useDispatch();
  const open = useSelector((state) => state.billopen.openBill);
  const addedBillItem = useSelector((state) => state.billData.billItem);
  const id = useSelector((state) => state.billData.bil);
  const [date, setDate] = useState();
  const [yearz, setyear] = useState();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [billNumber, setbillNumber] = useState();
  const [payment, setPayment] = useState(0);
  const [paymentLeft, setPaymentLeft] = useState(0);
  const [Switch, setSwitch] = useState(false);
  const [billBtnSwitch, setBillBtnSwitch] = useState(true);
  useEffect(() => {
    if (Switch) {
      dispatch(
        setPrintData({
          Name: name,
          Date: date,
          Mobile: mobile,
          BillNo: billNumber,
          Total: total,
          Paid: parseInt(payment),
          PaymentLeft: paymentLeft,
        })
      );
      dispatch(addprintItem(addedBillItem));
    } else {
      dispatch(
        setPrintData({
          Name: "",
          Date: "",
          Mobile: "",
          BillNo: "",
          Total: "",
          Paid: "",
          PaymentLeft: "",
        })
      );
      dispatch(addprintItem([]));
    }
  }, [Switch]);

  const componentRef = useRef();
  useEffect(() => {
    setPaymentLeft(total - parseInt(payment));
  }, [total, payment]);
  useEffect(() => {
    let totalPrice = 0;
    addedBillItem.forEach((e) => (totalPrice += e["Price"]));
    setTotal(totalPrice);
  }, [addedBillItem]);

  useEffect(() => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDate = `${year}/${month}/${day}`;
    setDate(formattedDate);
    setyear(year);
  }, []);
  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, `/Hi_Mobile/Bill/${yearz}/`);
    onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const blength = data ? Object.keys(data).length : 0;
        const length = setbillNumber(blength);
      } else {
        setbillNumber(0);
      }
    });
  }, [billNumber]);

  const billNow = () => {
    const datezz = new Date();
    if (
      name !== "" &&
      mobile !== "" &&
      total !== 0 &&
      payment !== "" &&
      billBtnSwitch
    ) {
      let bill = {};
      bill["Name"] = name;
      bill["Mobile"] = mobile;
      bill["Date_Month"] = datezz.getMonth() + 1;
      bill["Date"] = date;

      bill["Total"] = total;
      bill["BillNo"] = billNumber;
      bill["Payment"] = parseInt(payment);
      bill["CompletePayment"] = total <= payment ? true : false;
      const promises = [];
      const db = getDatabase();

      const newPostKey = push(child(ref(db), `/Hi_Mobile/Bill/${yearz}/`)).key;
      const billWithId = { ...bill, Id: newPostKey };
      const updates = {};
      updates[`/Hi_Mobile/Bill/${yearz}/` + newPostKey] = billWithId;

      promises.push(update(ref(db), updates));
      //add item

      Object.values(addedBillItem).forEach((value) => {
        if (value["IdItem"] !== null && value["IdItem"] !== undefined) {
          const itemPostKey = push(
            child(ref(db), `/Hi_Mobile/Bill/${yearz}/${newPostKey}/Items/`)
          ).key;
          const updates2 = {};
          let curentCost = data[value["IdItem"]]["Cost"];

          const extensibleValue = Object.assign({}, value);
          // extensibleValue.Stock = data.idmain["Stock"];
          extensibleValue.Id = itemPostKey;
          extensibleValue.Cost = curentCost;

          //get form stock data
          let curentItemId = data[value["IdItem"]]["Id"];
          let curentStock = data[value["IdItem"]]["Stock"];
          // const stockManage = {
          //   Stock: curentStock - value["Qty"],
          // };

          updates2[
            `/Hi_Mobile/Bill/${yearz}/${newPostKey}/Items/` + itemPostKey
          ] = extensibleValue;
          // updates3[`/Hi_Mobile/Stock/${curentItemId}/`] = stockManage;

          // promises.push(update(ref(db), updates2));

          promises.push(update(ref(db), updates2));
          promises.push(
            update(ref(db, `/Hi_Mobile/Stock/${curentItemId}/`), {
              Stock: curentStock - value["Qty"],
            })
          );

          promises.push(
            update(ref(db, `/Hi_Mobile/Stock/${curentItemId}/`), {
              Stock: curentStock - value["Qty"],
            })
          );
        } else {
          const itemPostKey = push(
            child(ref(db), `/Hi_Mobile/Bill/${yearz}/${newPostKey}/Items/`)
          ).key;
          const updates2 = {};
          const extensibleValue = Object.assign({}, value);
          // extensibleValue.Stock = data.idmain["Stock"];
          extensibleValue.Id = itemPostKey;
          extensibleValue.IdItem = "Coustom";
          extensibleValue.Cost = 0;

          //get form stock data
          // let curentItemId = "Coustom";
          // let curentStock = data[value["IdItem"]]["Stock"];
          // let curentCost = 0;
          // const stockManage = {
          //   Stock: curentStock - value["Qty"],
          // };

          updates2[
            `/Hi_Mobile/Bill/${yearz}/${newPostKey}/Items/` + itemPostKey
          ] = extensibleValue;
          // updates3[`/Hi_Mobile/Stock/${curentItemId}/`] = stockManage;

          // promises.push(update(ref(db), updates2));

          promises.push(update(ref(db), updates2));
        }
        // set(ref(db, `/Hi_Mobile/Stock/${curentItemId}/`), stockManage);
      });
      Promise.all(promises)
        .then(() => {
          setSwitch(true);
          setBillBtnSwitch(false);
          dispatch(printModalOpen());
        })
        .catch((error) => {
          setSwitch(false);
          setBillBtnSwitch(true);

          // There was an error with one or more database writes
        });
      //condition end
    } else {
    }
  };

  const clearBill = () => {
    setBillBtnSwitch(true);
    dispatch(resetItem());
    dispatch(deleteItem());
    setTotal(0);
    setPayment(0);
    setPaymentLeft(0);
    setSwitch(false);
    setName("");
    setMobile("");
  };
  return (
    <div>
      <div className=" w-full">
        <button
          className="p-4 bg-green-600 text-white"
          onClick={() => {
            dispatch(openBillModel());
          }}
        >
          Add Item
        </button>
        <div className=" border-4 border-black p-4 my-4">
          <h1 className=" text-center font-bold text-4xl">Your Shop</h1>
          <div className="flex justify-center">
            <CallIcon />
            <p className=" mx-2 text-center">01234567890</p>
          </div>
          <div className="flex justify-between">
            <h3>
              Bill NO:{" "}
              <span className="font-semibold">
                {billNumber !== undefined ? billNumber : "Loading..."}
              </span>
            </h3>
            <h3>
              Date:<span className=" font-semibold">{date}</span>
            </h3>
          </div>
        </div>
        <div className=" grid gap-4">
          <TextField
            value={name}
            onChange={(e) => {
              setName(e.target.value.toLowerCase());
            }}
            type={"text"}
            label="Name"
            className=""
          />
          <TextField
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value.toString());
            }}
            type={"number"}
            label="Mobile"
            className=""
          />
        </div>
        <ChakraProvider>
          <Box className="">
            <Heading className=" py-4">Billing</Heading>

            <Box overflowY="auto" minHeight="full" maxWidth={"full"}>
              <Table variant="striped" size={"md"}>
                <Thead position="sticky" top={0} bgColor="white" border={"2px"}>
                  <Tr>
                    <Th
                      borderWidth="2px"
                      borderColor="black"
                      textColor={"black"}
                      width={50}
                    >
                      NO
                    </Th>
                    <Th
                      borderWidth="2px"
                      borderColor="black"
                      textColor={"black"}
                      width={100}
                    >
                      Qty
                    </Th>
                    <Th
                      width={"auto"}
                      borderWidth="2px"
                      borderColor="black"
                      textColor={"black"}
                    >
                      Description
                    </Th>
                    <Th
                      borderWidth="2px"
                      borderColor="black"
                      textColor={"black"}
                    >
                      Warrenty
                    </Th>
                    <Th textColor={"black"}>Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {addedBillItem.length !== 0 ? (
                    addedBillItem.map((d, i) => (
                      <Tr key={"n" + i}>
                        <Td>{i}</Td>
                        <Td>{d["Qty"]}</Td>
                        <Td>{d["Name"]}</Td>
                        <Td>{d["Warrenty"]}</Td>
                        <Td>RS {d["Price"]}</Td>
                        <Td width={50}>
                          <button
                            onClick={() => {
                              dispatch(removeItem(i));
                            }}
                            className=" bg-red-500 p-2 text-white"
                          >
                            Remove
                          </button>
                        </Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                      <Td></Td>
                    </Tr>
                  )}
                  <Tr onClick={() => {}}>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </Box>
        </ChakraProvider>
        <div className=" flex  text-center my-2">
          <h3 className="text-xl font-semibold">Total : </h3>
          <h3 className="text-xl font-semibold">RS {total}</h3>
        </div>
        <div className=" flex  text-center my-2">
          <h3 className="text-xl font-semibold">Paid : </h3>
          <h3 className="text-xl font-semibold">RS {payment}</h3>
        </div>
        <div className=" flex  text-center my-2">
          <h3 className="text-xl font-semibold">Payment Left : </h3>
          <h3 className="text-xl font-semibold">RS {paymentLeft}</h3>
        </div>
        <TextField
          value={payment}
          type={"number"}
          onKeyPress={(e) => {
            if (e.key === "e" || e.key === "-") {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            setPayment(parseInt(e.target.value));
          }}
          label="Coustomer Playment"
        />
      </div>

      <button
        onClick={billNow}
        className=" bg-slate-800 text-white p-6 text-xl my-4"
      >
        Bill Now
      </button>

      <button
        style={
          Switch
            ? { background: "skyblue", color: "black" }
            : { background: "gray" }
        }
        onClick={() => {
          if (Switch) {
            dispatch(printModalOpen());

            setPrintData({
              Name: name,
              Date: date,
              Mobile: mobile,
              BillNo: billNumber,
              Total: total,
              Paid: parseInt(payment),
              PaymentLeft: paymentLeft,
            });

            dispatch(addprintItem(addedBillItem));
          }
        }}
        className=" p-6 bg-blue-500 text-xl text-white"
      >
        Print Bill
      </button>
      <button onClick={clearBill} className="p-6 bg-red-500 text-xl text-white">
        Clear
      </button>
      <AddBill />
      <BillPrint />
    </div>
  );
}
