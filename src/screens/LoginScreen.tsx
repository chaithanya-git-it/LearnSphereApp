import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenNavigationProp } from '../navigation/types';
import { AuthService } from '../services/AuthService';

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [email, setEmail] = useState('demo@learnsphere.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);

  const getEmailError = (val: string): string | undefined => {
    if (!val.trim()) {
      return 'Email address is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val.trim())) {
      return 'Please enter a valid email format';
    }
    if (val.trim().toLowerCase() !== 'demo@learnsphere.com') {
      return 'Incorrect email (Use demo@learnsphere.com)';
    }
    return undefined;
  };

  const getPasswordError = (val: string): string | undefined => {
    if (!val) {
      return 'Password is required';
    }
    if (val.length < 6) {
      return 'Password must be at least 6 characters';
    }
    if (val !== 'password123') {
      return 'Incorrect password (Use password123)';
    }
    return undefined;
  };

  const emailError = getEmailError(email);
  const passwordError = getPasswordError(password);

  const isFormValid = !emailError && !passwordError;

  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setApiError(null);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setApiError(null);
  };

  const handleAutofillEmail = () => {
    setEmail('demo@learnsphere.com');
    setApiError(null);
  };

  const handleAutofillPassword = () => {
    setPassword('password123');
    setApiError(null);
  };

  const handleAutofillAll = () => {
    setEmail('demo@learnsphere.com');
    setPassword('password123');
    setApiError(null);
  };

  const handleLogin = async () => {
    if (!isFormValid) {
      return;
    }

    setLoading(true);
    setApiError(null);

    try {
      await AuthService.login(email, password);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      });
    } catch (err: any) {
      setApiError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerSection}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoText}>LS</Text>
            </View>
            <Text style={styles.title}>LearnSphere</Text>
            <Text style={styles.subtitle}>
              Senior Mobile Engineer Assessment
            </Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Sign In</Text>

            {apiError ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorBoxText}>{apiError}</Text>
              </View>
            ) : null}

            {/* Email Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={[styles.input, emailError ? styles.inputError : null]}
                placeholder="email@example.com"
                placeholderTextColor="#94A3B8"
                value={email}
                onChangeText={handleEmailChange}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {emailError ? (
                <Text style={styles.fieldErrorText}>{emailError}</Text>
              ) : null}
            </View>

            {/* Password Field with Eye Toggle */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View
                style={[
                  styles.passwordContainer,
                  passwordError ? styles.inputError : null,
                ]}
              >
                <TextInput
                  style={styles.passwordInput}
                  placeholder="••••••••"
                  placeholderTextColor="#94A3B8"
                  value={password}
                  onChangeText={handlePasswordChange}
                  secureTextEntry={!showPassword}
                  maxLength={11}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                  accessibilityLabel={
                    showPassword ? 'Hide password' : 'Show password'
                  }
                  accessibilityRole="button"
                >
                  <Text style={styles.eyeButtonText}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Text>
                </TouchableOpacity>
              </View>
              {passwordError ? (
                <Text style={styles.fieldErrorText}>{passwordError}</Text>
              ) : null}
            </View>

            {/* Sign In Button (Disabled until form is valid) */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                !isFormValid || loading ? styles.loginButtonDisabled : null,
              ]}
              onPress={handleLogin}
              disabled={!isFormValid || loading}
              activeOpacity={0.8}
              accessibilityLabel="Log In"
              accessibilityRole="button"
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            {/* Interactive Demo Credentials Autofill Box */}
            <View style={styles.demoBox}>
              <View style={styles.demoHeaderRow}>
                <Text style={styles.demoTitle}>Demo Credentials</Text>
                <TouchableOpacity
                  style={styles.autofillAllButton}
                  onPress={handleAutofillAll}
                  activeOpacity={0.7}
                >
                  <Text style={styles.autofillAllText}>Auto Fill All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.chipRow}>
                <TouchableOpacity
                  style={styles.chipButton}
                  onPress={handleAutofillEmail}
                  activeOpacity={0.7}
                  accessibilityLabel="Autofill Email"
                >
                  <Text style={styles.chipText}>demo@learnsphere.com</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.chipButton}
                  onPress={handleAutofillPassword}
                  activeOpacity={0.7}
                  accessibilityLabel="Autofill Password"
                >
                  <Text style={styles.chipText}>password123</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoBadge: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 16,
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FCA5A5',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorBoxText: {
    color: '#991B1B',
    fontSize: 13,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#0F172A',
    fontSize: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 14,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    color: '#0F172A',
    fontSize: 15,
  },
  eyeButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  eyeButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563EB',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  fieldErrorText: {
    color: '#DC2626',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#2563EB',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonDisabled: {
    backgroundColor: '#94A3B8',
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  demoBox: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  demoHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  demoTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  autofillAllButton: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  autofillAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  chipButton: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '500',
  },
});
