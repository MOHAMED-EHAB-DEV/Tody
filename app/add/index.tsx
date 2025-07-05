import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {useRouter} from 'expo-router';

import {addTask} from "@/lib/actions/tasks";

const Index = () => {
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");

    const router = useRouter();

    return (
        <View className="bg-primary min-h-full">
            <View className="flex flex-col gap-3 mt-24 px-8">
                <Text className="text-center text-2xl text-white mb-4">Add A Task</Text>
                <Text className="text-xl text-white">Title</Text>
                <TextInput
                    className="placeholder:text-light-300 ml-4 px-4 rounded-lg text-white bg-dark-200"
                    value={title}
                    onChangeText={(value: string) => setTitle(value)}
                    placeholder="Enter Title"
                />
                <Text className="text-xl text-white">Description</Text>
                <TextInput
                    className="placeholder:text-light-300 placeholder:align-top ml-4 h-24 px-4 rounded-lg text-white bg-dark-200"
                    value={desc}
                    onChangeText={(value: string) => setDesc(value)}
                    placeholder="Enter Description"
                    editable
                    multiline
                    numberOfLines={6}
                    maxLength={40}
                />
                <TouchableOpacity
                    className="bg-dark-100 rounded-md w-[47px] text-center self-end px-3 py-2"
                    onPress={async () => {
                        await addTask(title, desc)
                        router.push("/")
                    }}
                >
                    <Text className="text-white font-medium">Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Index;