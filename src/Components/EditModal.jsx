import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Switch, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { closeEditModel } from "../Store/itemEditSlice";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import {
  getDatabase,
  ref,
  child,
  push,
  update,
  remove,
} from "firebase/database";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
export default function EditModal() {
  const dispatch = useDispatch();

  const open = useSelector((state) => state.editItemModal.editItem);
  const item = useSelector((state) => state.editItemModal.itemsData);
  const [edit, setedit] = useState(true);
  const [age, setAge] = useState("None");

  const handleClose = () => {
    dispatch(closeEditModel());
  };
  const schema = yup
    .object()
    .shape({
      Name: yup.string().required(),
      Stock: yup.number().required(),
      StockAlert: yup.number().required(),
      Cost: yup.number().required(),
      Price: yup.number().required(),
      Seller_Name: yup.string(),
      Contact: yup.string().default(""),
      Description: yup.string(),
      WarrentyType: yup.string(),
      Warrenty: yup.string(),
      Id: yup.string(),
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
    setValue("Id", item["Id"]);
    setValue("Name", item["Name"]);
    setValue("Stock", item["Stock"]);
    setValue("StockAlert", item["StockAlert"]);
    setValue("Cost", item["Cost"]);
    setValue("Price", item["Price"]);
    setValue("Stock", item["Stock"]);
    setValue("Contact", item["Contact"] === "" ? "" : item["Contact"]);
    setValue("Seller_Name", item["Seller_Name"]);
    setValue("Description", item["Description"]);
    setValue("WarrentyType", watch("WarrentyType"));
    setValue("Warrenty", item["Warrenty"]);
  }, [open, watch("WarrentyType")]);

  const handleDelete = () => {
    const db = getDatabase();
    remove(ref(db, "/Hi_Mobile/Stock/" + item["Id"]))
      .then(() => {
        toast({
          title: "Item Deleted.",
          description: "You Are Sucessfully Deleted A Item.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        // reset();
        handleClose();
      })
      .catch((error) => {
        // The write failed...
      });
  };
  const handleChange = (e) => {
    setAge(e.target.value);
  };
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
              const newPostKey = item["Id"];
              const updates = {};

              setValue("Name", data.Name.toLowerCase());
              updates["/Hi_Mobile/Stock/" + newPostKey] = data;

              update(ref(db), updates)
                .then(() => {
                  toast({
                    title: "Item Added.",
                    description: "You Are Sucessfully Added A Item.",
                    status: "success",
                    duration: 2000,
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
                    duration: 2000,

                    isClosable: true,
                  });
                });
            })}
            className="pt-4 grid grid-flow-row grid-cols-2 gap-4"
          >
            <label>
              Read Only
              <Switch
                checked={edit}
                onChange={(e) => {
                  setedit(e.target.checked);
                }}
              />
            </label>
            <TextField
              {...register("Name", { required: "Add Product Name" })}
              className=" sm:w-96 w-full col-start-1 col-end-3"
              label="Product Name"
              variant="outlined"
              placeholder={errors.Name?.message}
              inputProps={{ readOnly: edit }}
              onClick={() => {}}
            />
            <label>Warrenty</label>

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
            {/* <Select
              value={age}
              onChange={handleChange}
              autoWidth
              label="Warrenty"
              className=" mr-4 col-start-1 col-end-2"
            >
              <MenuItem value={"None"}>None</MenuItem>
              <MenuItem value={"month"}>Month</MenuItem>

              <MenuItem value={"Week"}>Week</MenuItem>
              <MenuItem value={"year"}>Year</MenuItem>
            </Select>
            {age !== "None" ? (
              <TextField
                type={"number"}
                {...register("Warrenty", {
                  required: age !== "None" ? true : false,
                })}
                label="Warrenty Time"
                variant="outlined"
                placeholder={errors.Name?.message}
                onChange={(e) => {
                  setValue("W", e.target.value.toLowerCase());
                }}
                className=" col-start-2 col-end-3"
              />
            ) : (
              <></>
            )} */}
            <TextField
              type={"number"}
              {...register("Stock", {
                required: "Add Stock Amount",
                valueAsNumber: true,
              })}
              className="col-start-1 col-end-2"
              label="Stock"
              variant="outlined"
              inputProps={{ readOnly: edit }}
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
              inputProps={{ readOnly: edit }}
              placeholder={errors.StockAlert?.message}
            />

            <TextField
              type={"number"}
              {...register("Cost", {
                required: "Add Item Cost",
                valueAsNumber: true,
              })}
              className="  "
              label="Cost"
              variant="outlined"
              inputProps={{ readOnly: edit }}
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
              inputProps={{ readOnly: edit }}
              placeholder={errors.Price?.message}
            />
            <TextField
              {...register("Seller_Name", { required: false })}
              className="col-start-1 col-end-3"
              label="Seller Name"
              inputProps={{ readOnly: edit }}
              variant="outlined"
            />
            <TextField
              {...register("Contact", { valueAsNumber: true })}
              className="col-start-1 col-end-3"
              label="Seller Contact"
              variant="outlined"
              inputProps={{ readOnly: edit }}
              type={"number"}
            />
            <TextField
              {...register("Description")}
              className="col-start-1 col-end-3"
              label="Description"
              inputProps={{ readOnly: edit }}
              variant="outlined"
            />
            <button
              className="p-4 bg-green-500 font-semibold text-white"
              type="submit"
              autoFocus
            >
              Save
            </button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Delete</Button>

          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
