import React from 'react';

import { Form, Icon, Input, Button } from 'antd';

function hasErrors(fielsError) {
  return Object.keys(fielsError).some(field => fielsError[field]);
}

class HorizontalLogingForm extends React.Component {
  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form:', values);
      }
    });
  };

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
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
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
