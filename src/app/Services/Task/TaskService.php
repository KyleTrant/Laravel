<?php

namespace App\Services\Task;

use App\Models\Task;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TaskService implements ITaskService
{
    private Task $taskModel;

    public function __construct(Task $taskModel)
    {
        $this->taskModel = $taskModel;
    }
  
    public function getUserTasks(int $userId, array $filters) : LengthAwarePaginator
    {
        try {
        $query = $this->taskModel->where('user_id', $userId);

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['start_date'])) {
            $query->where('start_date', '>=', $filters['start_date']);
        }

        if (!empty($filters['end_date'])) {
            $query->where('end_date', '<=', $filters['end_date']);
        }

        if (!empty($filters['title']) || $filters['title'] === "0") {
            $query->where('title', 'like', '%' . $filters['title'] . '%');
        }
        
        if (!empty($filters['description'])) {
            $query->where('description', 'like', '%' . $filters['description'] . '%');
        }
        if (!empty($filters['start_time'])) {
            $query->where('start_time', '>=', $filters['start_time']);
        }

        if (!empty($filters['end_time'])) {
            $query->where('end_time', '<=', $filters['end_time']);
        }
    
        return $query->orderBy('created_at', 'desc')->paginate(2);
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
    public function filterTask (int $userId,array $filter): Task
    {
        try {
            $query = $this->taskModel->where('user_id', $userId);
        
            if (isset($filter['status'])) {
                $query->where('status', $filter['status']);
            }
            if (isset($filter['start_date'])) {
                $query->whereDate('start_date', '>=', $filter['start_date']);
            }
            
            if (isset($filter['end_date'])) {
                $query->whereDate('end_date', '<=', $filter['end_date']);
            }
            
            if (isset($filter['title'])) {
                $query->where('title', 'like', '%' . $filter['title'] . '%');
            }
            
            if (isset($filter['description'])) {
                $query->where('description', 'like', '%' . $filter['description'] . '%');
            }
            return $query->get();
        } catch (\Exception $e) {
            throw new \RuntimeException("Could not retrieve tasks. Please try again later.");
        }
    }
}
