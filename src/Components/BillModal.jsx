import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import { closebillEditModel } from "../Store/billmodaleopenSlice";
import { DialogContent, TextField } from "@mui/material";

import { useToast } from "@chakra-ui/react";
import { getDatabase, ref, child, push, update } from "firebase/database";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function BillModal(props) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.billEdit.billEdit);
  const open = useSelector((state) => state.billEdit.billEdit);
  const [fullpay, setFullPay] = useState(false);
  const [paymentIn, setPaymentIn] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const toast = useToast();
  const handleClose = () => {
    // if()
    dispatch(closebillEditModel(false));
  };
  const saveData = () => {
    if (paymentIn !== 0) {
      const db = getDatabase();
      const updates = {};
      updates[`/Hi_Mobile/Bill/2023/${props.billData.Id}/Payment/`] =
        props.billData.Payment + paymentIn;
      updates[`/Hi_Mobile/Bill/2023/${props.billData.Id}/CompletePayment/`] =
        fullpay;
      update(ref(db), updates)
        .then(() => {
          // setPaymentIn(0)
          // Data saved successfully!
          dispatch(closebillEditModel(false));
          toast({
            title: "Bill Edited",
            description: "Bill Data Saved",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        })
        .catch((error) => {
          toast({
            title: "Bill Save Error ",
            description: "Bill Data Not Saved",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        });
    }
  };
  console.log(open ? props.billData.Payment : "");
  const editpayment = (ez) => {
    const payment = parseInt(ez.target.value);
    setPaymentIn(parseInt(ez.target.value || 0));
    if (props.billData.Total - props.billData.Payment - payment === 0) {
      setFullPay(true);
    } else {
      setFullPay(false);
    }
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit Bill
            </Typography>
            <Button autoFocus color="inherit" onClick={saveData}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          {props.billData && (
            <div>
              <h3 className=" text-red-700 font-black">
                Bill Number: <span>{props.billData.Name}</span>
              </h3>
              <h3 className=" text-blue-900 font-medium">
                Name: <span>{props.billData.Name}</span>
              </h3>
              <h3 className=" text-blue-900 font-medium">
                Date: <span>{props.billData.Date}</span>
              </h3>
              <h3 className=" text-blue-900 font-medium">
                Mobile: <span>{props.billData.Mobile}</span>
              </h3>
              <div
                className=" border-2 p-4 border-teal-700
              "
              >
                <h3 className=" text-2xl font-semibold">Items</h3>
                {Object.values(props.billData.Items).map((e, i) => (
                  <div className="flex mb-2">
                    <h3 className=" pr-2 font-black text-xl">{i + 1}</h3>

                    <h4 className=" text-green-700 text-xl"> {e.Name}</h4>
                    <p className=" mx-4 text-green-700 text-xl">
                      Warrenty {e.Warrenty}
                    </p>
                    <p className=" text-green-700 text-xl">RS: {e.Price}</p>
                  </div>
                ))}

                <h3 className=" font-semibold text-lg text-green-900">
                  Total: <span>RS {props.billData.Total}</span>
                </h3>
                <h3 className=" font-semibold text-lg text-red-900">
                  Payment Left:{" "}
                  <span>
                    RS {props.billData.Total - props.billData.Payment}
                  </span>
                </h3>
              </div>
              <TextField
                value={paymentIn}
                type="number"
                onChange={editpayment}
                sx={{ margin: "1rem" }}
                label="Payment"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
