import React from 'react';
import TaskTable from '@/Pages/Task/TaskTable'; 
import { Task } from '@/Pages/Task/Task';
import { Heading, Container , Button, ButtonGroup, Flex } from "@chakra-ui/react";
import AddTask from '@/Pages/Task/AddTask';
import {usePage} from "@inertiajs/react";
import { Toaster, toaster } from "@/Components/ui/toaster"
interface TaskPageProps {
  tasks: Task[];
  statuses: { [key: string]: string };
}


const TaskPage: React.FC<TaskPageProps> = ({ tasks, statuses }) => {
 
  const {errors} = usePage().props;
  return (
    <Container>
        <Flex justify="center" align="center" mt={6} >
            <Heading as="h1" fontSize="4xl">
                Task Management
            </Heading>
        </Flex>
        <Flex justifyContent="flex-end" mb={6}>
        <AddTask statuses={statuses} />
        </Flex>
      <TaskTable tasks={tasks} statuses={statuses}/>
      <Toaster />
  </Container>
  );
};

export default TaskPage;
