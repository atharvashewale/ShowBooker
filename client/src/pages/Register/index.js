import React, { useEffect } from 'react';
import { Button, Form, Input, message, Radio } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../api/users';

function Register() {

    const navigate = useNavigate();

    const onFinish = async (value) => {
        try {
            const response = await RegisterUser(value);
            if(response.success)
            {
                message.success(response.message);
                navigate("/login");
            }
            else
                message.error(response.message);
        } catch (error) {
            console.log(error);
            message.error(error.message);
        }
    };

    useEffect(() => {
        if(localStorage.getItem('token'))
            navigate("/");
    });

  return (
    <>
      <main className='App-header'>
          <h1>
              Login to ShowBooker
          </h1>
          <section className='mw-500 text-center px-3'>
              <Form layout="vertical" onFinish={ onFinish }>
                  <Form.Item label="Name" htmlFor='name' name='name' className='d-block' rules={[{ required: true, message: "Email is mandatory"}]}>
                      <Input id='name' type='text' placeholder='Enter your Name'></Input>
                  </Form.Item>
                  <Form.Item label="Email" htmlFor='email' name='email' className='d-block' rules={[{ required: true, message: "Email is mandatory"}, { type: 'email', message: "Enter a valid Email"}]}>
                      <Input id='email' type='text' placeholder='Enter your Email'></Input>
                  </Form.Item>
                  <Form.Item label="Password" htmlFor='password' name='password' className='d-block' rules={[{ required: true, message: "Password is mandatory"}]}>
                      <Input id='password' type='password' placeholder='Enter your Password'></Input>
                  </Form.Item>
                  <Form.Item>
                      <Button color='purple' variant='solid' block htmlType="submit" style={{fontSize: "1rem", fontWeight: "600"}}>Register</Button>
                  </Form.Item>
                  <Form.Item
                    label= "Register as a Partner"
                    htmlFor='role'
                    name='role'
                    className='d-block text-center'
                    initialValue={false}
                    rules={[ {required: true, message: "Please select an option"} ]}>
                        <div className='d-flex justify-content-start'>
                            <Radio.Group name='radiogroup' className='flex-start'>
                                <Radio value={"partner"}>Yes</Radio>
                                <Radio value={"user"}>No</Radio>
                            </Radio.Group>
                        </div>
                  </Form.Item>
                  <p>
                      Already a User? <Link to="/login">Login Here!</Link>
                  </p>
              </Form>
          </section>
      </main>
    </>
  )
}

export default Register