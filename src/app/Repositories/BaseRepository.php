<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use App\Interfaces\BaseInterface;

abstract class BaseRepository implements BaseInterface
{
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }
    
    public function find($id)
    {
        return $this->model->findOrFail($id);
    }

    public function store($data = [])
    {
        return $this->model->create($data);
    }

    public function update($id, $data = [])
    {
        $record = $this->find($id);
        $record->update($data);
        return $record;
    }

    public function delete($id)
    {
        return $this->model->destroy($id);
    }
}
