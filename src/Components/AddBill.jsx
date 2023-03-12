import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../Store/billDataSlice";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { closeBillModel } from "../Store/billopenSlice";

export default function AddBill() {
  const open = useSelector((state) => state.billopen.openBill);
  const data = useSelector((state) => state.allItemData.itemData);
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);

  const [selectedNameId, setSelectedNameId] = useState(null);

  const handleAutocompleteChange = (event, value) => {
    const selectedData = Object.values(data).find((d) => d.Name === value);
    console.log(selectedData);
    setSelectedNameId(selectedData?.Id ?? null);
    setValue("Name", selectedData?.Name ?? "");

    setValue("Price", selectedData?.Price ?? "");
    setValue(
      "Warrenty",
      selectedData?.Warrenty === 0
        ? "None"
        : `${selectedData?.Warrenty ?? ""} ${selectedData?.WarrentyType ?? ""}`
    );

    setValue("Qty", selectedData?.Stock === 0 ? 0 : 1);
  };

  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeBillModel());
  };
  const schema = yup
    .object()
    .shape({
      Name: yup.string().required(),
      Price: yup
        .number()
        .required()
        .test("non-zero", "Price cannot be 0", function (value) {
          return value !== 0;
        }),

      Warrenty: yup.string().required(),
      Qty: yup.number().required().min(1, "Value cannot be 0"),
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
  });
  const billNow = (e) => {
    const x = e;
    x["IdItem"] = selectedNameId;

    dispatch(addItem(x));

    dispatch(closeBillModel());
    // dispatch(addId(selectedNameId));
    setSelectedNameId(null);
    reset();
  };
  useEffect(() => {
    if (selectedNameId !== null) {
      setValue(
        "Price",
        watch("Qty") === "" ? "" : watch("Qty") * data[selectedNameId]["Price"]
      );
    } else {
      setValue(
        "Price",
        watch("Qty") === "" ? "" : watch("Qty") * watch("Price")
      );
    }
  }, [watch("Qty")]);

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
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={data && Object.values(data).map((d) => d.Name)}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Search Stock" />
            )}
            onChange={handleAutocompleteChange}
            onInputChange={(event, value) => {
              if (value === "") {
                setValue("Name", "");
                setValue("Price", "");
                setValue("Warrenty", "");
                setValue("Qty", "");
                setSelectedNameId(null);

                reset();
              }
            }}
          />
          <form
            className=" grid grid-rows-8 mt-4 gap-3"
            onSubmit={handleSubmit(billNow)}
          >
            <span>Product Name</span>
            <TextField
              type={"text"}
              {...register("Name", { required: "Add Product Name" })}
            />

            {errors.Qty && (
              <span className=" text-red-500">{errors.Qty.message}</span>
            )}

            <span>Product Price</span>

            <TextField
              type={"number"}
              {...register("Price", {
                required: "Value cannot be 0",
              })}
            />
            {errors.Price && (
              <span className=" text-red-500">{errors.Price.message}</span>
            )}

            <span>Qty</span>

            <TextField
              type={"number"}
              {...register(
                "Qty",

                {
                  required: "Value cannot be 0",
                  min: {
                    value: 1,
                    message: "Value cannot be 0",
                  },
                }
              )}
            />

            <span>Product Warrenty</span>

            <TextField
              type={"Warrenty"}
              {...register("Warrenty", { required: "Add Product Worrenty" })}
            />
            <button type="submit" className=" p-4 bg-green-600 text-white">
              Add
            </button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={() => {
              setSelectedNameId(null);
              reset();
            }}
          >
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
