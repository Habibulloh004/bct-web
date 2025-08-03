import { Input } from "../ui/input";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { PasswordInput } from "../ui/password-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export const FormFieldType = {
  INPUT: "input",
  PASSWORDINPUT: "passwordInput",
  TEXTAREA: "textarea",
  PHONE_INPUT: "phoneInput",
  CHECKBOX: "checkbox",
  DATE_PICKER: "datePicker",
  SELECT: "select",
  SKELETON: "skeleton",
  CURRENCY: "currency",
  EMAIL: "email", // ✅ Yangi qo‘shildi
  NUMBER: "number",
};

const RenderInput = ({ field, className, props, rules }) => {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <FormControl>
          <Input
            placeholder={props.placeholder}
            {...field}
            value={field.value || ""}
            className={cn(
              "textBig focus:border-white/50 ",
              props.className,
              className
            )}
          />
        </FormControl>
      );
    case FormFieldType.NUMBER:
      return (
        <FormControl>
          <Input
            type="number"
            placeholder={props.placeholder}
            {...field}
            value={field.value || ""}
            className={cn(
              "textBig focus:border-white/50",
              props.className,
              className
            )}
          />
        </FormControl>
      );
    case FormFieldType.PASSWORDINPUT:
      return (
        <FormControl>
          <PasswordInput
            placeholder={props.placeholder}
            {...field}
            value={field.value || ""}
            className={cn(
              "textBig focus:border-white/50",
              props.className,
              className
            )}
            onChange={(e) => {
              const value = e.target.value;
              field.onChange(value);
            }}
          />
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            value={field.value || ""}
            className={cn(
              "shad-textArea focus:border-white/50",
              props.className,
              className
            )}
            disabled={props.disabled}
          />
        </FormControl>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select
            value={field.value || ""}
            onValueChange={field.onChange}
          >
            <FormControl>
              <SelectTrigger
                className={cn(
                  "shad-select-trigger border-b-2 border-border",
                  props.className,
                  className
                )}
              >
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className={cn("shad-select-content z-[99999]")}>
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="UZ"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value || ""}
            onChange={field.onChange}
            className={cn("input-phone rounded-md", props.className, className)}
            style={{ borderColor: "transparent" }}
            countryCallingCodeEditable={false}
            focusInputOnCountrySelection
          />
        </FormControl>
      );
    case FormFieldType.EMAIL:
      return (
        <FormControl>
          <Input
            type="email"
            placeholder={props.placeholder}
            {...field}
            value={field.value || ""}
            className={cn(
              "textBig focus:border-white/50",
              props.className,
              className
            )}
          />
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
  }
};

const CustomFormField = (props) => {
  const { control, name, label, inputClass, optional, labelClass } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1 flex flex-col">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className={cn("text-[#ABAFB1] text-sm", labelClass)}>
              {label}{" "}
              {optional && (
                <span className="text-[12px] text-white/50">{optional}</span>
              )}
            </FormLabel>
          )}
          <RenderInput
            className={cn(
              "text-[#ABAFB1] text-xs lg:text-base bg-transparent",
              inputClass
            )}
            field={field}
            props={props}
          />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
