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
import { format } from 'date-fns';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import { Autocomplete } from '@react-google-maps/api';

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
    id: 'movingIn',
    name: 'Moving In',
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
  address: string;
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
  movingIn: boolean;
  movingOut: boolean;
  interiorWindows: boolean;
};

const formSchema = z.object({
  address: z.string().min(1),
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
  movingIn: z.boolean(),
  movingOut: z.boolean(),
  interiorWindows: z.boolean(),
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
        className="border border-black rounded-full px-3 py-1"
      >
        -
      </button>
      <div className="  ">{field.value}</div>
      <button
        onClick={onIncrement}
        className="border border-black rounded-full px-3 py-1"
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
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
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
      movingIn: false,
      movingOut: false,
      interiorWindows: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('Submitting Step', currentStep);
    console.log('Form Values', values);

    setFormData((prev) => ({ ...prev, ...values, time: time }));

    if (currentStep < 3) {
      console.log('Moving to Next Step');
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Final submission', values);
      // Here you would handle the final submission, like sending data to an API
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
    'Book your services',
    'What address do you want us to come to',
    'What day and time works best for you',
    'What Service do you need from us',
  ];

  return (
    <Modal
      title={titleBasedOnStage[currentStep]}
      description=""
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="">
        {currentStep === 2 && (
          <div className="mb-4 w-100 ">
            <div className="flex justify-between  mb-4   ">
              <p className="font-light">Location</p>
              <div className="flex gap-2">
                <p className="font-thin">{(formData as FormData).address}</p>
                <HomeIcon strokeWidth={1} />
              </div>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="mb-4 ">
            <div className="flex gap-4 mb-4 items-center justify-between">
              <p className="font-light">Location:</p>
              <div className="flex gap-2 items-center">
                <p className="font-thin">{(formData as FormData).address}</p>
                <HomeIcon strokeWidth={1} />
              </div>
            </div>
            <div className="mt-2 font-thin flex justify-between">
              <div className="font-light">Selected Date: </div>
              <div className="flex gap-1 text-right">
                {date ? format(date, 'PPP') : 'None'} at {time || 'None'}
                <History strokeWidth={1} />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {currentStep === 1 && (
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Address</FormLabel>
                      <FormControl>
                        <Autocomplete>
                          <Input placeholder="Your address" {...field} />
                        </Autocomplete>
                      </FormControl>
                    </FormItem>
                  )}
                />
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
                        disabled={(date) => date < new Date()}
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
                        {[
                          '07:00',
                          '07:30',
                          '08:00',
                          '08:30',
                          '09:00',
                          '09:30',
                          '10:00',
                          '10:30',
                          '11:00',
                          '11:30',
                        ].map((timeSlot) => {
                          const fullTimeSlot = `${timeSlot} AM`;
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
                      <TabsContent value="PM" className="flex flex-wrap gap-2">
                        {[
                          '12:00',
                          '12:30',
                          '01:00',
                          '01:30',
                          '02:00',
                          '02:30',
                          '03:00',
                          '03:30',
                          '04:00',
                          '04:30',
                          '05:00',
                          '05:30',
                          '06:00',
                          '06:30',
                          '06:00',
                          '06:30',
                          '07:00',
                          '07:30',
                          '08:00',
                          '08:30',
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
                          <DoorClosed strokeWidth={1} />
                          <FormLabel className="text-lg font-normal">
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
                          <ShowerHead strokeWidth={1} />
                          <FormLabel className="text-lg font-normal">
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
                      className="flex items-center justify-between space-y-2"
                    >
                      <div className="flex items-center space-x-2 ">
                        <input
                          type="checkbox"
                          {...form.register(service.id)}
                          id={service.id}
                          className="checkbox-input-class" // Add your styling classes here
                        />
                        <label
                          htmlFor={service.id}
                          className="text-sm font-medium leading-none"
                        >
                          {service.name}
                        </label>
                      </div>
                      <div className="flex items-center justify-between w-[105px]">
                        <AlarmPlus strokeWidth="1" width={20} />
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

                <Button
                  type="submit"
                  className="mt-5"
                  disabled={currentStep === 2 && !time}
                >
                  {currentStep === 1 || currentStep === 2 ? 'Next' : 'Book'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
