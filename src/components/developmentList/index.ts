import { Platform } from 'react-native';
import { DevelopmentList as DevelopmentListNative } from './DevelopmentList.native';
import { DevelopmentList as DevelopmentListWeb } from './DevelopmentList.web';

export const DevelopmentList = Platform.OS === 'web' ? DevelopmentListWeb : DevelopmentListNative;
