import React from 'react';
import TaskTable from '@/Pages/Task/TaskTable'; 
import { Task } from '@/Pages/Interface/Interface';
import { Heading, Container, Flex } from "@chakra-ui/react";
import AddTask from '@/Pages/Task/AddTask';
import { Toaster } from "@/Components/ui/toaster"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps,User } from '@/types';


interface TaskPageProps {
  tasks: Task[];
  statuses: { [key: string]: string };
  auth: { user: User }; 
}
const TaskPage: React.FC<TaskPageProps> = ({ tasks, statuses ,auth}) => {
  return (

    <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
            >
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
 </AuthenticatedLayout>

    
  );
};

export default TaskPage;
