import React from "react";
import { useSelector, useDispatch } from "react-redux";

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
import Skeleton from "@mui/material/Skeleton";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "@mui/icons-material/Search";
import AddPopUp from "./AddPopUp";
import { openAddModel } from "../Store/counterSlice";
import { useEffect, useState, useRef } from "react";
import useWindowDimensions from "./useWindowDimensions";

import { openEditModel } from "../Store/itemEditSlice";
import EditModal from "./EditModal";
import {
  getDatabase,
  ref,
  onValue,
  orderByChild,
  startAt,
  get,
  query,
  equalTo,
} from "firebase/database";
import { addingData } from "../Store/itemDataSlice";
export default function Stock() {
  const count = useSelector((state) => state.popup.addItem);
  const editItemSwitch = useSelector((state) => state.editItemModal.editItem);
  const SelectedItemsData = useSelector(
    (state) => state.editItemModal.itemsData
  );
  const [search, setsearch] = useState("");
  const dispatch = useDispatch();
  const openPopUp = () => {
    dispatch(openAddModel());
  };
  const [stockData, setstockData] = useState({});
  const [load, setload] = useState(false);
  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "/Hi_Mobile/Stock");
    // const searchData = query(
    //   ref(db, "/Hi_Mobile/Stock/"),
    //   orderByChild("Name"),
    //   startAt(`${search}\uf8ff`)
    // );

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists) {
        setstockData(data);
        dispatch(addingData(data));
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
  }, [search]);

  const filteredStockData = stockData
    ? Object.keys(stockData).filter((item) => {
        return stockData[item]["Name"]
          .toLowerCase()
          .includes(search.toLowerCase());
      })
    : [];
  const { height, width } = useWindowDimensions();
  const [heightz, setHeight] = useState(0);
  const divRef = useRef(null);

  useEffect(() => {
    setHeight(divRef.current.clientHeight);
  }, []);
  return (
    <div>
      <div ref={divRef}>
        <button
          onClick={openPopUp}
          className="block p-4 my-4 bg-green-600 text-white"
        >
          Add Product
        </button>
        <TextField
          className=" "
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          label="Search"
          variant="outlined"
          onChange={(e) => {
            setsearch(e.target.value);
          }}
        />
      </div>
      <div className="">
        <ChakraProvider>
          <Box>
            <Box overflowY="auto" maxHeight={`${height - heightz}`}>
              <Heading>My Stock</Heading>

              <Table variant="striped">
                <Thead position="sticky" top={0} bgColor="black">
                  <Tr>
                    <Th textColor={"white"}>NO</Th>
                    <Th textColor={"white"}>Product Name</Th>
                    <Th textColor={"white"}>Stock</Th>
                    <Th textColor={"white"}>Alert</Th>
                    {/* <Th textColor={"white"}>Cost</Th> */}
                    <Th width={0} textColor={"white"}>
                      Price
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredStockData.map((item, i) => (
                    <Tr
                      key={"s" + i}
                      onClick={() => {
                        dispatch(openEditModel(stockData[item]));
                      }}
                    >
                      <Td width={0}>{i}</Td>
                      <Td>{stockData[item]["Name"].capitalize()}</Td>
                      <Td>{stockData[item]["Stock"]}</Td>
                      <Td>{stockData[item]["StockAlert"]}</Td>
                      {/* <Td>{stockData[item]["Cost"]}</Td> */}
                      <Td>{stockData[item]["Price"]}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </ChakraProvider>
        <AddPopUp />
        <EditModal />
      </div>
    </div>
  );
}
Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});
