import { ReactWidget } from '@jupyterlab/apputils';

import React from 'react';
// import Canvas from './canvas';

import 'semantic-ui-css/semantic.min.css';

import { KernelModel } from './model';
import { KernelInteract } from './KernelInteract';

export class KernelView extends ReactWidget {
  constructor(model: KernelModel) {
    super();
    this._model = model;
  }

  protected render(): JSX.Element {
    return (
      <div>
        <KernelInteract model={this._model} />

        {/*<Canvas />*/}
      </div>
    );
  }

  private _model: KernelModel;
}
