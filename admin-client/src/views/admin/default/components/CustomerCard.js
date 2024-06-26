// Chakra imports
import { Box, Flex, Text, Select, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React, { useEffect, useState } from "react";
import LineChart from "components/charts/LineAreaChart";
import { BACK_END_HOST } from "utils/AppConfig";
import moment from "moment";
import api from "utils/Services";

export default function Conversion(props) {
    const { text, ...rest } = props;

    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const cardColor = useColorModeValue("white", "navy.700");
    const cardShadow = useColorModeValue(
        "0px 18px 40px rgba(112, 144, 176, 0.12)",
        "unset"
    );

    const [returningCustomers, setReturningCustomer] = useState([]);
    const [newCustomers, setNewCustomers] = useState([]);

    useEffect(() => {
      api.get(`${BACK_END_HOST}/order/ratio-returning-customer/${moment().year()}`)
        .then((res) => {
          const data = res.data;
          setReturningCustomer(data.returningCustomers);
          setNewCustomers(data.newCustomers);
        })
        .catch((error) => console.log('customercard error', error))
    }, [])
    return (
        <Card p='20px' align='center' direction='column' w='100%' {...rest}>
            <Flex
                px={{ base: "0px", "2xl": "10px" }}
                justifyContent='center'
                // alignItems='center'
                w='100%'
                mb='8px'>
                <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
                    {text ? text : 'Biểu đồ'}
                </Text>
                <Select
                    fontSize='sm'
                    variant='subtle'
                    defaultValue='monthly'
                    width='unset'
                    fontWeight='700'>
                    <option value='2024'>2024</option>
                    <option value='2025'>2025</option>
                    <option value='2026'>2026</option>
                </Select>
            </Flex>

            <LineChart
                h='100%'
                w='100%'
                returningCustomers={returningCustomers}
                newCustomers={newCustomers}
            />
            <Card
                bg={cardColor}
                flexDirection='row'
                boxShadow={cardShadow}
                w='100%'
                p='15px'
                px='20px'
                mt='15px'
                mx='auto'>
                {/* <Flex direction='column' py='5px'>
          <Flex align='center'>
            <Box h='8px' w='8px' bg='brand.500' borderRadius='50%' me='4px' />
            <Text
              fontSize='xs'
              color='secondaryGray.600'
              fontWeight='700'
              mb='5px'>
              Your files
            </Text>
          </Flex>
          <Text fontSize='lg' color={textColor} fontWeight='700'>
            63%
          </Text>
        </Flex>
        <VSeparator mx={{ base: "60px", xl: "60px", "2xl": "60px" }} />
        <Flex direction='column' py='5px' me='10px'>
          <Flex align='center'>
            <Box h='8px' w='8px' bg='#6AD2FF' borderRadius='50%' me='4px' />
            <Text
              fontSize='xs'
              color='secondaryGray.600'
              fontWeight='700'
              mb='5px'>
              System
            </Text>
          </Flex>
          <Text fontSize='lg' color={textColor} fontWeight='700'>
            25%
          </Text>
        </Flex> */}
            </Card>
        </Card>
    );
}
