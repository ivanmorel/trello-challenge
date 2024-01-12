import { useState, useEffect } from "react";
import { Input, Textarea } from "react-daisyui";

interface EditableFieldProps {
  value: string;
  className?: string;
  field: string;
  onChange: (p: any) => void;
  placeholder?: string;
  textarea?: boolean;
}

const inActiveClassName = 'bg-transparent border-0 cursor-pointer';

const EditableField = ({ field, value: initialValue, className, onChange, placeholder, textarea }: EditableFieldProps) => {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue])
  
  const valueChanged = value !== initialValue;

  const baseClassName = `p-0 ${className}`

  const handleClick = () =>  setIsActive(true);
  const handleBlur = () => {
    if((field !== 'name' || value) && valueChanged) onChange({ field, value });
    if(field === 'name' && !value) setValue(initialValue);
    setIsActive(false);
  };

  const handleChange = (e: any) => setValue(e.target.value);
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      e.target.blur();
      setIsActive(false);
    }
  }

  const Component = textarea ? Textarea : Input;

  if(!isActive && textarea) return <div className={`cursor-pointer ${baseClassName} min-h-4`} onClick={handleClick}>{value}</div>

  return (
    <Component 
      size='sm'
      onBlur={handleBlur}
      className={isActive ? `${baseClassName} ${textarea ? 'h-24' : ''}` : `${baseClassName} ${inActiveClassName}`} 
      onClick={handleClick}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={value}
      placeholder={placeholder}
      autoFocus={textarea}
    />
  )
}

export default EditableField;