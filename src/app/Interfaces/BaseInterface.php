<?php

namespace App\Interfaces;

interface BaseInterface
{
    public function store($data = []);

    public function update($id, $data = []);

    public function delete($id);

    public function find($id);
}

