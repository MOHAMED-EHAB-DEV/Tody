import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import {useRouter} from "expo-router";
import {useLocalSearchParams} from 'expo-router';

import {addTask, getTaskById, updateTaskById} from "@/lib/actions/tasks";

const Id = () => {
    const {id} = useLocalSearchParams();
    const [task, setTask] = useState({
        title: "",
        description: ""
    });

    const router = useRouter();

    useEffect(() => {
        (async () => {
            const task = await getTaskById(id as string);
            setTask(task);
        })();
    }, [])

    return (
        <View className="bg-primary min-h-full">
            <View className="flex flex-col gap-3 mt-24 px-8">
                <Text className="text-center text-2xl text-white mb-4">Edit A Task</Text>
                <Text className="text-xl text-white">Title</Text>
                <TextInput
                    className="placeholder:text-light-300 ml-4 px-4 rounded-lg text-white bg-dark-200"
                    value={task.title}
                    onChangeText={(value: string) => setTask({...task, title: value})}
                    placeholder="Enter Title"
                />
                <Text className="text-xl text-white">Description</Text>
                <TextInput
                    className="placeholder:text-light-300 placeholder:align-top ml-4 h-24 px-4 rounded-lg text-white bg-dark-200"
                    value={task.description}
                    onChangeText={(value: string) => setTask({...task, description: value})}
                    placeholder="Enter Description"
                    editable
                    multiline
                    numberOfLines={6}
                    maxLength={40}
                />
                <TouchableOpacity
                    className="bg-dark-100 rounded-md w-[47px] text-center self-end px-3 py-2"
                    onPress={async () => {
                        await updateTaskById(id as string, task)
                        router.push("/");
                    }}
                >
                    <Text className="text-white font-medium">Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Id
