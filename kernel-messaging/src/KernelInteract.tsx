import { UseSignal } from '@jupyterlab/apputils';

import React, { useState } from 'react';

import 'semantic-ui-css/semantic.min.css';
import { Button, TextArea, Divider } from 'semantic-ui-react';
import { KernelModel } from './model';

interface IModel {
  model: KernelModel;
}

const KernelInteract = ({ model }: IModel): JSX.Element => {
  const [code, setCode] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.currentTarget.value);
  };

  const handleKernel = (): void => {
    model.execute(code);
  };

  return (
    <>
      <div
        style={{
          width: '600px',
          margin: '30px auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: ''
        }}
      >
        <TextArea
          rows={20}
          placeholder="Put some code"
          value={code}
          onChange={handleChange}
        />

        <Button primary onClick={handleKernel}>
          Execute Code
        </Button>
      </div>

      <UseSignal signal={model.stateChanged}>
        {(): JSX.Element => (
          <div style={{ textAlign: 'center' }}>
            <Divider horizontal>Output</Divider>
            {model.output && (
              <span style={{ margin: '30px' }} key="output field">
                Output: {JSON.stringify(model.output)}
              </span>
            )}

            {model.output && Object.values(model.output.data).length === 2 && (
              <div>
                <img
                  src={`data:image/png;base64,${
                    Object.values(model.output.data)[1]
                  }`}
                  alt="no picture"
                />
              </div>
            )}
          </div>
        )}
      </UseSignal>
    </>
  );
};

export { KernelInteract };
