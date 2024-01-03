import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';

interface AddressInputProps {
  form: UseFormReturn<any>; // Define the type of form here
}

const AddressInput: React.FC<AddressInputProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="apartmentNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Apartment Number</FormLabel>
            <FormControl>
              <Input placeholder="Your apartment number" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="street"
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
        name="city"
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
        name="postalCode"
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
  );
};

export default AddressInput;
