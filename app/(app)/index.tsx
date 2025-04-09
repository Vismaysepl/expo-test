import { Text, View } from 'react-native';

import { useSession } from '../../ctx';
import React from 'react';

export default function Home() {
    const { signOut } = useSession();
    return (
        <React.Fragment>

            <Text
                onPress={() => {
                    // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
                    signOut();
                }}>
                Sign Out
            </Text>
        </React.Fragment>
    );
}
