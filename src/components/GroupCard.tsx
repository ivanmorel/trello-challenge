import { useState } from "react";
import { Card, Button } from "react-daisyui";
import { updateGroup, deleteGroup } from "../services/groups";
import { createTask, deleteTask, updateTask } from "../services/tasks";
import EditableField from "./common/EditableField";
import TaskCard from "./TaskCard";
import { sortBy } from "lodash";
import { MdDelete } from "react-icons/md";
import CreateForm from "./common/CreateForm";

interface GroupCardProps {
  group: Group;
  fetchData: () => void;
  tasks: Task[];
}

const inputs = [
  { label: 'Title', field: 'name', type: 'input' },
  { label: 'Body', field: 'body', type: 'textarea' },
];

const GroupCard = ({ group, fetchData, tasks = [] }: GroupCardProps) => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { id, name, description } = group;

  const handleDeleteGroup = async () => {
    setLoadingDelete(true);
    const promises = tasks.reduce((acc: any, task) => {
      acc.push(deleteTask(task));
      return acc;
    }, [])
    await Promise.all(promises);
    await handleProcess(() => deleteGroup(id));
    setLoadingDelete(false);
  };

  const handleInputChange = async ({ field, value }: any) =>
    await handleProcess(() => updateGroup({ ...group, [field]: value }));

  const handleCreateTask = async ({ name, body }: any) =>
    await handleProcess(() => createTask({ name, body, groupDto: { id } }));

  const handleDeleteTask = async (task: Task) => await handleProcess(() => deleteTask(task));

  const handleUpdateTask = async (task: Task) =>await handleProcess(() => updateTask(task));

  const handleProcess = async (callback: any) => {
    await callback();
    await fetchData();
  };

  return (
    <div>
      <Card className="p-4 bg-slate-950 w-60 gap-2">
        <div className="flex items-center">
          <EditableField field="name" className="text-lg font-bold w-full" value={name} onChange={handleInputChange} />
          <Button loading={loadingDelete} size="sm" onClick={handleDeleteGroup}>
            {!loadingDelete && <MdDelete />}
          </Button>
        </div>
        <EditableField textarea field="description" className="text-base" value={description} onChange={handleInputChange} />
        {sortBy(tasks, 'name').map(task =>
          <TaskCard
            key={task.id}
            task={task}
            handleUpdateTask={handleUpdateTask}
            handleDeleteTask={handleDeleteTask} />)}
        <CreateForm buttonSize="sm" inputs={inputs} onCreate={handleCreateTask} addButtonLabel="Add New Task" addListButtonLabel="Add Task" />
      </Card>
    </div>
  );
}

export default GroupCard;
