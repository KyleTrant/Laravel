"use client";

import React, { useState ,useEffect} from "react";
import { Button, CloseButton, Dialog, Portal, useDialog, NativeSelect, Textarea, Field, Fieldset, Input } from "@chakra-ui/react";
import { Task } from "@/Pages/Interface/Interface";
import { router } from '@inertiajs/react'
import { toaster } from "@/Components/ui/toaster"

interface EditTaskProps {
  task: Task;
  statuses: { [key: string]: string };
  dialog: ReturnType<typeof useDialog>;
} 
  const EditTask: React.FC<EditTaskProps> = ({task, statuses,dialog}) => {

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [updatedTask, setUpdatedTask] = useState<Task>(task);
  useEffect(() => {
    setUpdatedTask(task);
  }, [task]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
  };
  const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
  const handleSave = () => {
    const taskData = {
        title: updatedTask.title,
        description: updatedTask.description || "",
        start_date: updatedTask.start_date,
        end_date: updatedTask.end_date,
        start_time: updatedTask.start_time,
        end_time: updatedTask.end_time,
        status: updatedTask.status,
        _token: csrfToken
      };
    router.put(`/tasks/${task.id}`, taskData, {
      onSuccess: () => {
        toaster.create({
          title: `update task successfully`,
          type: "success",
        });
        dialog.setOpen(false);
        setFormErrors({});
      },
      onError: (error) => {
        setFormErrors(error);
        toaster.create({
          title: `update task fail`,
          type: "error",
        });
      }
    });
  };

  return (
    <Dialog.RootProvider  value={dialog}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner >
          <Dialog.Content >
            <Dialog.Body >
            <form onSubmit={(e) => e.preventDefault()}>
              <Fieldset.Root size="lg">
                <Fieldset.Legend>Edit Task</Fieldset.Legend>
                <Fieldset.Content>
                  <Field.Root required invalid={!!formErrors.title}>
                    <Field.Label>Task Title
                    <Field.RequiredIndicator />
                    </Field.Label>
                    <Input name="title" value={updatedTask.title} onChange={handleChange} placeholder="Enter task title" required />
                    {formErrors.title && <Field.ErrorText>{formErrors.title}</Field.ErrorText>}
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Description</Field.Label>
                    <Textarea name="description" value={updatedTask.description || ""} onChange={handleChange} placeholder="Task description" />
                    {formErrors.Description && <Field.ErrorText>{formErrors.Description}</Field.ErrorText>}
                  </Field.Root >

                  <Field.Root required invalid={!!formErrors.start_date}>
                    <Field.Label>Start Date
                    <Field.RequiredIndicator />
                    </Field.Label>
                    <Input type="date" name="start_date" value={updatedTask.start_date} onChange={handleChange} required />
                    {formErrors.start_date && <Field.ErrorText>{formErrors.start_date}</Field.ErrorText>}
                  </Field.Root>
                  
                  <Field.Root required invalid={!!formErrors.end_date}>
                    <Field.Label>End Date
                    <Field.RequiredIndicator />
                    </Field.Label>
                    <Input type="date" name="end_date" value={updatedTask.end_date} onChange={handleChange} required />
                    {formErrors.end_date && <Field.ErrorText>{formErrors.end_date}</Field.ErrorText>}
                  </Field.Root>

                  <Field.Root required invalid={!!formErrors.start_time}>
                    <Field.Label>Start Time
                    <Field.RequiredIndicator />
                    </Field.Label>
                    <Input type="time" step="1" name="start_time" value={updatedTask.start_time} onChange={handleChange} required />
                    {formErrors.start_time && <Field.ErrorText>{formErrors.start_time}</Field.ErrorText>}
                  </Field.Root>

                  <Field.Root required invalid={!!formErrors.end_time}>
                    <Field.Label>End Time
                    <Field.RequiredIndicator />
                    </Field.Label>
                    <Input type="time" step="1" name="end_time" value={updatedTask.end_time} onChange={handleChange} required />
                    {formErrors.end_time && <Field.ErrorText>{formErrors.end_time}</Field.ErrorText>}
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>Status
                    <Field.RequiredIndicator />
                    </Field.Label>
                    <NativeSelect.Root>
                    <NativeSelect.Field name="status" value={updatedTask.status} onChange={handleChange}>
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
                <Button variant="outline" onClick={()=> { setFormErrors({}); setUpdatedTask(task);}}>Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleSave}>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger  asChild>
              <CloseButton  size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.RootProvider>
  );
};

export default EditTask;
