import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { DashboardScreenNavigationProp } from '../navigation/types';
import { useCourses } from '../hooks/useCourses';
import { CourseCard } from '../components/CourseCard';
import { Course } from '../models/Course';

export const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const {
    courses,
    loading,
    refreshing,
    error,
    isOffline,
    refresh,
    retry,
    reloadSilent,
  } = useCourses();

  useFocusEffect(
    React.useCallback(() => {
      reloadSilent();
    }, [reloadSilent])
  );

  const handleCoursePress = (courseId: number) => {
    navigation.navigate('CourseDetails', { courseId });
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {isOffline ? (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineBannerText}>
            Offline Mode: Device is offline (Loaded from local cache)
          </Text>
        </View>
      ) : null}

      <Text style={styles.sectionTitle}>Enrolled Courses ({courses.length})</Text>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.emptyTitle}>No Courses Available</Text>
      <Text style={styles.emptySubtitle}>
        Pull down to refresh or check your device internet connection.
      </Text>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Loading dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error && courses.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorTitle}>Unable to Load Courses</Text>
          <Text style={styles.errorMessage}>{error}</Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={retry}
            activeOpacity={0.8}
            accessibilityLabel="Retry loading courses"
            accessibilityRole="button"
          >
            <Text style={styles.retryButtonText}>Retry Request</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={courses}
        keyExtractor={(item: Course) => item.id.toString()}
        renderItem={({ item }) => (
          <CourseCard course={item} onPress={() => handleCoursePress(item.id)} />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor="#2563EB"
            colors={['#2563EB']}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 8,
  },
  offlineBanner: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FCA5A5',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  offlineBannerText: {
    color: '#991B1B',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    color: '#64748B',
    fontSize: 14,
    marginTop: 12,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: '#991B1B',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
  },
});
