import {
    Button,
    CloseButton,
    Dialog,
    Portal,
  } from "@chakra-ui/react"
import { Task } from "@/Pages/Task/Task";
import { router, usePage } from '@inertiajs/react'
import { toaster } from "@/Components/ui/toaster"
  interface EditTaskProps {
    task: Task;
  } 
  const DeleteTask: React.FC<EditTaskProps> = ({task}) => {
    const size = "md";
     const handleSave = () => {
        router.delete(`/tasks/${task.id}`, {
          onSuccess: () => {
            toaster.create({
              title: `Delete task successfully`,
              type: "success",
            });
          },
          onError: (error) => {
            toaster.create({
              title: `Delete task fail`,
              type: "error",
            });
          }
        });
      };
    return (
            <Dialog.Root key={size} size={size}>
              <Dialog.Trigger asChild>
                <Button variant="outline" size={size}>
                  Delete Task
                </Button>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Header>
                      <Dialog.Title>Dialog Title</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                      <p>
                      Are you sure you want to delete?
                      </p>
                    </Dialog.Body>
                    <Dialog.Footer>
                      <Dialog.ActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                      </Dialog.ActionTrigger>
                      <Button onClick={handleSave}>Yes</Button>
                    </Dialog.Footer>
                    <Dialog.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
    )
  }
  export default DeleteTask;