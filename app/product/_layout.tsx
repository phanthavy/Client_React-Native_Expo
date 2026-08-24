import { Stack } from 'expo-router';

export default function RootLayout() {
// js code or functions
  return ( 
      <Stack> 
        <Stack.Screen name='index' options={{title: 'Product List'}}/>
        <Stack.Screen name='[id]' options={{title: 'Back'}}/>
        <Stack.Screen name='createproduct/CreateProduct' options={{title: 'Back'}}/>
      </Stack>
  );
}