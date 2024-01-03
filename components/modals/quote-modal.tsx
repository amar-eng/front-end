'use client';

import { useStoreModal } from '@/hooks/use-store-modal';
import { Modal } from '../modal';
import { useState } from 'react';
// import { addDays } from 'date-fns';
import { useController, useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '../ui/form';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { FormInfoData } from '@/types';
import {
  AlarmPlus,
  Building,
  Construction,
  DoorClosed,
  Home,
  HomeIcon,
  Hotel,
  Landmark,
  ShowerHead,
} from 'lucide-react';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

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

const formSchema = z.object({
  type: z.enum(['home', 'business', 'post', 'airbnb'], {
    required_error: 'You need to select what kind of service you need',
  }),
  insideFridge: z.boolean(),
  insideOven: z.boolean(),
  insideCabinet: z.boolean(),
  insideMicrowave: z.boolean(),
  laundry: z.boolean(),
  deepCleaning: z.boolean(),
  carpetCleaning: z.boolean(),
  movingOut: z.boolean(),
  interiorWindows: z.boolean(),
  rooms: z.number().min(1),
  bathrooms: z.number().min(1),
  officeSquareFootage: z.string(),
  washroomStalls: z.number().min(1),
  businessType: z.enum(['restaurant', 'office', 'retail']),
  footTraffic: z.number().min(1).max(100).optional(),
  floorType: z.enum(['carpeted', 'hardwood', 'tile']),
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

  const onIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    field.onChange(field.value + 1);
  };

  const onDecrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    field.onChange(Math.max(1, field.value - 1));
  };

  return (
    <div className="flex items-center gap-4">
      <button
        type="button" // Set the button type to "button"
        onClick={onDecrement}
        disabled={field.value <= 1}
        className="border bg-primaryBlue border-primaryBlue text-white cursor-pointer rounded-full px-3 py-1 text-md "
      >
        -
      </button>
      <div className="text-sm">{field.value}</div>
      <button
        type="button" // Set the button type to "button"
        onClick={onIncrement}
        className="border bg-primaryBlue border-primaryBlue text-white cursor-pointer rounded-full px-3 py-1 text-md"
      >
        +
      </button>
    </div>
  );
};

const QuoteModal = () => {
  const storeModal = useStoreModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormInfoData>({} as FormInfoData);

  const titleBasedOnStage = [
    'Type of Service',
    'Type of Service',
    'What address do you want us to come to',
    'What day and time works best for you',
  ];
  const descBasedOnStage = [
    'What kind of location do you want us to serve?',
    'What Service can we help with',
    'Bookings start from tomorrow',
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'home',
      rooms: 1,
      bathrooms: 1,
      insideFridge: false,
      insideOven: false,
      insideCabinet: false,
      insideMicrowave: false,
      laundry: false,
      deepCleaning: false,
      carpetCleaning: false,
      movingOut: false,
      interiorWindows: false,
      officeSquareFootage: '',
      washroomStalls: 1,
      businessType: 'office',
      footTraffic: 50,
      floorType: 'carpeted',
    },
  });

  const businessTypeField = useController({
    name: 'businessType',
    control: form.control,
    defaultValue: 'office',
  });

  const floorTypeField = useController({
    name: 'floorType',
    control: form.control,
    defaultValue: 'carpeted',
  });

  const footTrafficField = useController({
    name: 'footTraffic',
    control: form.control,
    defaultValue: 50,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('Submitting Step', currentStep);
    console.log('Form Values', values);

    setFormData((prev) => ({
      ...prev,
      ...values,
    }));

    if (currentStep < 4) {
      console.log('Moving to Next Step');
      setCurrentStep(currentStep + 1);
    } else {
      console.log('Final submission', values);
    }
  };

  const handleBack = () => {
    console.log('Current Step before Back:', currentStep);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep2 = () => {
    if (formData.type === 'home') {
      return (
        <>
          <FormField
            control={form.control}
            name="rooms"
            render={() => (
              <FormItem className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <DoorClosed strokeWidth={1} width={20} height={20} />
                  <FormLabel className="text-md font-normal">Rooms</FormLabel>
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
                  <CounterInput name="bathrooms" control={form.control} />
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
      );
    } else if (formData.type === 'business') {
      return (
        <>
          <FormField
            control={form.control}
            name="officeSquareFootage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Approximate Square Footage</FormLabel>
                <FormControl>
                  <Input placeholder="Square footage" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="washroomStalls"
            render={() => (
              <FormItem className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <FormLabel className="text-sm font-normal">
                    Washroom Stalls
                  </FormLabel>
                </div>

                <FormControl>
                  <CounterInput name="rooms" control={form.control} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="lg:flex f lg:flex-row items-center justify-between mt-4">
            <FormItem className=" lg:w-[200px]">
              <FormLabel>Type of Business</FormLabel>
              <Select
                onValueChange={businessTypeField.field.onChange}
                defaultValue={businessTypeField.field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type of business" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>

            <FormItem className=" lg:w-[200px]">
              <FormLabel>Floor Type</FormLabel>
              <Select
                onValueChange={floorTypeField.field.onChange}
                defaultValue={floorTypeField.field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select the type of flooring" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="carpeted">Carpeted</SelectItem>
                  <SelectItem value="hardwood">Hardwood</SelectItem>
                  <SelectItem value="tile">Tile</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          </div>

          <FormItem>
            <FormLabel>Foot Traffic</FormLabel>
            <FormControl>
              <Slider
                min={0}
                max={100}
                step={1}
                defaultValue={[footTrafficField.field.value || 0]}
                onValueChange={(value) =>
                  footTrafficField.field.onChange(value[0])
                }
                color="#06b6d4"
              />
            </FormControl>
            <FormDescription>
              Estimate the average number of people visiting your business per
              day.
            </FormDescription>
          </FormItem>
        </>
      );
    } else if (formData.type === 'airbnb') {
      return (
        <>
          <p>This is a Airbnb</p>
        </>
      );
    } else if (formData.type === 'post') {
      return (
        <>
          <p> this is a post construction</p>
        </>
      );
    }
  };

  return (
    <Modal
      title={titleBasedOnStage[currentStep - 1]}
      description={descBasedOnStage[currentStep - 1] || ''}
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-4 pb-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {currentStep === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
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
                              <FormLabel className="font-thin flex items-end gap-1">
                                <HomeIcon
                                  width={15}
                                  height={15}
                                  strokeWidth={1}
                                />
                                Home
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="business" />
                              </FormControl>
                              <FormLabel className="font-thin flex items-end gap-1">
                                <Landmark
                                  width={15}
                                  height={15}
                                  strokeWidth={1}
                                />
                                Business
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="airbnb" />
                              </FormControl>
                              <FormLabel className="font-thin flex items-end gap-1">
                                <Hotel width={15} height={15} strokeWidth={1} />
                                Airbnb
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="post" />
                              </FormControl>
                              <FormLabel className="font-thin flex items-end gap-1">
                                <Construction
                                  width={15}
                                  height={15}
                                  strokeWidth={1}
                                />
                                Post Construction
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
              )}
              {currentStep === 2 && renderStep2()}

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
                    // disabled={currentStep === 2 && !time}
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

export default QuoteModal;
