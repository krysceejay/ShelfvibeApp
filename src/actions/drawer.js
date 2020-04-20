import {OPEN_DRAWER} from './types';
import {CLOSE_DRAWER} from './types';

export const openDrawerAction = () => ({
  type: OPEN_DRAWER,
});
export const closeDrawerAction = () => ({
  type: CLOSE_DRAWER,
});
