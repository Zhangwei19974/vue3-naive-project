import { Home16Filled, Home16Regular } from '@vicons/fluent';
import { enumIcon } from '../enums';
import { Component } from 'vue';
export const constIcons: Record<enumIcon, Component> &
  Record<string, Component> = {
  [enumIcon.Home16Filled]: Home16Filled,
  [enumIcon.Home16Regular]: Home16Regular,
} as const;
