import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

import { user, useSession } from '../ctx';
import { useState } from 'react';

export default function Login() {
    const { signIn } = useSession();
    const [userDetails, setUserDetails] = useState<user>({
        email: '',
        password: ''
    })

    const handleInputChange = (value: string, name: string) => {
        setUserDetails((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    return (
        <>
            <TextInput
                mode="outlined"
                label="email"
                placeholder="Type something"
                value={userDetails.email}
                right={<TextInput.Affix text="/100" />}
                onChangeText={(value) => handleInputChange(value, 'email')}
            />
            <TextInput
                mode="outlined"
                label="Password"
                secureTextEntry
                placeholder="Type something"
                right={<TextInput.Icon icon='eye' />}
                onChangeText={(value) => handleInputChange(value, 'password')}
            />
            <Button icon="send" mode="contained" style={{ marginTop: 5 }} onPress={() => signIn(userDetails)}>
                Login
            </Button>
        </>
    );
}
