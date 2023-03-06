import { Alert } from 'react-native';

export const alert_privacy_policy = () =>
  Alert.alert('Privacy Policy', 'The Policy',
    [
      { text: 'Onaylıyorum' },
    ]);

export const alert_terms_of_service = () =>
  Alert.alert('Terms of Service', 'The Terms of Service',
    [
      { text: 'Onaylıyorum' },
    ]);


