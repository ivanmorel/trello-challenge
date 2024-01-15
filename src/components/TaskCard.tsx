import { useEffect, useState } from "react";
import { Button, Card } from "react-daisyui";
import EditableField from "./common/EditableField";
import { MdDelete } from "react-icons/md";

interface TaskCardProps {
  task: Task;
  handleUpdateTask: (p: any) => void;
  handleDeleteTask: (p: any) => void;
}

const TaskCard = ({ task: initialTask, handleUpdateTask, handleDeleteTask }: TaskCardProps) => {
  const [task, setTask] = useState(initialTask);
  const [loading, setLoading] = useState(false);
  const { name, body } = task;

  useEffect(() => {
    setTask(initialTask);
  }, [initialTask]);

  const handleInputChange = async ({ field, value }: any) =>
    await handleUpdateTask({ ...task, [field]: value });

  const handleDelete = async () => {
    setLoading(true);
    await handleDeleteTask(task);
    setLoading(false)
  };

  return (
    <Card className="p-2 bg-slate-900 gap-2">
      <div className="flex">
        <EditableField field="name" className="text-base font-bold w-full" value={name} onChange={handleInputChange} />
        <Button loading={loading} size="sm" onClick={handleDelete}>{!loading && <MdDelete />}</Button>
      </div>
      <EditableField textarea field="body" className="text-sm" value={body} onChange={handleInputChange} />
    </Card>
  );
}

export default TaskCard;
