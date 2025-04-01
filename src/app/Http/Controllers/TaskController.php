<?php

namespace App\Http\Controllers;
use App\Interfaces\TaskInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    protected $taskRepository;

    public function __construct(TaskInterface $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }

    public function index(): Response
    {
        $tasks = $this->taskRepository->getUserTask(); 

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks
        ]);
    }
}
