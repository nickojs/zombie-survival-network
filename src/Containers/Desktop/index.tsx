import React from 'react';
import { Rnd } from 'react-rnd';
import { useAuth } from '../../contexts/authContext';

// default module
import Auth from '../../components/auth';
import { useModules } from '../../contexts/modulesContext';

export default () => {
  const { token } = useAuth();
  const { modules, toggleModule } = useModules();

  return (
    <div className="limiter" style={{ width: '100vw', height: '90vh' }}>

      {!token && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Auth />
        </div>
      )}

      {token && (
        <>
          {modules.map((module) => {
            if (!module.display) return;

            const { Component, id } = module;
            return (
              <Rnd
                key={id}
                bounds=".limiter"
                onClick={() => toggleModule(id)}
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
