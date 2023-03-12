import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { printModalClose } from "../Store/printSlice";
import CallIcon from "@mui/icons-material/Call";
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
} from "@chakra-ui/react";
import "./billPrintStyle.css";
import { width } from "@mui/system";
import { useEffect, useState } from "react";
export default function BillPrint() {
  const billInfo = useSelector((state) => state.printData.billItems);
  const billBasicInfo = useSelector((state) => state.printData.basicData);

  const [bdata, setbdata] = useState();
  const [itemdata, setitembdata] = useState();
  const dispatch = useDispatch();
  const printModalSwitch = useSelector((state) => state.print.printReady);
  const handleClickOpen = () => {
    setOpen(true);
  };
  // useEffect(() => {
  //   setitembdata(billInfo);
  //   setbdata(billBasicInfo);
  // }, [billBasicInfo, billInfo]);
  const handleClose = () => {
    dispatch(printModalClose());
  };

  return (
    <div>
      <Dialog
        open={printModalSwitch}
        onClose={handleClose}
        // className="print-dialog"
      >
        <DialogContent>
          <div className="border-1 border-black parent print-dialog">
            <div className=" p-2 my-2 detailBox border border-black">
              <h1 className=" text-center font-bold text-lg">Your Shop</h1>
              <div className="flex justify-center items-center contact">
                <CallIcon sx={{ fontSize: "20px" }} />
                <p className=" mx-2 text-center">000-1234567</p>
              </div>
              <div className="flex justify-between">
                <h3>Bill NO:{billBasicInfo["BillNo"]}</h3>
                <h3>Date:{billBasicInfo["Date"]}</h3>
              </div>
            </div>
            <h3 className="ml-2 bdata">Name: {billBasicInfo["Name"]}</h3>
            <h3 className="ml-2 bdata">Mobile: {billBasicInfo["Mobile"]}</h3>

            <div className=" w-full h-full relative">
              <div className="billtable ">
                <div className="parentz tableprae text-center ">
                  <p className="no bframe ">No</p>
                  <p className="qty bframe">Qty</p>
                  <p className="description bframe">Description</p>
                  <p className="warrenty bframe">Warrenty</p>
                  <p className="price bframe">Price</p>
                </div>
                {Object.values(billInfo).map((data, i) => (
                  <div className="parentz  text-start" key={"z" + i}>
                    <p className="no ">{i}</p>
                    <p className="qty ">{data["Qty"]}</p>
                    <p className="description ">{data["Name"]}</p>
                    <p className="warrenty ">{data["Warrenty"]}</p>
                    <p className="price ">{data["Price"]}</p>
                  </div>
                ))}
              </div>
              <div className=" ">
                <h3 className="text-end pr-4 font-semibold">
                  Total: {billBasicInfo["Total"]}
                </h3>
                <h3 className="text-end pr-4 font-semibold">
                  Paid: {billBasicInfo["Paid"]}
                </h3>
                <h3 className="text-end pr-4 font-semibold">
                  Payment left: {billBasicInfo["PaymentLeft"]}
                </h3>
              </div>
            </div>
          </div>
          <div className="no-print hidden">
            <a href="/">localhost:5173/home</a>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              window.print();
            }}
          >
            Print
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
