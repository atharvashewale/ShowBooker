import { useEffect } from 'react'
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../../api/users';

function Login() {

    const navigate = useNavigate();
    const onFinish = async (value) => {
        try {
            const response = await LoginUser(value);
            if(response.success)
            {
                message.success(response.message);
                localStorage.setItem('token', response.data);
                const expirationDate = new Date();
                expirationDate.setTime(expirationDate.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days from now
                document.cookie = `token=${response.data};expires=${expirationDate.toUTCString()}`;
                navigate("/");
            }
            else
                message.error(response.message);
        } catch (error) {
            console.log(error);
            message.error(error.message);
        }
    }

    useEffect(()=> {
        if(localStorage.getItem('token'))
            navigate('/');
    }, []);

  return (
    <>
        <main className='App-header'>
            <h1>
                Login to ShowBooker
            </h1>
            <section className='mw-500 text-center px-3'>
                <Form layout="vertical" onFinish={ onFinish }>
                    <Form.Item label="Email" htmlFor='email' name='email' className='d-block' rules={[{ required: true, message: "Email is mandatory"}, { type: 'email', message: "Enter a valid Email"}]}>
                        <Input id='email' type='text' placeholder='Enter your Email'></Input>
                    </Form.Item>
                    <Form.Item label="Password" htmlFor='password' name='password' className='d-block' rules={[{ required: true, message: "Password is mandatory"}]}>
                        <Input id='password' type='password' placeholder='Enter your Password'></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button color='purple' variant='solid' block htmlType="submit" style={{fontSize: "1rem", fontWeight: "600"}}>Login</Button>
                    </Form.Item>
                    <p>
                        New User? <Link to="/register">Register Here!</Link>
                    </p>
                    <p>
                        Forget Password? <Link to="/forget">Click Here</Link>
                    </p>
                </Form>
            </section>
        </main>
    </>
  )
}

export default Login