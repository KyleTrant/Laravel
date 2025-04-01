<?php

namespace App\Repositories;

use App\Interfaces\TaskInterface;
use App\Models\Task;

class TaskRepository extends BaseRepository implements TaskInterface
{
    public function __construct(Task $task)
    {
        parent::__construct($task);
    }
    
    public function getUserTask(){
        return $this->model->where('user_id', auth()->id())->get();
    }
}
