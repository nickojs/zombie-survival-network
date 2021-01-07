import Profile from '../components/profile';
import SurvivorList from '../components/survivor/list';
import Survivor from '../components/survivor/details';
import Location from '../components/location';

const CONTAINER_WIDTH = 400;
const CONTAINER_HEIGHT = 500;
const BOTTOM_HEIGHT = 45;

export const right = window.innerWidth - CONTAINER_WIDTH;
export const below = window.innerHeight - CONTAINER_HEIGHT - BOTTOM_HEIGHT;
export const middle = (window.innerWidth / 2) - (CONTAINER_WIDTH / 2);
export const left = 0;

export const Modules = [
  {
    id: 'profile',
    name: 'Profile',
    Component: Profile,
    display: false,
    isDockable: false,
    screenPos: {
      x: right,
      y: 0
    }
  },
  {
    id: 'survivorList',
    name: 'Survivors',
    Component: SurvivorList,
    display: true,
    isDockable: true,
    screenPos: {
      x: 0,
      y: 0
    }
  },
  {
    id: 'survivor',
    name: 'Details',
    Component: Survivor,
    display: true,
    isDockable: true,
    screenPos: {
      x: middle,
      y: 0
    }
  },
  {
    id: 'location',
    name: 'Location',
    Component: Location,
    display: false,
    isDockable: false,
    screenPos: {
      x: right,
      y: below
    }
  }
];
