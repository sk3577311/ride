import {ReactNode} from "react";
import { StyleProp,TextStyle } from "react-native";


export interface TextProps {
    textstyles?: StyleProp<TextStyle>;
    childern: ReactNode;
}