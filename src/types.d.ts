declare interface Group {
  id: string;
  name: string;
  description: string;
}

declare interface Task {
  id: string;
  name: string;
  body: string;
  groupDto: Group;
}