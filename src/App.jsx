import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js';



function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { name: newTask, time: 0, isActive: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const startTaskTimer = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isActive = true;
    setTasks(updatedTasks);
  };

  const stopTaskTimer = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isActive = false;
    setTasks(updatedTasks);
  };

  const incrementTaskTime = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].time += 1;
    setTasks(updatedTasks);
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      tasks.forEach((task, index) => {
        if (task.isActive) {
          incrementTaskTime(index);
        }
      });
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [tasks]);

  return (
    <div>
      <h1>Task Dashboard</h1>
  
      <Timer />
  
      <h2>Tasks</h2>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.name} - {task.time}s
            {task.isActive ? (
              <button onClick={() => stopTaskTimer(index)}>Stop Timer</button>
            ) : (
              <button onClick={() => startTaskTimer(index)}>Start Timer</button>
            )}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
  
      <h2>Time Distribution</h2>
      <Doughnut
        data={{
          labels: tasks.map((task) => task.name),
          datasets: [
            {
              data: tasks.map((task) => task.time),
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#8C9EFF',
                '#FF8A80',
                '#A7FFEB',
                '#B9F6CA',
              ],
            },
          ],
        }}
      />
    </div>
  );
  
}

export default App;
