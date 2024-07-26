"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
 
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    try {
      const response = await axios.post('https://your-backend-api-url.com/tasks', {
        task: newTask,
      });
      
      // Add the newly created task to the tasks array
      setTasks([...tasks, response.data]);
      
      // Clear the input field
      setNewTask('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create task</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input id="name" placeholder="Task name" className="col-span-3" />
          </div>
          <DialogFooter>
            <Button onClick={handleCreateTask} type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
