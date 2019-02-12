import React from 'react';
import axios from 'axios';

import { Form, Icon, Input, Button, Select, List } from 'antd';

function hasErrors(fielsError) {
  return Object.keys(fielsError).some(field => fielsError[field]);
}

const Option = Select.Option;

class HorizontalLogingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
    };
    super(props);
    this.state = {
      values: [],
    };
  }

  componentDidMount() {
    this.props.form.validateFields();
    axios
      .get('https://api.negociosky.com/marriott-api/business/countries')
      .then(respuesta => {
        console.log(respuesta);
        this.setState({ countries: respuesta.data.countries });
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form:', values);
      }
    });
  };

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    const userNameError =
      isFieldTouched('nombreUsuario') && getFieldError('nombreUsuario');
    const passwordError =
      isFieldTouched('contraseña') && getFieldError('contraseña');
    const data = this.state.values;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.item>
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Tags Mode"
            onChange={this.handleChange}
          >
            {this.state.countries.map(territorio => (
              <Option key={territorio.id_country}>{territorio.country}</Option>
            ))}
          </Select>
        </Form.item>
        <div>
          <h3 style={{ margin: '16px 0' }}>Lista</h3>
          <List
            size="small"
            bordered
            dataSource={data.values}
            renderItem={item => <List.Item>{item}</List.Item>}
          />
        </div>
        ,
        <Form.Item
          validateStatus={userNameError ? 'error' : ''}
          help={userNameError || ''}
        >
          {getFieldDecorator('nombreUsuario', {
            rules: [
              { required: true, message: '¡Porfavor ingrese su contraseña!' },
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="contraseña"
              placeholder="contraseña"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(
  HorizontalLogingForm,
);
export default WrappedHorizontalLoginForm;
