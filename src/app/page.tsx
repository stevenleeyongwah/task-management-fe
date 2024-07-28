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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
 
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
        console.log("response: ", response)
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/task`, {
        name: taskName,
      });
      
      // Add the newly created task to the tasks array
      setTasks([...tasks, response.data]);

      setDialogOpen(false)
    } catch (error) {
      setDialogOpen(false)
      console.error('Error creating task:', error);
    }
  }

  const handleMarkTaskAsCompleted = async (id, completed) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/task/${id}`, {
        completed: completed,
      });
      
      // Add the newly created task to the tasks array
      setTasks(tasks.map(task => task.id === response.data.id ? response.data : task));
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }

  return (
    <main className="p-8">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-2" variant="outline">Create task</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create task</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input onChange={(e) => setTaskName(e.target.value)} id="name" placeholder="Task name" className="col-span-3" />
          </div>
          <DialogFooter>
            <Button onClick={handleCreateTask} type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {
        tasks.length > 0 && tasks.map(task => {
          return <>
            <Card className="w-[350px] mb-2">
              <CardContent className="flex items-center mt-2 justify-between">
                <p>{task.name}</p>
                {
                  task.completed ?
                    <>
                      Completed
                    </>
                  : <>
                    <Button onClick={() => handleMarkTaskAsCompleted(task.id, 1)} variant="outline">Click to mark as complete</Button> 
                  </>
                }
              </CardContent>
            </Card>
          </>
        })
      }
    </main>
  );
}
