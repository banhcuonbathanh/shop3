import React from "react";
import { Control, Controller } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from "@/components/ui/form"; // adjust the import as per your project structure
import { Input } from "@/components/ui/input";
interface CustomInputFieldProps {
  field: {
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  };
  placeholder: string;
  label: string;
  description: string;
  className?: string;
  
  customOnChange?: () => void; // Add this line
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  field,
  placeholder,
  label,
  description,
  className,
  customOnChange, // Access the onChange prop here
   // And this line
}) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
      <Input
  className={`w-full ${className}`}
  placeholder={placeholder}
  value={field.value || ""}
  onChange={(e) => {
    field.onChange(e); // Call the field's onChange first
    customOnChange?.(); // Call the custom onChange (if provided)
  }}
  onBlur={field.onBlur}
/>

      </FormControl>
      <FormMessage className="error-message text-red-500" />
    </FormItem>
  );
};

export default CustomInputField;
