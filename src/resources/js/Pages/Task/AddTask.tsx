"use client";

import React, { useState } from "react";
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  useDialog,
  NativeSelect,
  Textarea,
  Field,
  Fieldset,
  Input,
} from "@chakra-ui/react";
import { Task } from "@/Pages/Task/Task";
import { Inertia } from '@inertiajs/inertia';

// type AddTaskProps = {
//   onAddTask: (newTask: Task) => void;
// };

const AddTask: React.FC = (errors) => {
  const dialog = useDialog();

  const [task, setTask] = useState<Task>({
    id: Date.now(),
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    status: "Pending",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const taskData = {
        title: task.title,
        description: task.description || "",
        start_date: task.start_date,
        end_date: task.end_date,
        start_time: task.start_time,
        end_time: task.end_time,
        status: task.status,
      };
     
      Inertia.post('/tasks/addtask', taskData, {
        onSuccess: () => {
          alert("Task added successfully!");
          
          setTask({
            id: Date.now(),
            title: "",
            description: "",
            start_date: "",
            end_date: "",
            start_time: "",
            end_time: "",
            status: "Pending",
          });
        },
        onError: (error) => {
          alert("Failed to add task: " + error);
        },
      });
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Something went wrong!");
    }

  };

  return (
    <Dialog.RootProvider value={dialog}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">Add Task</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body>
              <Fieldset.Root size="lg">
                <Fieldset.Legend>Add Task</Fieldset.Legend>
                <Fieldset.Content>
                  <Field.Root invalid>
                    <Field.Label>Task Title</Field.Label>
                    <Input name="title" value={task.title} onChange={handleChange} placeholder="Enter task title" required />
                    <Fieldset.ErrorText>
                      
                    </Fieldset.ErrorText>
                  </Field.Root>

                  <Field.Root invalid>
                    <Field.Label>Description</Field.Label>
                    <Textarea name="description" value={task.description} onChange={handleChange} placeholder="Task description" />
                    <Fieldset.ErrorText>
                    
                    </Fieldset.ErrorText>
                  </Field.Root >

                  <Field.Root invalid>
                    <Field.Label>Start Date</Field.Label>
                    <Input type="date" name="start_date" value={task.start_date} onChange={handleChange} required />
                    <Fieldset.ErrorText>
                     
                    </Fieldset.ErrorText>
                  </Field.Root>

                  <Field.Root invalid>
                    <Field.Label>End Date</Field.Label>
                    <Input type="date" name="end_date" value={task.end_date} onChange={handleChange} required />
                    <Fieldset.ErrorText>
                     
                    </Fieldset.ErrorText>
                  </Field.Root>

                  <Field.Root invalid>
                    <Field.Label>Start Time</Field.Label>
                    <Input type="time" name="start_time" value={task.start_time} onChange={handleChange} required />
                    {/* {errors.start_time &&
                    <Fieldset.ErrorText> </Fieldset.ErrorText>} */}
                  </Field.Root>

                  <Field.Root invalid>
                    <Field.Label>End Time</Field.Label>
                    <Input type="time" name="end_time" value={task.end_time} onChange={handleChange} required />
                    <Fieldset.ErrorText>
                   
                    </Fieldset.ErrorText>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Status</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field name="status" value={task.status} onChange={handleChange}>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>
                </Fieldset.Content>
              </Fieldset.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleSave}>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  );
};

export default AddTask;
