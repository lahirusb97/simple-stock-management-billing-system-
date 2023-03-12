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
} from "@chakra-ui/react";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import DatePickerCom from "./DatePickerCom";

import { openBillModel } from "../Store/billopenSlice";
import { useSelector, useDispatch } from "react-redux";
import ModalBill from "./ModalBill";
import { useEffect } from "react";
import {
  getDatabase,
  ref,
  onValue,
  orderByChild,
  startAt,
  get,
  query,
  equalTo,
  endAt,
} from "firebase/database";
import BillModal from "./BillModal";
import {
  openbillEditModel,
  closebillEditModel,
} from "../Store/billmodaleopenSlice";
import { TextField } from "@mui/material";
import { openEditModel } from "../Store/itemEditSlice";
export default function Billing() {
  const [checked, setChecked] = useState(false);
  const [selected, setselected] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const dispatch = useDispatch();
  const open = useSelector((state) => state.billopen.openBill);
  const startDate = useSelector((state) => state.date.startdate);
  const endDate = useSelector((state) => state.date.enddate);
  const openEdit = useSelector((state) => state.billEdit.billEdit);
  const openupdate = useSelector((state) => state.billEdit.billEdit);

  const [datez, setDatez] = useState(new Date());
  const [uncomp, setUncomp] = useState("");
  const [data, setdata] = useState([]);
  const [selectItem, setSelectItem] = useState();
  useEffect(() => {
    const db = getDatabase();

    if (checked) {
      {
        const queryRef = query(
          ref(db, `Hi_Mobile/Bill/${datez.getFullYear()}`),
          orderByChild("CompletePayment"),
          equalTo(false)
        );

        get(queryRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              setdata(snapshot.val());
            } else {
              setdata(undefined);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else {
    }
  }, [checked, openEdit]);

  useEffect(() => {
    const datez = new Date();
    const db = getDatabase();
    setChecked(false);

    const queryRef = query(
      ref(db, `Hi_Mobile/Bill/${datez.getFullYear()}`),
      orderByChild("Date"),
      equalTo(`${startDate.syear}/${startDate.smonth}/${startDate.sd}`)
    );

    get(queryRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setdata(snapshot.val());
        } else {
          setdata(undefined);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [startDate["sd"], openEdit]);

  return (
    <div>
      {/* <button
        onClick={() => {
          dispatch(openBillModel());
        }}
        className=" px-6 py-4 my-4 bg-green-600 text-white"
      >
        New Bill
      </button> */}

      <DatePickerCom />
      <div className="flex flex-col items-start">
        <TextField
          label="Search"
          placeholder="Enter Bill Number"
          onChange={(e) => {
            setUncomp(e.target.value);
          }}
        />
        <label>
          InComplete Payments
          <Switch checked={checked} onChange={handleChange} />
        </label>
      </div>
      <ChakraProvider>
        <Box>
          <Heading>Billing</Heading>

          <Box overflowY="auto" maxHeight="300px">
            <Table variant="striped">
              <Thead position="sticky" top={0} bgColor="black">
                <Tr>
                  <Th textColor={"white"}>Bill No</Th>
                  <Th textColor={"white"}>Name</Th>
                  <Th textColor={"white"}>Date</Th>
                  <Th textColor={"white"}>Contact</Th>
                  <Th textColor={"white"}>Items</Th>
                  <Th textColor={"white"}>Price</Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* <Tr onClick={() => {}}>
                  <Td>1212</Td>
                  <Td>M.D Chamara Nuwan</Td>
                  <Td>1</Td>
                  <Td>10000</Td>
                  <Td>A12 Temperd Glass</Td>
                  <Td>20000</Td>
                </Tr> */}
                {data &&
                  Object.values(data).map((item, i) => (
                    <Tr
                      key={"bill" + i}
                      onClick={() => {
                        setselected(true);
                        setSelectItem(item);
                        dispatch(openbillEditModel(true));
                      }}
                    >
                      <Td>{item["BillNo"]}</Td>
                      <Td>{item["Name"]}</Td>
                      <Td>{`${datez.getFullYear()}/${item["Date_Month"]}/${
                        item["Date_Day"]
                      }`}</Td>
                      <Td>{item["Mobile"]}</Td>
                      <Td>
                        {Object.values(item["Items"]).map((e, i) => (
                          <span key={"xz" + i}>{e["Name"]}/</span>
                        ))}
                      </Td>
                      <Td>20000</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </ChakraProvider>
      {/* <ModalBill /> */}
      <BillModal billData={selectItem} />
    </div>
  );
}
