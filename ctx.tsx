import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './useStorageState';
import Toast from 'react-native-toast-message';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/constants/firebaseconfig'
import { router } from 'expo-router';

export interface user {
    email: string
    password: string
}

const AuthContext = createContext<{
    signIn: (data: user) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: (data) => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}
const login = async (req: user) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, req.email, req.password);
        const token = await userCredential.user.getIdToken();

        console.log("Login successful, token:", token);
        return token

    } catch (error: any) {
        let message = 'Login failed';
        if (error.code === 'auth/user-not-found') message = 'No user found';
        else if (error.code === 'auth/wrong-password') message = 'Wrong password';
        else if (error.code === 'auth/invalid-email') message = 'Invalid email';

        Toast.show({
            type: 'error',
            text1: 'Login Error',
            text2: message,
        });

        console.log('Firebase Auth Error:', error.code, error.message);
        return error
    }
    // try {
    //     const user = await axios.get(`${API}/test/testRoute`, {})
    //     console.log('user', user.data)
    // } catch (err) {
    //     console.log('errr', err)
    // }
}

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');
    const showToast = (type: string, message: string) => {
        Toast.show({
            type: type,
            text1: message,
            text2: 'This is some something 👋'
        });
    }


    return (
        <AuthContext.Provider
            value={{
                signIn: async (data: user) => {
                    // Perform sign-in logic here
                    const udata = await login(data)
                    console.log('udata', udata)
                    if (!udata?.code) {
                        showToast('success', 'Login Success!')

                        setSession(udata);
                        router.push('/')
                    }
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
}
