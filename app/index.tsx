import {useState, useEffect} from "react";
import {ScrollView, Text, TextInput, View, Pressable, Modal, Image, TouchableOpacity} from "react-native";
import { useRouter } from 'expo-router';

import {icons} from "@/constants/icons";
import {getAllTasks, updateTaskById, searchTasks} from "@/lib/actions/tasks";

export default function Index() {
    const [search, setSearch] = useState<string>("");
    const [tasks, setTasks] = useState([]);
    const [mustUpdated, setMustUpdated] = useState<boolean>(true);

    const router = useRouter();

    useEffect(() => {
        (async () => {
            const tasks = await searchTasks(search);
            setTasks(tasks);
        })();
    }, [search]);

    useEffect(() => {
        (async () => {
            const tasks = await getAllTasks();
            setTasks(tasks);
        })();
    }, [mustUpdated]);



    return (
        <View className="bg-primary flex flex-col gap-6 min-h-full px-6">
            <View className="flex flex-row justify-between items-center mt-24">
                <View className="flex flex-col gap-2">
                    <Text className="text-2xl font-bold text-white">Hello, Mohammed</Text>
                    {/*<Text className="text-base font-normal text-light-300">You have work Today</Text>*/}
                </View>
                <View className="flex flex-row gap-3">
                    <Pressable onPress={() => router.push("/add")}>
                        <Image
                            source={icons.add}
                            tintColor="#A8B5DB"
                            className="size-5"
                        />
                    </Pressable>
                </View>
            </View>
            <TextInput
                value={search}
                onChangeText={(value: string) => setSearch(value)}
                placeholder="Search Tasks..."
                className="placeholder:text-light-300 bg-dark-200 outline-none focus:border-light-200 rounded-lg px-3 text-white"
            />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
                gap: "20px"
            }}>
                {tasks.length === 0 ? (
                    <Text className="font-light text-base text-light-300">No Tasks Found</Text>
                ) : tasks.map((task) => (
                    <TaskItem
                        title={task?.title}
                        description={task?.description}
                        isDone={task?.isDone}
                        id={task?.id}
                        key={task?.id}
                        setMustUpdated={setMustUpdated}
                        updated={mustUpdated}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

const TaskItem = ({title, description, isDone, id, setMustUpdated, updated}: {
    title: string,
    description: string,
    isDone: Boolean,
    id: string,
    setMustUpdated: Function,
    updated: Boolean,
}) => {
    const router = useRouter();

    return (
        <TouchableOpacity className="w-full h-10 rounded-md px-4 hover:bg-dark-100 py-2 flex flex-row justify-between items-center" onPress={() => router.push(`/task/${id}`)}>
            <View className="flex flex-row items-center justify-center gap-4">
                <Image
                    source={icons.tasks}
                    tintColor={"#A8B5DB"}
                    className="size-8"
                />
                <Text className={`text-xl text-white font-medium ${isDone && "line-through opacity-50"}`}>{title}</Text>
            </View>
            <View className="flex flex-row gap-3">
                <Pressable onPress={async () => {
                    await updateTaskById(id, {title, isDone: !isDone, description, id});
                    setMustUpdated(!updated)
                }}>
                    <Image
                        source={isDone ? icons.checked : icons.unchecked}
                        tintColor={"#A8B5DB"}
                        className="size-6"
                    />
                </Pressable>
                <Pressable onPress={() => router.push(`/edit/${id}`)}>
                    <Image
                        source={icons.edit}
                        tintColor={"#A8B5DB"}
                        className="size-6"
                    />
                </Pressable>
            </View>
        </TouchableOpacity>
    );
}