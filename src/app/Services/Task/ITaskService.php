<?php

namespace App\Services\Task;

use Illuminate\Pagination\LengthAwarePaginator;
use App\Models\Task;

interface ITaskService
{
    public function getUserTasks(int $userId, array $filters): LengthAwarePaginator;
    public function createTask(int $userId, array $validatedData): Task;

    public function updateTask(int $userId, int $taskId, array $validatedData): Task;

    public function deleteTask(int $userId, int $taskId): bool;

    public function filterTask (int $userId ,array $filter): Task;
}