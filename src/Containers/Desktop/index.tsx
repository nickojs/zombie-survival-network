import React from 'react';
import { Rnd } from 'react-rnd';

import { useAuth } from '../../contexts/authContext';
import { useDrag } from '../../contexts/dragContext';
import { useModules, ModulesName } from '../../contexts/modulesContext';
import { SpecialDiv } from '../../generalStyles';

import Auth from '../../components/auth';
import Profile from '../../components/profile';
import SurvivorList from '../../components/survivor/list';
import Survivor from '../../components/survivor/details';
import Location from '../../components/location';
import Inventory from '../../components/inventory';

export default () => {
  const { drag } = useDrag();
  const { token } = useAuth();
  const { modules, updatePosition } = useModules();
  const {
    survivorList, survivor, profile, location, inventory
  } = modules;

  const Modules = [
    { id: ModulesName.SURVIVORLIST, Component: SurvivorList, module: survivorList },
    { id: ModulesName.SURVIVOR, Component: Survivor, module: survivor },
    { id: ModulesName.PROFILE, Component: Profile, module: profile },
    { id: ModulesName.LOCATION, Component: Location, module: location },
    { id: ModulesName.INVENTORY, Component: Inventory, module: inventory }
  ];

  return (
    <div className="limiter" style={{ width: '100vw', height: '90vh' }}>

      {!token && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Auth />
        </div>
      )}

      {token && (
        <>
          {Modules.map((each) => {
            const { id, module, Component } = each;
            const { screenPos, display } = module;

            return (
              <SpecialDiv
                key={id}
                disabled={display ? 0 : 1}
              >
                <Rnd
                  bounds=".limiter"
                  // @ts-ignore - ignoring 'default' because it is badly typed
                  default={screenPos || undefined}
                  enableResizing={false}
                  disableDragging={!drag}
                  onDragStop={(e, data) => {
                    updatePosition(id, { x: data.x, y: data.y });
                  }}
                >
                  <Component />
                </Rnd>
              </SpecialDiv>
            );
          })}
        </>
      )}
    </div>
  );
};
