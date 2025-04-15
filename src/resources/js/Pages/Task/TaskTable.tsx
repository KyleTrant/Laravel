  import React ,  { useState }from 'react';
  import { Task } from '@/Pages/Interface/Task';
  import { Button, Table, Input , Select , Text} from "@chakra-ui/react"
  import EditTask from "@/Pages/Task/EditTask"
  import DeleteTask from './DeleteTask';
  import { Pagination } from '@/Pages/Interface/Interface';
  import { Box, HStack} from '@chakra-ui/react';
  import { router } from '@inertiajs/react'; 
  import { Portal, createListCollection } from "@chakra-ui/react"
  type TaskTableProps = {
    pagination: Pagination<Task>; 
    statuses: { [key: string]: string };
  }
  import {
    useDialog,
  } from "@chakra-ui/react";
  import { SimpleGrid } from "@chakra-ui/react"
  const TaskTable: React.FC<TaskTableProps> = ({ pagination,statuses}) => {
    const editDialog = useDialog();
    const deleteDialog = useDialog();
    const [currentTask, setCurrentTask] = useState<Task | null>(null);

    const openEditDialog = (item: Task) => {
    setCurrentTask(item);
    console.log("Open Edit Dialog for Task:", item);
    editDialog.setOpen(true);
    
  };
    
  const openDeleteDialog = (item: Task) => {
    setCurrentTask(item);
    deleteDialog.setOpen(true);
  };


    return (
      <>
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
            <Table.ColumnHeader>Start Date</Table.ColumnHeader>
            <Table.ColumnHeader>End Date</Table.ColumnHeader>
            <Table.ColumnHeader>Start Time</Table.ColumnHeader>
            <Table.ColumnHeader>End Time</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {pagination.data.map((item) => (
            <Table.Row  key={item.id}>
                <Table.Cell display="none" >{item.id}</Table.Cell>
                  <Table.Cell >{item.title}</Table.Cell>
                  <Table.Cell >{item.description}</Table.Cell>
                  <Table.Cell>{item.start_date}</Table.Cell>
                  <Table.Cell>{item.end_date}</Table.Cell>
                  <Table.Cell>{item.start_time}</Table.Cell>
                  <Table.Cell>{item.end_time}</Table.Cell>
                  <Table.Cell>{item.status}</Table.Cell> 
                  <Table.Cell>
                    <HStack justify="center">
                      <Button colorPalette="yellow"  mr={2} onClick={() => openEditDialog(item)}>Edit Task</Button>
                      <Button  colorPalette="red"  onClick={() => openDeleteDialog(item)}>Delete Task</Button>
                    </HStack>
                  </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Box mt={6}>
  <HStack justify="center">
    {pagination.links.map((link, index) => {
      return (
        <Button
          key={index}
          disabled={link.url === null}
          onClick={() => link.url && router.get(link.url)}
          variant={link.active ? 'solid' : 'outline'}
          colorScheme={link.active ? 'blue' : 'gray'}
          size="sm"
          dangerouslySetInnerHTML={{ __html: link.label }} 
        />
      );
    })}
  </HStack>
</Box>
      {currentTask && (
        <>
          <DeleteTask task={currentTask} dialog={deleteDialog} />
          <EditTask task={currentTask} statuses={statuses} dialog={editDialog} />
        </>
      )}
      </>

    )
  };

  export default TaskTable;
