import React from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { Box, Text, List, ListItem, Flex } from "@chakra-ui/react";
import { ethers } from "ethers";

export default function Component() {
  const { contract } = useContract("0xbBB20796F5B513BFE293835FDC5271B24c8Fa992");
  const { data, isLoading } = useContractRead(contract, "getAllEventsDetails", []);
  console.log(data);

  const convertUnixTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  return (
    <Box p={6} shadow="md" borderWidth="1px" borderRadius="md">
      {isLoading && <Text>Loading...</Text>}
      {!isLoading && data && (
        <List spacing={4}>
          {data.map((event, index) => (
            <ListItem key={index} borderWidth="1px" borderRadius="md" p={4}>
              <Flex>
                <Box mr={4}>
                  <img
                    style={{ borderRadius: '10px', width: '100%', maxWidth: '278px', height: 'auto' }}
                    src={`https://ipfs.io/ipfs/${event.imageUrl.split('ipfs://')[1]}`}
                    alt={'notfound'}
                  />
                </Box>
                <Box>
                  <Text fontWeight="bold" fontSize="lg">
                    Event Name: {event.name}
                  </Text>
                  <Text fontWeight="bold" fontSize="md">
                    Price: {ethers.utils.formatEther(event.ticketPrice.toString())}
                  </Text>
                  <Text fontWeight="bold" fontSize="md">
                    Total Tickets: {event.totalTickets.toNumber()}
                  </Text>
                  <Text fontWeight="bold" fontSize="md">
                    Available Tickets: {event.availableTickets.toNumber()}
                  </Text>
                  <Text fontSize="md">
                    Start Time: {convertUnixTimestamp(event.startTime.toNumber())}
                  </Text>
                </Box>
              </Flex>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

