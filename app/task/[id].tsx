import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useLocalSearchParams} from 'expo-router';

import {getTaskById} from "@/lib/actions/tasks";

const TaskId = () => {
    const {id} = useLocalSearchParams();
    const [task, setTask] = useState({
        title: "",
        description: ""
    });

    useEffect(() => {
        (async () => {
            const task = await getTaskById(id as string);
            setTask(task);
        })();
    }, [])

    return (
        <View className="bg-primary min-h-full">
            <View className="flex flex-col gap-3 mt-24 px-8">
                <Text className="text-center text-2xl text-white mb-4">Task</Text>
                <Text className="text-xl text-white">Title</Text>
                <Text
                    className="text-white ml-4"
                >
                    {task.title}
                </Text>
                <Text className="text-xl text-white">Description</Text>
                <Text
                    className="text-white ml-4"
                >
                    {task.description}
                </Text>
            </View>
        </View>
    )
}

export default TaskId;