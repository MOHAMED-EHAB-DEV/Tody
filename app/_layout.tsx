import { Stack } from 'expo-router';
import 'react-native-get-random-values';

import "./globals.css";
import Index from "@/app/add";
import Id from "@/app/edit/[id]";
import TaskId from "@/app/task/[id]";

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="index"
            />
            <Stack.Screen
                name="add/index"
            />
            <Stack.Screen
                name="edit/[id]"
            />
            <Stack.Screen
                name="task/[id]"
            />
        </Stack>
    );
}
