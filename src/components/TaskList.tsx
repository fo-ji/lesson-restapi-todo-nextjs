import { useQueryTasks } from '@/hooks/useQueryTasks';
import { List, ThemeIcon } from '@mantine/core';
import { IconCircleDashed } from '@tabler/icons';
import { TaskItem } from './TaskItem';

export const TaskList = () => {
  const { data: tasks } = useQueryTasks();

  return (
    <List
      my="lg"
      spacing="sm"
      size="sm"
      icon={
        <ThemeIcon color="cyan" size={24} radius="xl">
          <IconCircleDashed size={16} />
        </ThemeIcon>
      }
    >
      {tasks?.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
        />
      ))}
    </List>
  );
};
