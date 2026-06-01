export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  completed: boolean;
  dueDate: Date;
  estimatedCost: number;
}
