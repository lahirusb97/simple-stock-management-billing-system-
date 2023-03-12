import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { closeAddModel } from "../Store/counterSlice";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { getDatabase, ref, child, push, update } from "firebase/database";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useState, useEffect } from "react";
export default function AddPopUp() {
  const open = useSelector((state) => state.popup.addItem);

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeAddModel());
  };
  const schema = yup
    .object()
    .shape({
      Name: yup.string().required(),
      Stock: yup.number().required(),
      StockAlert: yup.number().required(),
      Cost: yup.number().required(),
      Price: yup.number().required(),
      Seller_Name: yup.string().default(""),
      Contact: yup.string().default(""),
      WarrentyType: yup.string().required().default("None"),
      Warrenty: yup.number().notRequired(),
      Description: yup.string().notRequired().default(""),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: schema.default(),
  });
  const toast = useToast();
  useEffect(() => {
    if (watch("WarrentyType") === "None") {
      setValue("Warrenty", 0);
    } else {
      setValue("Warrenty", "");
    }
  }, [watch("WarrentyType")]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{"Add Product"}</DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit((data) => {
              const db = getDatabase();
              const newPostKey = push(child(ref(db), "Hi_Mobile/Stock")).key;
              const updates = {};
              data.Id = newPostKey;
              setValue("Name", data.Name.toLowerCase());
              updates["/Hi_Mobile/Stock/" + newPostKey] = data;
              update(ref(db), updates)
                .then(() => {
                  toast({
                    title: "Item Added.",
                    description: "You Are Sucessfully Added A Item.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                  reset();
                  handleClose();
                })
                .catch((error) => {
                  toast({
                    title: "Error.",
                    description: "Check Your Internet Connection.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                });
            })}
            className="pt-4 grid grid-flow-row grid-cols-2 gap-4"
          >
            <TextField
              {...register("Name", { required: "Add Product Name" })}
              className=" sm:w-96 w-full col-start-1 col-end-3"
              label="Product Name"
              variant="outlined"
              placeholder={errors.Name?.message}
              onChange={(e) => {
                setValue("Name", e.target.value.toLowerCase());
              }}
            />
            <label className="col-start-1 col-end-3">Warrenty</label>
            <label className="flex">
              None
              <input
                className=""
                defaultChecked
                type={"radio"}
                value="None"
                {...register("WarrentyType", { required: true })}
              />
            </label>
            <label className="flex ">
              Week
              <input
                value="Week"
                type={"radio"}
                {...register("WarrentyType", { required: true })}
              />
            </label>
            <label className="flex ">
              Month
              <input
                value="Month"
                type={"radio"}
                {...register("WarrentyType", { required: true })}
              />
            </label>
            <label className="flex ">
              Year
              <input
                value="Year"
                type={"radio"}
                {...register("WarrentyType", { required: true })}
              />
            </label>

            {watch("WarrentyType") !== "None" ? (
              <TextField
                type={"number"}
                {...register("Warrenty", {
                  required: watch("WarrentyType") === "None" ? false : true,
                })}
                label="Warrenty Time"
                variant="outlined"
                placeholder={errors.Warrenty?.message}
                onChange={(e) => {
                  setValue("Warrenty", e.target.value);
                }}
                className=" col-start-1 col-end-3"
              />
            ) : (
              <></>
            )}

            <TextField
              type={"number"}
              {...register("Stock", {
                required: "Add Stock Amount",
                valueAsNumber: true,
              })}
              className="col-start-1 col-end-2"
              label="Stock"
              variant="outlined"
              placeholder={errors.Stock?.message}
            />
            <TextField
              type={"number"}
              {...register("StockAlert", {
                required: "Add Altert Limit ",
                valueAsNumber: true,
              })}
              className="col-start-2 col-end-3"
              label="Stock Alert"
              variant="outlined"
              placeholder={errors.StockAlert?.message}
            />

            <TextField
              type={"number"}
              {...register("Cost", {
                required: "Add Item Cost",
                valueAsNumber: true,
              })}
              className=" "
              label="Cost"
              variant="outlined"
              placeholder={errors.Cost?.message}
            />

            <TextField
              type={"number"}
              {...register("Price", {
                required: "Add Item Price",
                valueAsNumber: true,
              })}
              className="col-start-2 col-end-3 "
              label="Price"
              variant="outlined"
              placeholder={errors.Price?.message}
            />
            <TextField
              {...register("Seller_Name", { required: false })}
              className="col-start-1 col-end-3"
              label="Seller Name"
              variant="outlined"
            />
            <TextField
              {...register("Contact", { required: false })}
              className="col-start-1 col-end-3"
              label="Seller Contact"
              variant="outlined"
              type={"number"}
            />
            <TextField
              {...register("Description")}
              className="col-start-1 col-end-3"
              label="Description"
              variant="outlined"
            />
            <button
              className="p-4 bg-green-500 font-semibold text-white "
              type="submit"
              autoFocus
            >
              Add
            </button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
