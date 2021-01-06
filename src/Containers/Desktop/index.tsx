import React, { useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';

import { useAuth } from '../../contexts/authContext';
import { useModules, Module } from '../../contexts/modulesContext';

// default module
import Auth from '../../components/auth';

export default () => {
  const [activeModules, setActiveModules] = useState<Module[]>([]);
  const { token } = useAuth();
  const { modules, updatePosition } = useModules();

  useEffect(() => {
    const filterModules = modules.filter((mo) => mo.display);
    setActiveModules(filterModules);
  }, [modules]);

  return (
    <div className="limiter" style={{ width: '100vw', height: '90vh' }}>

      {!token && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Auth />
        </div>
      )}

      {token && (
        <>
          {activeModules.map((module) => {
            if (!module.display) return;

            const { Component, id, screenPos } = module;
            return (
              <Rnd
                key={id}
                bounds=".limiter"
                // @ts-ignore - ignoring 'default' because it is badly typed
                default={screenPos || undefined}
                onDragStop={(e, data) => {
                  updatePosition(id, { x: data.x, y: data.y });
                }}
              >
                <Component />
              </Rnd>
            );
          })}
        </>
      )}
    </div>
  );
};
