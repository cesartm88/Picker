import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//routes
import routes  from './routes';
import options from './options';
import NavigationService from './NavigationService';


const MainNavigator = createStackNavigator(routes,options);

export default createAppContainer(MainNavigator);

export {
    NavigationService
}