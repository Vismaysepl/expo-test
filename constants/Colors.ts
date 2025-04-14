/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  // Add more to your theme.ts
  rain: {
    background: '#E3F2FD',
    card: '#BBDEFB',
    text: '#0D47A1',
    button: '#1976D2',
    temperature: '#1565C0',
  },
  cloudy: {
    background: '#ECEFF1',
    card: '#CFD8DC',
    text: '#455A64',
    button: '#607D8B',  
    temperature: '#78909C',
  },
   sunny: {
    background: '#FFFBEB',
    card: '#FFF9C4',
    text: '#333333',
    button: '#F9A825',
    temperature: '#FF8F00',
  },

};
