export interface Todo {
  // createdAtAt: string;
  // deadline: string;
  _id: string;
  title: string;
  description: string;
  priority: string;
  deadline: string;
  createdAt: string;
}

export interface Column {
  title: string;
  items: Todo[];
}
