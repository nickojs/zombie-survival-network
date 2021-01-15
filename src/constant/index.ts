// import Profile from '../components/profile';
// import SurvivorList from '../components/survivor/list';
// import Survivor from '../components/survivor/details';
// import Location from '../components/location';
// import Inventory from '../components/inventory';
// import Trade from '../components/trade';

const CONTAINER_WIDTH = 400;
const CONTAINER_HEIGHT = 500;
const BOTTOM_HEIGHT = 45;

export const right = window.innerWidth - CONTAINER_WIDTH;
export const below = window.innerHeight - CONTAINER_HEIGHT - BOTTOM_HEIGHT;
export const middle = (window.innerWidth / 2) - (CONTAINER_WIDTH / 2);
export const left = 0;

export const INVENTORY_SPACE = 5;

export const Modules = {
  profile: {
    name: 'Profile',
    display: false,
    isDockable: false,
    screenPos: {
      x: right,
      y: 0
    }
  },
  survivorList: {
    name: 'Survivors',
    display: true,
    isDockable: true,
    screenPos: {
      x: 0,
      y: 0
    }
  },
  survivor: {
    name: 'Details',
    display: true,
    isDockable: true,
    screenPos: {
      x: middle,
      y: 0
    }
  },
  location: {
    name: 'Location',
    display: false,
    isDockable: false,
    screenPos: {
      x: right,
      y: below
    }
  },
  inventory: {
    name: 'Inventory',
    display: false,
    isDockable: false,
    screenPos: {
      x: right,
      y: 0
    }
  },
  trade: {
    name: 'Trade',
    display: false,
    isDockable: false,
    screenPos: {
      x: middle,
      y: 0
    }
  }
};
