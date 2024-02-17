import React, { useState } from "react";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { ConnectWallet } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { Input, Button, Box, FormControl, FormLabel, Heading } from "@chakra-ui/react";
import NavbarPage from '../components/Navbar';

export default function Component() {
  const { contract } = useContract("0xcd5FBE3a8A865B6041D3e31cf768741FaeB82c26");
  const { mutateAsync: createEvent, isLoading } = useContractWrite(contract, "createEvent");

  const [name, setName] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [totalTickets, setTotalTickets] = useState("");
  const [approvalThreshold, setApprovalThreshold] = useState("");

  const call = async () => {
    try {
      const data = await createEvent({ args: [name, ethers.utils.parseEther(ticketPrice), totalTickets, approvalThreshold] });
      console.info("contract call success", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  return (
    <>
    <NavbarPage />
    <Box p={4}>
      <ConnectWallet />
      <Heading size="lg" mb={4}>
        Create Event
      </Heading>

      <FormControl>
        <FormLabel>Name:</FormLabel>
        <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Ticket Price:</FormLabel>
        <Input type="text" value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)} />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Total Tickets:</FormLabel>
        <Input type="text" value={totalTickets} onChange={(e) => setTotalTickets(e.target.value)} />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Approval Threshold:</FormLabel>
        <Input type="text" value={approvalThreshold} onChange={(e) => setApprovalThreshold(e.target.value)} />
      </FormControl>

      <Button mt={4} colorScheme="teal" isLoading={isLoading} onClick={call}>
        Create Event
      </Button>
    </Box>
    </>
  );
}
