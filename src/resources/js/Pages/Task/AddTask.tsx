"use client";

import React, { useState } from "react";
import { Button, CloseButton, Dialog, Portal, useDialog, NativeSelect, Textarea, Field, Fieldset, Input } from "@chakra-ui/react";
import { Task } from '@/Pages/Interface/Interface';
import { router } from '@inertiajs/react'
import { toaster } from "@/Components/ui/toaster"

type AddTaskProps = {
  statuses: { [key: string]: string };
}
const AddTask: React.FC<AddTaskProps> = ({ statuses}) => {
  const dialog = useDialog();
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [task, setTask] = useState<Task>({
    id: Date.now(),
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    status:"pending",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
  const handleSave = async () => {

    try {
      const taskData = {
        title: task.title,
        description: task.description ?? "",
        start_date: task.start_date,
        end_date: task.end_date,
        start_time: task.start_time,
        end_time: task.end_time,
        status: task.status,
        _token: csrfToken,
      };
     
      router.post('/tasks/addtask', taskData, {
        onSuccess: () => {
          setFormErrors({});
          setTask({
            id: Date.now(),
            title: "",
            description: "",
            start_date: "",
            end_date: "",
            start_time: "",
            end_time: "",
            status: "pending",
          });
          toaster.create({
            title: `Add task successfully`,
            type: "success",
          });
        },
        onError: (error) => {
          setFormErrors(error);
          toaster.create({
            title: `Add task fail`,
            type: "error",
          });
        }
      });
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <Dialog.RootProvider value={dialog}>
      <Dialog.Trigger asChild>
      <Button variant="solid" size="sm" colorPalette="blue" onClick={()=> { setFormErrors({});}}>Add Task</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body>
            <form onSubmit={(e) => e.preventDefault()}>
              <Fieldset.Root size="lg">
                <Fieldset.Legend>Add Task</Fieldset.Legend>
                <Fieldset.Content>
                  <Field.Root required invalid={!!formErrors.title}>
                    <Field.Label>Task Title
                    <Field.RequiredIndicator />
                    </Field.Label>
                    <Input name="title" value={task.title} onChange={handleChange} placeholder="Enter task title" required />
                    {formErrors.title && <Field.ErrorText>{formErrors.title}</Field.ErrorText>}
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Description</Field.Label>
                    <Textarea name="description" value={task.description} onChange={handleChange} placeholder="Task description" />
                    {formErrors.Description && <Field.ErrorText>{formErrors.Description}</Field.ErrorText>}
                  </Field.Root >

                  <Field.Root required invalid={!!formErrors.start_date}>
                    <Field.Label>Start Date
                    <Field.RequiredIndicator />
                    </Field.Label>
                    <Input type="date" name="start_date" value={task.start_date} onChange={handleChange} required />
                    {formErrors.start_date && <Field.ErrorText>{formErrors.start_date}</Field.ErrorText>}
                  </Field.Root>
                  
                  <Field.Root required invalid={!!formErrors.end_date}>
                    <Field.Label>End Date
                    <Field.RequiredIndicator />
                    </Field.Label>
                    <Input type="date" name="end_date" value={task.end_date} onChange={handleChange} required />
                    {formErrors.end_date && <Field.ErrorText>{formErrors.end_date}</Field.ErrorText>}
                  </Field.Root>

                  <Field.Root required invalid={!!formErrors.start_time}>
                    <Field.Label>Start Time
                    <Field.RequiredIndicator />
                    </Field.Label>
                    <Input type="time" step="1" name="start_time" value={task.start_time} onChange={handleChange} required />
                    {formErrors.start_time && <Field.ErrorText>{formErrors.start_time}</Field.ErrorText>}
                  </Field.Root>

                  <Field.Root required invalid={!!formErrors.end_time}>
                    <Field.Label>End Time
                    <Field.RequiredIndicator />
                    </Field.Label>
                    <Input type="time" step="1" name="end_time" value={task.end_time} onChange={handleChange} required />
                    {formErrors.end_time && <Field.ErrorText>{formErrors.end_time}</Field.ErrorText>}
                  </Field.Root>
                    <Field.Root required>
                      <Field.Label>Status
                      <Field.RequiredIndicator />
                      </Field.Label>
                      <NativeSelect.Root>
                        <NativeSelect.Field name="status" value={task.status} onChange={handleChange}>
                        {Object.entries(statuses).map(([key, value]) => (
                          <option key={key} value={key}>
                            {value}
                          </option>
                        ))}
                        </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>
                </Fieldset.Content>
              </Fieldset.Root>
              </form>
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
