import AsyncStorage from '@react-native-async-storage/async-storage';
import {nanoid} from 'nanoid';


export async function addTask(title: string, description: string) {
    try {
        const tasksString = await AsyncStorage.getItem("tasks");
        let tasks = [];

        if (tasksString) {
            tasks = JSON.parse(tasksString);
        }

        const newTasks = [
            ...tasks,
            {title, description, isDone: false, id: nanoid()}
        ];

        await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
    } catch (err) {
        console.log(`Error adding task: ${err}`);
    }
}

export async function getAllTasks() {
    try {
        const tasksString = await AsyncStorage.getItem("tasks");

        if (tasksString) {
            const tasks = JSON.parse(tasksString);
            return tasks;
        }

        return [];
    } catch (err) {
        console.log(`Error getting tasks: ${err}`);
        return [];
    }
}

export async function removeTaskById(taskId: string) {
    try {
        const tasks = await AsyncStorage.getItem("tasks");
        let updatedTasks;

        if (tasks) {
            updatedTasks = JSON.parse(tasks);
        }

        updatedTasks.filter((task) => task?.id !== taskId);

        await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } catch (err) {
        console.log(`Error deleting task By id: ${taskId}`);
    }
}

export async function removeAllTasks() {
    try {
        await AsyncStorage.removeItem("tasks");
    } catch (err) {
        console.log(`Error deleting tasks: ${err}`);
    }
}

export async function updateTaskById(taskId: string, updatedTask: any) {
    try {
        const tasks = await AsyncStorage.getItem("tasks");

        if (!tasks) return;

        const parsedTasks = JSON.parse(tasks);

        const newTasks = parsedTasks.map((t: any) => {
            if (t.id === taskId) {
                return {...t, ...updatedTask}; // Merge old task with new values
            }
            return t;
        });

        await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
    } catch (err) {
        console.log(`Error updating task: ${err}`);
    }
}

export async function getTaskById(taskId: string) {
    try {
        const tasks = await AsyncStorage.getItem("tasks");

        if (!tasks) return;

        const parsedTasks = JSON.parse(tasks);

        const task = parsedTasks.find((task) => task.id === taskId);

        return task;
    } catch (err) {
        console.log(`Error getting task: ${err}`);
    }
}

export async function searchTasks(query: string) {
    try {
        const tasks = await AsyncStorage.getItem("tasks");

        if (!tasks) return [];

        const parsedTasks = JSON.parse(tasks);

        return parsedTasks.filter((t: any) =>
            t.title.includes(query) || t.description.includes(query)
        );
    } catch (err) {
        console.log(`Error searching tasks: ${err}`);
    }
}
