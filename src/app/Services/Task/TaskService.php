<?php

namespace App\Services;

use App\Interfaces\ITaskService;
use App\Http\Requests\TaskRequest;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
class TaskService implements ITaskService
{
    private Task $taskModel;

    public function __construct(Task $taskModel)
    {
        $this->taskModel = $taskModel;
    }
  
    public function getUserTasks(int $userId): Collection
    {
        try {
            return $this->taskModel->where('user_id', $userId)
                ->orderBy('created_at', 'desc')
                ->get();
        } catch (\Exception $e) {
            throw new \RuntimeException("Could not retrieve tasks. Please try again later.");
        }
    }

    public function createTask(int $userId, array $validatedData): Task
    {
        try {
            return $this->taskModel->create([
                'user_id' => $userId,
                ...$validatedData
            ]);
        } catch (\Exception $e) {
            throw new \RuntimeException("Failed to create task. Please check your input.");
        }
    }

    public function updateTask(int $userId, int $taskId, array $validatedData): Task
    {
        try {
            $task = $this->taskModel->where('user_id', $userId)
                ->findOrFail($taskId);
                
            $task->update($validatedData);
            return $task->fresh();
            
        } catch (ModelNotFoundException $e) {
            throw new \RuntimeException("Task not found.");
        } catch (\Exception $e) {
            throw new \RuntimeException("Failed to update task. Please try again.");
        }
    }

    public function deleteTask(int $userId, int $taskId): bool
    {
        try {
            $task = $this->taskModel->where('user_id', $userId)
                ->findOrFail($taskId);
                
            return $task->delete();
            
        } catch (ModelNotFoundException $e) {
            throw new \RuntimeException("Task not found.");
        } catch (\Exception $e) {
            throw new \RuntimeException("Failed to delete task. Please try again.");
        }
    }
}
