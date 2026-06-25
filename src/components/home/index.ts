import { Platform } from 'react-native';

import { HomeExperience as HomeExperienceNative } from './HomeExperience.native';
import { HomeExperience as HomeExperienceWeb } from './HomeExperience.web';

export const HomeExperience = Platform.OS === 'web' ? HomeExperienceWeb : HomeExperienceNative;
