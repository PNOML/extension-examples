import { ReactWidget } from '@jupyterlab/apputils';

import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import {
  Button,
  Header,
  Modal,
  Tab,
  Icon,
  Table,
  Dropdown
} from 'semantic-ui-react';

const TableExampleStructured = () => (
  <Table celled structured selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell rowSpan="2">Name</Table.HeaderCell>
        <Table.HeaderCell rowSpan="2">Type</Table.HeaderCell>
        <Table.HeaderCell rowSpan="2">Files</Table.HeaderCell>
        <Table.HeaderCell colSpan="3">Languages</Table.HeaderCell>
      </Table.Row>
      <Table.Row>
        <Table.HeaderCell>Ruby</Table.HeaderCell>
        <Table.HeaderCell>JavaScript</Table.HeaderCell>
        <Table.HeaderCell>Python</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Alpha Team</Table.Cell>
        <Table.Cell>Project 1</Table.Cell>
        <Table.Cell textAlign="right">2</Table.Cell>
        <Table.Cell textAlign="center">
          <Icon color="green" name="checkmark" size="large" />
        </Table.Cell>
        <Table.Cell />
        <Table.Cell />
      </Table.Row>
      <Table.Row>
        <Table.Cell rowSpan="3">Beta Team</Table.Cell>
        <Table.Cell>Project 1</Table.Cell>
        <Table.Cell textAlign="right">52</Table.Cell>
        <Table.Cell textAlign="center">
          <Icon color="green" name="checkmark" size="large" />
        </Table.Cell>
        <Table.Cell />
        <Table.Cell />
      </Table.Row>
      <Table.Row>
        <Table.Cell>Project 2</Table.Cell>
        <Table.Cell textAlign="right">12</Table.Cell>
        <Table.Cell />
        <Table.Cell textAlign="center">
          <Icon color="green" name="checkmark" size="large" />
        </Table.Cell>
        <Table.Cell />
      </Table.Row>
      <Table.Row>
        <Table.Cell>Project 3</Table.Cell>
        <Table.Cell textAlign="right">21</Table.Cell>
        <Table.Cell textAlign="center">
          <Icon color="green" name="checkmark" size="large" />
        </Table.Cell>
        <Table.Cell />
        <Table.Cell />
      </Table.Row>
    </Table.Body>
  </Table>
);

const ModalTest = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}
    >
      <Modal.Header>JupyterLab</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>Some Header</Header>
          <p>Jupyterlab is best of the best of the best and best of the best</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          No
        </Button>
        <Button
          content="Yes"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

const options = [
  { key: 1, text: 'Choice 1', value: 1 },
  { key: 2, text: 'Choice 2', value: 2 },
  { key: 3, text: 'Choice 3', value: 3 }
];

const DropdownExampleSimple = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <label>Choose param</label>
    <Dropdown clearable options={options} selection />
  </div>
);

const panes = [
  {
    menuItem: 'Tab 1',
    render: () => (
      <Tab.Pane attached={false}>
        <div>
          <TableExampleStructured />
          <DropdownExampleSimple />
        </div>
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Tab 2',
    render: () => (
      <Tab.Pane attached={false}>
        <ModalTest />
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Tab 3',
    render: () => (
      <Tab.Pane attached={false}>
        <App />
      </Tab.Pane>
    )
  }
];

const TabExamplePointing = () => (
  <Tab menu={{ pointing: true }} panes={panes} />
);

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div
      style={{
        margin: '30px auto',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Header as="h1">Counter</Header>
      <p style={{ fontSize: '22px', fontWeight: 600 }}>
        You clicked {counter} times!
      </p>
      <div>
        <Button
          negative
          onClick={(e): void => {
            setCounter(counter - 1);
          }}
        >
          Decrement
        </Button>
        <Button
          primary
          onClick={(e): void => {
            setCounter(counter + 1);
          }}
        >
          Increment
        </Button>
      </div>
    </div>
  );
};

/**
 * React component for a counter.
 *
 * @returns The React component
 */
const CounterComponent = (): JSX.Element => {
  useEffect(() => {
    const topPanel = document.getElementById('jp-top-panel');
    console.log(topPanel);
    topPanel.setAttribute('height', '50px');
    topPanel.setAttribute('background', 'red');
  }, []);

  return (
    <div>
      <TabExamplePointing />
    </div>
  );
};

/**
 * A Counter Lumino Widget that wraps a CounterComponent.
 */
export class CounterWidget extends ReactWidget {
  /**
   * Constructs a new CounterWidget.
   */
  constructor() {
    super();
    this.addClass('jp-ReactWidget');
  }

  render(): JSX.Element {
    return <CounterComponent />;
  }
}
