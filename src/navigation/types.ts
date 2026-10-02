import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  CourseDetails: { courseId: number };
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export type DashboardScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

export type CourseDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CourseDetails'
>;

export type CourseDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'CourseDetails'
>;
