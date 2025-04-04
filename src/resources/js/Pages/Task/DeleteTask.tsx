import { Button, CloseButton, Dialog, Portal, useDialog } from "@chakra-ui/react"
import { Task } from "@/Pages/Interface/Interface";
import { router} from '@inertiajs/react'
import { toaster } from "@/Components/ui/toaster"

interface EditTaskProps {
  task: Task;
  dialog: ReturnType<typeof useDialog>;
} 
const DeleteTask: React.FC<EditTaskProps> = ({task,dialog}) => {
  const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    const handleDelete = () => {
      router.delete(`/tasks/${task.id}`, {
        headers: {
          'X-CSRF-TOKEN': csrfToken, 
        },
        onSuccess: () => {
          toaster.create({
            title: `Delete task successfully`,
            type: "success",
          });
          dialog.setOpen(false);
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
      <Dialog.RootProvider value={dialog}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Delete Task</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <p>
                Are you want delete : {task.title}
                </p>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button onClick={handleDelete}>OK</Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>
    )
  }
export default DeleteTask;