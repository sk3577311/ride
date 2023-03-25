const React = require("react");
import { useAuth } from "./hooks/useAuth";
import AuthStack from "./navigators/authStack";
import RootStack from "./navigators/RootStack";

export default function App() {
    return <RootStack />; 
}