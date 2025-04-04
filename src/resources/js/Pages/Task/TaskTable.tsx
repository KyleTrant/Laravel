  import React ,  { useState }from 'react';
  import { Task } from '@/Pages/Interface/Task';
  import { Button, Table } from "@chakra-ui/react"
  import EditTask from "@/Pages/Task/EditTask"
  import DeleteTask from './DeleteTask';
  type TaskTableProps = {
    tasks: Task[];
    statuses: { [key: string]: string };
  }
  import {
    useDialog,
  } from "@chakra-ui/react";
  const TaskTable: React.FC<TaskTableProps> = ({ tasks,statuses}) => {

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
          {tasks.map((item) => (
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
                  <Button colorPalette="yellow"  mr={2} onClick={() => openEditDialog(item)}>Edit Task</Button>
                  <Button  colorPalette="red"  onClick={() => openDeleteDialog(item)}>Delete Task</Button>
                  </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

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
