'use client';

import { useStoreModal } from '@/hooks/use-store-modal';
import { Modal } from '../modal';
import * as z from 'zod';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { useState } from 'react';
import {
  AlarmPlus,
  DoorClosed,
  History,
  HomeIcon,
  ShowerHead,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { addDays, format } from 'date-fns';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

type ServiceKeys = keyof Omit<
  typeof formSchema.shape,
  'address' | 'rooms' | 'bathrooms' | 'date' | 'time'
>;

const additionalServices: {
  id: ServiceKeys;
  name: string;
  time: string;
}[] = [
  {
    id: 'insideFridge',
    name: 'Inside Fridge',
    time: '+30 minutes',
  },
  {
    id: 'insideOven',
    name: 'Inside Oven',
    time: '+30 minutes',
  },
  {
    id: 'insideCabinet',
    name: 'Inside Cabinet',
    time: '+30 minutes',
  },
  {
    id: 'insideMicrowave',
    name: 'Inside Microwave',
    time: '+15 minutes',
  },
  {
    id: 'laundry',
    name: 'Laundry',
    time: '+30 minutes',
  },
  {
    id: 'deepCleaning',
    name: 'Deep Cleaning',
    time: '+45 minutes',
  },
  {
    id: 'carpetCleaning',
    name: 'Carpet Cleaning',
    time: '+60 minutes',
  },
  {
    id: 'movingOut',
    name: 'Moving Out',
    time: '+60 minutes',
  },
  {
    id: 'interiorWindows',
    name: 'Interior Windows',
    time: '+30 minutes',
  },
];

type FormData = {
  type: string;
  address: {
    apartmentNumber?: string;
    street: string;
    city: string;
    postalCode: string;
  };
  rooms: number;
  bathrooms: number;
  date: Date;
  time: string;
  insideFridge: boolean;
  insideOven: boolean;
  insideCabinet: boolean;
  insideMicrowave: boolean;
  laundry: boolean;
  deepCleaning: boolean;
  carpetCleaning: boolean;
  movingOut: boolean;
  interiorWindows: boolean;
};

const formSchema = z.object({
  address: z.object({
    apartmentNumber: z.string().optional(),
    street: z.string().min(1, { message: 'Street is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    postalCode: z.string().min(1, { message: 'Postal Code is required' }),
  }),
  rooms: z.number().min(1),
  bathrooms: z.number().min(1),
  date: z.date(),
  time: z.string(),
  insideFridge: z.boolean(),
  insideOven: z.boolean(),
  insideCabinet: z.boolean(),
  insideMicrowave: z.boolean(),
  laundry: z.boolean(),
  deepCleaning: z.boolean(),
  carpetCleaning: z.boolean(),
  movingOut: z.boolean(),
  interiorWindows: z.boolean(),
  type: z.enum(['home', 'business'], {
    required_error: 'You need to select what kind of service you need',
  }),
});

type NumberFieldKeys = 'rooms' | 'bathrooms';

interface CounterInputProps {
  name: NumberFieldKeys;
  control: any;
}

const CounterInput: React.FC<CounterInputProps> = ({ name, control }) => {
  const { field } = useController({
    name,
    control,
    defaultValue: 1,
  });

  const onIncrement = () => field.onChange(field.value + 1);
  const onDecrement = () => field.onChange(Math.max(1, field.value - 1));

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onDecrement}
        disabled={field.value <= 1}
        className="border bg-primaryBlue border-primaryBlue text-white cursor-pointer rounded-full px-3 py-1 text-md "
      >
        -
      </button>
      <div className="text-sm">{field.value}</div>
      <button
        onClick={onIncrement}
        className="border bg-primaryBlue border-primaryBlue text-white cursor-pointer rounded-full px-3 py-1 text-md"
      >
        +
      </button>
    </div>
  );
};

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData | {}>({});
  const [time, setTime] = useState('');
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const tomorrow = addDays(new Date(), 1);
  const [date, setDate] = useState(tomorrow);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: {
        apartmentNumber: '',
        street: '',
        city: '',
        postalCode: '',
      },
      rooms: 1,
      bathrooms: 1,
      date: new Date(),
      time: '',
      insideFridge: false,
      insideOven: false,
      insideCabinet: false,
      insideMicrowave: false,
      laundry: false,
      deepCleaning: false,
      carpetCleaning: false,
      movingOut: false,
      interiorWindows: false,
      type: 'home',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('Submitting Step', currentStep);
    console.log('Form Values', values);

    setFormData((prev) => ({
      ...prev,
      ...values,
      time: time,
    }));

    if (currentStep < 4) {
      console.log('Moving to Next Step');
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Final submission', values);
      if (showOrderSummary) {
        storeModal.onClose();
        router.push(`/order`);
      } else {
        setShowOrderSummary(true);
      }
    }
  };

  const handleBack = () => {
    console.log('Current Step before Back:', currentStep);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleTimeSelection = (selectedTime: string) => {
    setTime(selectedTime);
    form.setValue('time', selectedTime);
  };

  const titleBasedOnStage = [
    'What kind of services can we help with',
    'What address do you want us to come to',
    'What day and time works best for you',
    'What Service can we help with',
  ];
  const descBasedOnStage = [
    '',
    'We are currently operating in the GTA only',
    'Bookings start from tomorrow',
  ];

  return (
    <Modal
      title={titleBasedOnStage[currentStep - 1]}
      description={descBasedOnStage[currentStep - 1] || ''}
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="">
        {currentStep === 2 && (
          <div className="mb-4 w-100 ">
            <div className="flex justify-between  mb-4   ">
              <p className="font-light">Location</p>
              <div className="flex gap-2 items-end">
                <p className="font-thin text-sm">
                  {(formData as FormData).address &&
                    `${
                      (formData as FormData).address.apartmentNumber
                        ? (formData as FormData).address.apartmentNumber + ' - '
                        : ''
                    }${(formData as FormData).address.street || ''}`}
                </p>

                <HomeIcon strokeWidth={1} />
              </div>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="mb-4 ">
            <div className="flex gap-4 mb-4 items-center justify-between">
              <p className="font-light">Location:</p>
              <div className="flex gap-2 items-end">
                <p className="font-thin text-sm">
                  {(formData as FormData).address &&
                    `${
                      (formData as FormData).address.apartmentNumber
                        ? (formData as FormData).address.apartmentNumber + ' - '
                        : ''
                    }${(formData as FormData).address.street || ''}`}
                </p>

                <HomeIcon strokeWidth={1} color="#0e7490" />
              </div>
            </div>
            <div className="mt-2 font-thin flex justify-between">
              <div className="font-light">Selected Date: </div>
              <div className="flex gap-1 text-right text-sm items-center">
                {date ? format(date, 'PPP') : 'None'} at {time || 'None'}
                <History strokeWidth={1} color="#0e7490" />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {currentStep === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What kind of location is this?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            {...field}
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="home" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Home
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="business" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Business
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
              )}
              {currentStep === 2 && (
                <>
                  <FormField
                    control={form.control}
                    name="address.apartmentNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apartment Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your apartment number"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Your address" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Your city" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Your postal code" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
              )}

              {currentStep === 2 && (
                <div className="md:flex md:items-start md:gap-4">
                  <FormItem>
                    <FormControl>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(selectedDate) => {
                          if (selectedDate) {
                            setDate(selectedDate);
                            form.setValue('date', selectedDate);
                          }
                        }}
                        disabled={(date) => date <= new Date()}
                        className="rounded-md border shadow"
                      />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <Tabs defaultValue="AM">
                      <TabsList>
                        <TabsTrigger value="AM">AM</TabsTrigger>
                        <TabsTrigger value="PM">PM</TabsTrigger>
                      </TabsList>

                      <TabsContent value="AM" className="flex flex-wrap gap-2">
                        {['07:00', '08:00', '09:00', '10:00', '11:00'].map(
                          (timeSlot) => {
                            const fullTimeSlot = `${timeSlot} AM`;
                            const isSelected = time === fullTimeSlot;

                            return (
                              <Button
                                key={timeSlot}
                                type="button"
                                className={`border rounded-md px-4 py-2 ${
                                  isSelected ? 'bg-sky-950 text-white' : ''
                                }`}
                                onClick={() =>
                                  handleTimeSelection(fullTimeSlot)
                                }
                              >
                                {timeSlot}
                              </Button>
                            );
                          }
                        )}
                      </TabsContent>
                      <TabsContent value="PM" className="flex flex-wrap gap-2">
                        {[
                          '12:00',
                          '01:00',
                          '02:00',
                          '03:00',
                          '04:00',
                          '05:00',
                          '06:00',
                          '07:00',
                          '08:00',
                        ].map((timeSlot) => {
                          const fullTimeSlot = `${timeSlot} PM`;
                          const isSelected = time === fullTimeSlot;

                          return (
                            <Button
                              key={timeSlot}
                              type="button"
                              className={`border rounded-md px-4 py-2 ${
                                isSelected ? 'bg-sky-950 text-white' : ''
                              }`}
                              onClick={() => handleTimeSelection(fullTimeSlot)}
                            >
                              {timeSlot}
                            </Button>
                          );
                        })}
                      </TabsContent>
                    </Tabs>
                  </FormItem>
                </div>
              )}

              {currentStep === 3 && (
                <>
                  <FormField
                    control={form.control}
                    name="rooms"
                    render={() => (
                      <FormItem className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <DoorClosed strokeWidth={1} width={20} height={20} />
                          <FormLabel className="text-md font-normal">
                            Rooms
                          </FormLabel>
                        </div>

                        <FormControl>
                          <CounterInput name="rooms" control={form.control} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={() => (
                      <FormItem className="flex justify-between items-center mt-5">
                        <div className="flex items-center gap-1">
                          <ShowerHead strokeWidth={1} width={20} height={20} />
                          <FormLabel className="text-md font-normal">
                            Bathrooms
                          </FormLabel>
                        </div>
                        <FormControl>
                          <CounterInput
                            name="bathrooms"
                            control={form.control}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <h1 className="my-4 font-semibold">Additional Services</h1>

                  {additionalServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between space-y-3"
                    >
                      <div className="flex items-center space-x-2  ">
                        <input
                          type="checkbox"
                          {...form.register(service.id)}
                          id={service.id}
                          className="checkbox-input-class"
                        />
                        <label
                          htmlFor={service.id}
                          className="text-sm font-medium leading-none"
                        >
                          {service.name}
                        </label>
                      </div>
                      <div className="flex items-center justify-between w-[115px]">
                        <AlarmPlus strokeWidth="1" width={20} color="#0e7490" />
                        <p className="text-sm font-light">{service.time}</p>
                      </div>
                    </div>
                  ))}
                </>
              )}

              <div className="flex items-center justify-between">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    onClick={handleBack}
                    variant="outline"
                    className="mt-5"
                  >
                    Back
                  </Button>
                )}

                {currentStep === 1 || currentStep === 2 || currentStep === 3 ? (
                  <Button
                    type="submit"
                    className="mt-5"
                    disabled={currentStep === 2 && !time}
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="mt-5">
                    Request Quote
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
