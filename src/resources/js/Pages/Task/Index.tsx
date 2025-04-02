import React from 'react';
import TaskTable from '@/Pages/Task/TaskTable'; 
import { Task } from '@/Pages/Task/Task';
import { Heading, Container , Button, ButtonGroup, Flex } from "@chakra-ui/react"
import AddTask from '@/Pages/Task/AddTask';
import {usePage} from "@inertiajs/react"
interface TaskPageProps {
  tasks: Task[];
}

const TaskPage: React.FC<TaskPageProps> = ({ tasks}) => {
    const {errors} = usePage().props
  return (
    <Container>
        <Flex justify="center" align="center" mt={6} >
            <Heading as="h1" fontSize="4xl">
                Task Management
            </Heading>
        </Flex>
        <Flex justifyContent="flex-end" mb={6}>
            <AddTask />
            <Button 
                border="5px" 
                variant="subtle" 
                bg="blue.500"      
                color="white"      
                mr={2}        
                rounded="md"
            >
            <a href="https://chakra-ui.com">Chakra UI</a>
            </Button>
        </Flex>
      <TaskTable tasks={tasks} />
  </Container>
      
   
  );
};

export default TaskPage;
