import React from 'react';
import { Task } from '@/Pages/Task/Task';
import { Table } from "@chakra-ui/react"

type TaskTableProps = {
  tasks: Task[];
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks }) => {
  return (
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
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
};

export default TaskTable;
