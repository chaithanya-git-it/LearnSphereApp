import NetInfo from '@react-native-community/netinfo';
import { Course } from '../models/Course';
import { INITIAL_COURSES } from '../constants/courses';

/**
 * Simulates asynchronous remote data fetching using NetInfo real network verification.
 */
export const fetchCoursesRemote = async (): Promise<Course[]> => {
  // Check real device/emulator network status
  const netState = await NetInfo.fetch();
  if (netState.isConnected === false || netState.isInternetReachable === false) {
    throw new Error('Network request failed: Device is offline / internet unreachable');
  }

  // Simulate network latency for remote request
  await new Promise(resolve => setTimeout(resolve, 700));

  // Double check network state after latency delay
  const recheckNet = await NetInfo.fetch();
  if (recheckNet.isConnected === false || recheckNet.isInternetReachable === false) {
    throw new Error('Network request failed: Device is offline / internet unreachable');
  }

  // Return deep copy of mock course data
  return JSON.parse(JSON.stringify(INITIAL_COURSES));
};

export const CourseApi = {
  fetchCoursesRemote,
};
