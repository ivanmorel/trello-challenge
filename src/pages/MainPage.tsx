import { useState, useEffect } from "react";
import { getGroups, createGroup } from "../services/groups";
import { getTasks } from "../services/tasks";
import GroupCard from "../components/GroupCard";
import { sortBy } from "lodash";
import CreateForm from "../components/common/CreateForm";
import { Navbar } from "react-daisyui";

const inputs = [
  { label: 'Name', field: 'name', type: 'input' },
  { label: 'Description', field: 'description', type: 'textarea' },
];

const MainPage = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [tasks, setTasks] = useState<any>({});

  const fetchData = async () => {
    const groupResponse = await getGroups();
    const taskResponse = await getTasks();
    setGroups(groupResponse?.data);

    const hashedTasks = taskResponse?.data.reduce((acc: any, task: Task) => {
      const { groupDto: { id: groupId } } = task;
      if (!acc[groupId]) acc[groupId] = [];
      acc[groupId].push(task);
      return acc;
    }, {})

    setTasks(hashedTasks);
  };

  useEffect(() => {
    fetchData();
  }, [])

  const handleCreateGroup = async (form: any) => {
    await createGroup(form);
    await fetchData();
  };

  return (
    <>
      <Navbar className="bg-pink-950 shadow-xl rounded-box">
        <h1 className="ml-4 font-bold text-lg">Trello Challenge</h1>
      </Navbar>
      <div className="p-4">
        <div className="flex gap-2 flex-wrap">
          {sortBy(groups, 'name').map(group => <GroupCard tasks={tasks[group.id]} key={group.id} group={group} fetchData={fetchData} />)}
          <CreateForm className="w-60" inputs={inputs} onCreate={handleCreateGroup} addButtonLabel="Add New Group" addListButtonLabel="Add Group" />
        </div>
      </div>
    </>
  );
}

export default MainPage;
