import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  getDatabase,
  ref,
  child,
  push,
  update,
  onValue,
  remove,
} from "firebase/database";
import { useToast } from "@chakra-ui/react";
import { ToastProvider } from "@chakra-ui/react";

export default function Repair() {
  const toast = useToast();
  const [load, setload] = useState(false);
  const [allData, setallData] = useState(null);
  const [process, setprcess] = useState("pending");
  const [selectedId, setselectedId] = useState(null);

  // const [process,setprcess]=useState('pending');

  const [billTab, setBillTab] = useState(false);
  const schema = yup.object().shape({
    Modal: yup.string().required(),
    Falt: yup.string().required(),
    Note: yup.string().required(),
    Contact: yup.string().required(),
    Name: yup.string().required(),
  });

  const { register, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAdd = (e) => {
    const db = getDatabase();
    const newPostKey = push(child(ref(db), "Hi_Mobile/Repair")).key;
    const updates = {};
    e.Id = newPostKey;
    e.Process = "pending";
    updates["/Hi_Mobile/Repair/" + newPostKey] = e;
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
        setOpen(false);
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
  };
  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "/Hi_Mobile/Repair");
    // const searchData = query(
    //   ref(db, "/Hi_Mobile/Stock/"),
    //   orderByChild("Name"),
    //   startAt(`${search}\uf8ff`)
    // );

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists) {
        setallData(data);
        if (data !== null) {
          setload(true);
        } else {
          setload(false);
        }
      } else {
        setload(false);
      }
      // Object.values(data).forEach((val) => {

      // });
    });
  }, []);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Item
      </Button>
      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            // Set 'open' to false, however you would do that with your particular code.
            setOpen(false);
          }
        }}
      >
        <DialogTitle>New Repair</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleAdd)} className="flex flex-col">
            <TextField
              {...register("Modal")}
              sx={{ margin: "10px" }}
              label="Modal"
            />
            <TextField
              {...register("Falt")}
              sx={{ margin: "10px" }}
              label="Falt"
            />
            <TextField
              {...register("Note")}
              sx={{ margin: "10px" }}
              label="Note"
            />
            <TextField
              {...register("Contact")}
              sx={{ margin: "10px" }}
              label="Contact"
            />
            <TextField
              {...register("Name")}
              sx={{ margin: "10px" }}
              label="Name"
            />
            <button
              type="submit"
              className="p-4 m-2 bg-green-500 font-semibold"
            >
              Add
            </button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <div className="flex">
        {allData &&
          Object.values(allData).map((item, index) => (
            <div
              key={"rp" + index}
              onClick={() => {
                setBillTab(true);
                setselectedId(item["Id"]);
              }}
              className=" w-52 bg-blue-200 p-4 text-black m-4 text-left"
            >
              <h3>{index}</h3>
              <h3 className=" font-semibold">Mobile : {item["Modal"]}</h3>
              <h3 className=" font-semibold">Falt : {item["Falt"]}</h3>
              <h3 className=" font-semibold">Note : {item["Note"]}</h3>
              <h3 className=" font-semibold">Name : {item["Name"]}</h3>
              <h3 className=" font-semibold">Contact : {item["Contact"]}</h3>
              <h3 className=" font-semibold">
                Process :{" "}
                <span className="text-bold text-red-600">
                  {item["Process"]}
                </span>
              </h3>
            </div>
          ))}
      </div>
      <Dialog
        open={billTab}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            // Set 'open' to false, however you would do that with your particular code.
            setBillTab(false);
          }
        }}
      >
        <DialogTitle>Repair Progress</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Process</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={"Pending"}
              name="radio-buttons-group"
              onChange={(e) => {
                setprcess(e.target.value);
                const db = getDatabase();
                const updates = {};
                updates["/Hi_Mobile/Repair/" + selectedId + "/Process/"] =
                  e.target.value;
                update(ref(db), updates);
              }}
            >
              <FormControlLabel
                value="Pending"
                control={<Radio />}
                label="Pending"
              />
              <FormControlLabel
                value="Complete"
                control={<Radio />}
                label="Complete"
              />
              <FormControlLabel value="Fail" control={<Radio />} label="Fail" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              const db = getDatabase();
              remove(ref(db, "/Hi_Mobile/Repair/" + selectedId))
                .then(() => {
                  toast({
                    title: "Item Deleted.",
                    description: "You Are Sucessfully Deleted A Item.",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                  });
                  // reset();
                  setBillTab(false);
                })
                .catch((error) => {
                  // The write failed...
                });
            }}
            color="primary"
          >
            Delete Item
          </Button>
          <Button
            onClick={() => {
              setBillTab(false);
            }}
            color="primary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
