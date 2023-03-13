import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { closeBillModel } from "../Store/billopenSlice";
import { useDispatch } from "react-redux";
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
export default function ModalBill() {
  const dispatch = useDispatch();

  const open = useSelector((state) => state.billopen.openBill);
  const allStockData = useSelector((state) => state.itemDataSlice.itemData);
  const handleClose = () => {
    dispatch(closeBillModel());
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{"New Bill"}</DialogTitle>
        <DialogContent>
          <div className=" w-full">
            <div className=" border-4 border-black p-4">
              <h1 className=" text-center font-bold text-4xl">Your Shop</h1>
              <div className="flex justify-center">
                <CallIcon />
                <p className=" mx-2 text-center">01234567890</p>
              </div>
              <div className="flex justify-between">
                <h3>
                  Bill NO:<spna className=" font-semibold">0001</spna>
                </h3>
                <h3>
                  Date:<spna className=" font-semibold">2023/01/10</spna>
                </h3>
              </div>
            </div>

            <ChakraProvider>
              <Box>
                <Heading>Billing</Heading>

                <Box overflowY="auto" minHeight="400px" maxWidth={600}>
                  <Table variant="striped">
                    <Thead position="sticky" top={0} bgColor="black">
                      <Tr>
                        <Th textColor={"white"}>Qty</Th>
                        <Th textColor={"white"}>Description</Th>
                        <Th textColor={"white"}>Warrenty</Th>
                        <Th textColor={"white"}>Price</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr onClick={() => {}}>
                        <Td>
                          <Input />
                        </Td>
                        <Td>
                          <Input />
                        </Td>
                        <Td>
                          <Input />
                        </Td>
                        <Td>
                          <Input />
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Box>
              </Box>
            </ChakraProvider>
            <div className=" flex flex-col ">
              <p>.....................</p>
              <h3 className=" pl-3">signature</h3>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
