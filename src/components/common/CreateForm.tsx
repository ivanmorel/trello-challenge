import { useState } from "react";
import { Button, Card, Input, Textarea } from "react-daisyui";
import { FaPlus } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

interface CreateFormProps {
  onCreate: (p: any) => void;
  addButtonLabel: string,
  addListButtonLabel: string,
  inputs: any,
  buttonSize?: any,
  className?: string,
}

const componentData: any = {
  input: {
    component: Input,
    size: 'sm',
  },
  textarea: {
    component: Textarea,
    className: "p-2 leading-5 h-24",
  },
};

const CreateForm = ({ className, buttonSize, addButtonLabel, addListButtonLabel, inputs, onCreate }: CreateFormProps) => {
  const emptyForm = inputs.reduce((acc: any, input: any) => {
    acc[input.field] = '';
    return acc;
  }, {})

  const [isActive, setIsActive] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  const handleInputChange = ({ target: { id, value } }: any) =>
    setForm((prevState: any) => ({ ...prevState, [id]: value }));

  const handleCreate = async () => {
    const { name } = form;
    if (name) {
      setLoading(true);
      await onCreate(form);
      setIsActive(false);
      setForm(emptyForm);
      setLoading(false);
    }
  }
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) handleCreate();
  }

  const handleCancel = () => {
    setIsActive(false);
    setForm(emptyForm);
  };

  const AddNewGroupButton = (
    <Button
      className="w-full p-2"
      size={buttonSize}
      startIcon={<FaPlus />}
      onClick={() => setIsActive(true)}>
      {addButtonLabel}
    </Button>
  );

  const CreateNewGroupForm = (
    <Card className="bg-black p-2 gap-2">
      {inputs.map(({ label, field, type }: any) => {
        const { component: Component, size, className } = componentData[type];
        return <Component
          id={field}
          placeholder={label}
          size={size}
          className={className}
          value={form[field]}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      })}
      <div className="flex gap-2">
        <Button loading={loading} className="min-w-20" color="primary" size="sm" onClick={handleCreate}>
          {!loading && addListButtonLabel}
        </Button>
        <Button disabled={loading} size="sm" onClick={handleCancel}><GrClose className="w-3 h-3" /></Button>
      </div>
    </Card>
  );

  return (
    <div className={className}>
      {isActive ? CreateNewGroupForm : AddNewGroupButton}
    </div>
  );
}

export default CreateForm;
