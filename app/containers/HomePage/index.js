/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'antd';
import messages from './messages';

import HorizontalLogingForm from './Prac';
/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      nombre: 'Kerly',
      apellido: 'Salazar',
    };
  }

  cambiarNombre = () => {
    this.setState({ nombre: 'yamil' });
  };

  render() {
    return (
      <div>
        <h1>
          hola {this.state.nombre}
          <br />
          <Button onClick={this.cambiarNombre} type="primary">
            Paises
          </Button>
        </h1>
        <HorizontalLogingForm />
      </div>
    );
  }
}
