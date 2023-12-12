'use client';

import { useStoreModal } from '@/hooks/use-store-modal';
import { Modal } from '../modal';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { useState } from 'react';
import { DoorClosed, History, HomeIcon, ShowerHead } from 'lucide-react';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';

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

const CounterInput = ({ value, onIncrement, onDecrement }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }} className="">
      <button
        onClick={onDecrement}
        disabled={value <= 0}
        className=" border border-black rounded-full px-3 py-1 "
      >
        -
      </button>
      <Input
        type="number"
        value={value}
        readOnly // You can make this input editable if you want to allow manual entry
        className="text-center appearance-none w-16 border-none focus:border-none active:border-none"
      />

      <button
        onClick={onIncrement}
        className=" border border-black rounded-full px-3 py-1 "
      >
        +
      </button>
    </div>
  );
};

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
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
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('Submitting Step', currentStep);
    setFormData((prev) => ({ ...prev, ...values, time: time }));
    if (currentStep < 3) {
      console.log('Moving to Next Step');
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Final submission', { ...values, time: time });
    }
  };

  const handleBack = () => {
    console.log('Current Step before Back:', currentStep);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleTimeSelection = (selectedTime: string) => {
    setTime(selectedTime); // Set the selected time
    form.setValue('time', selectedTime); // Update the form state
  };

  return (
    <Modal
      title="Book your services"
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
                <p className="font-extralight">{formData?.address}</p>
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
                <p className="font-thin">{formData?.address}</p>
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
                        <Input placeholder="Your address" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
              {currentStep === 2 && (
                <div className="md:flex md:items-start md:gap-4">
                  <FormItem>
                    <FormLabel>Pick a date</FormLabel>
                    <FormControl>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(selectedDate) => {
                          setDate(selectedDate);
                          // Also update the form state if necessary
                          form.setValue('date', selectedDate);
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
                        ].map((timeSlot) => {
                          // Check if this timeSlot is the selected time and append ' PM'
                          const fullTimeSlot = `${timeSlot} PM`;
                          const isSelected = time === fullTimeSlot;

                          return (
                            <Button
                              key={timeSlot}
                              type="button"
                              className={`border rounded-md px-4 py-2 ${
                                isSelected ? 'bg-sky-950 text-white' : ''
                              }`} // Apply active styles conditionally
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
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between my-4">
                          <FormLabel className="flex items-center gap-1">
                            <DoorClosed strokeWidth={1} />
                            Rooms
                          </FormLabel>
                          <FormControl>
                            <CounterInput
                              value={field.value}
                              onIncrement={() =>
                                field.onChange(field.value + 1)
                              }
                              onDecrement={() =>
                                field.onChange(Math.max(1, field.value - 1))
                              }
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between my-4 ">
                          <FormLabel className="flex items-center gap-1">
                            <ShowerHead strokeWidth={1} />
                            Bathrooms
                          </FormLabel>
                          <FormControl>
                            <CounterInput
                              value={field.value}
                              onIncrement={() =>
                                field.onChange(field.value + 1)
                              }
                              onDecrement={() =>
                                field.onChange(Math.max(1, field.value - 1))
                              }
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                </>
              )}

              <div className="flex items-center justify-between">
                {currentStep > 1 && (
                  <Button type="button" onClick={handleBack} variant="outline">
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
