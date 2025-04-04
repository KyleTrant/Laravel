<?php

namespace App\Services\Task;

use Illuminate\Database\Eloquent\Collection;
use App\Models\Task;

interface ITaskService
{
    public function getUserTasks(int $userId): Collection;

    public function createTask(int $userId, array $validatedData): Task;

    public function updateTask(int $userId, int $taskId, array $validatedData): Task;

    public function deleteTask(int $userId, int $taskId): bool;
}