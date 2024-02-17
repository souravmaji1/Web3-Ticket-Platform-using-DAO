import { Text, Spacer, ButtonGroup } from '@chakra-ui/react'
import {
  FormLayout,
  Field,
  PrevButton,
  NextButton,
  FormStepper,
  StepsCompleted,
  FormValue,
  LoadingOverlay,
  LoadingSpinner,
  LoadingText,
  PropertyList,
  Property,
  Sidebar,
} from '@saas-ui/react'
import { StepForm } from '@saas-ui/forms/yup'
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import * as yup from 'yup'
import { ethers } from 'ethers';
import { useState } from 'react';


export default function CreateProject() {
  const steps = [
    {
      name: 'project',
      schema: yup.object({
        name: yup.string().required().label('Name'),
        ticketPrice: yup.number().required().label('Ticket Price'),
        totalTickets: yup.number().required().label('Total Tickets'),
        startEvent: yup.date().required().label('Start Event'),
        endEvent: yup.date().required().label('End Event'),
      }),
    },
    {
      name: 'members',
      schema: yup.object({
        members: yup.string().label('Members'),
      }),
    },
  ]

  const onSubmit = (params) => {
    console.log(params)
    call(params);
    return new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
  }

  const { contract } = useContract("0xDDBb46920fBB99E83629ddf0eBE423F168749d12");
  const { mutateAsync: createEvent, isLoading } = useContractWrite(contract, "createEvent");
  const [transactionStatus, setTransactionStatus] = useState('pending');

  const call = async (formValues) => {
    try {
      const { name, ticketPrice, totalTickets, startEvent, endEvent } = formValues;
      const startDate = new Date(startEvent);
      const endDate = new Date(endEvent);
      const datefrom = Math.floor(startDate.getTime() / 1000);
      const dateto = Math.floor(endDate.getTime() / 1000);
      const data = await createEvent({ args: [name, ethers.utils.parseEther(ticketPrice), totalTickets, '20', datefrom, dateto] });
      setTransactionStatus('success');
      console.info("contract call successs", data);
    } catch (err) {
      setTransactionStatus('failure');
      console.error("contract call failure", err);
    }
  }

  return (
    <div className='upload-page'>

   <Text borderBottomWidth='1px' marginBottom="30px" padding="10px" >Create Your Event</Text>
      
    <StepForm
    borderWidth="1px" padding="20px" borderRadius="12px"
      steps={steps}
      defaultValues={{
        name: '',
        ticketPrice: '',
        totalTickets: '',
        startEvent: '',
        endEvent: '',
      }}
      onSubmit={onSubmit}
    >
      {({ Field, FormStep }) => (
        <FormLayout>
          <FormStepper orientation="vertical">
            <FormStep name="project" title="Fill Your Event details">
            <FormLayout>
        <FormLayout >
          <Field
            name="name" isRequired label="Event Name"
          />
        </FormLayout>
        <FormLayout columns={2}>
          <Field name="ticketPrice" type="number" isRequired label="Ticket Price" />
          <Field name="totalTickets" type="number" isRequired label="Total Tickets" />
        </FormLayout>
        <FormLayout templateColumns="auto 25%">
          <Field name="startEvent" type="date" isRequired label="Start Event" />
          <Field name="endEvent" type="date" isRequired label="End Event" />
        </FormLayout>
        <NextButton />
      </FormLayout>
            </FormStep>
            <FormStep name="members" title="Confirm">
              <FormLayout>
              <Text>Please confirm that your information is correct.</Text>
                <PropertyList>
                  <Property label="Event Name" value={<FormValue name="name" />} />
                  <Property
                    label="Ticket Price"
                    value={<FormValue name="ticketPrice" />}
                  />
                  <Property label="Total Tickets" value={<FormValue name="totalTickets" />} />
                  <Property
                    label="Start Event"
                    value={<FormValue name="startEvent" />}
                  />
                  <Property
                    label="End Event"
                    value={<FormValue name="endEvent" />}
                  />
                </PropertyList>
                <ButtonGroup>
                  <NextButton />
                  <PrevButton variant="ghost" />
                </ButtonGroup>
              </FormLayout>
            </FormStep>
            <FormStep name="confirm" title="Pay Gas Fees">
              <FormLayout>
                <Text>Please confirm that your information is correct.</Text>
                <PropertyList>
                  <Property label="Name" value={<FormValue name="name" />} />
                  <Property
                    label="Description"
                    value={<FormValue name="description" />}
                  />
                </PropertyList>
                <ButtonGroup>
                  <NextButton />
                  <PrevButton variant="ghost" />
                </ButtonGroup>
              </FormLayout>
            </FormStep>

            <StepsCompleted>
            {transactionStatus === 'pending' && (
                <LoadingOverlay>
                  <LoadingSpinner />
                  <LoadingText>
                    We are setting up your project, just a moment...
                  </LoadingText>
                </LoadingOverlay>
              )}

              {transactionStatus === 'success' && (
                <Text fontSize="xl" color="green.500">
                  Transaction successful! Your project has been set up.
                </Text>
              )}

              {transactionStatus === 'failure' && (
                <Text fontSize="xl" color="red.500">
                  Transaction failed. Please try again.
                </Text>
              )}
            </StepsCompleted>
          </FormStepper>
        </FormLayout>
      )}
    </StepForm>
   
    </div>
  )
}