import { StyleSheet } from 'react-native';

export const Colors = {
  background: '#e0f2f1', 
  primary: '#48d0b0',    
  secondary: '#76c893',  
  accent: '#a0e7a0',     
  danger: '#f44336',     
  textPrimary: '#2e7d32',
  textSecondary: '#a5d6a7',
  gray: '#9e9e9e',       
  white: '#fff',
};

export const themedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
