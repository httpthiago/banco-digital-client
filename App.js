import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartPage from './src/screens/StartPage';
import CreateAccPage from './src/screens/CreateAccPage';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name='Start' component={StartPage} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen options={{headerTransparent: true, headerBackButtonMenuEnabled: true, title: "", headerTintColor: '#FFF'}} name="CreateAccPage" component={CreateAccPage} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
