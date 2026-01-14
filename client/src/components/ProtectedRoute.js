import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { LogoutOutlined, ProfileOutlined, UserOutlined} from "@ant-design/icons";
import { useEffect } from 'react';
import { GetCurrentUser } from '../api/users';
import { SetUser } from '../redux/userSlice';
import { message, Layout, Menu } from 'antd';
import { ShowLoading, HideLoading } from '../redux/loaderSlice';

function ProtectedRoute({ children }) {

    const { user } = useSelector( state => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const navItems = [
        {
            key: "1",
            label: <span style={{ color: "white" }}>{ user ? user.name : "Guest" }</span>,
            icon: <UserOutlined style={{ color: "white" }}></UserOutlined>,
            children: [
                {
                    label: <span onClick={
                        () => {
                            if(user.role === 'admin')
                                navigate("/admin");
                            else if(user.role === 'partner')
                                navigate('/partner');
                            else
                                navigate('/profile');
                        }
                    } >My Profile</span>,
                    icon: <ProfileOutlined></ProfileOutlined>
                },
                {
                    label: <span><Link to={ "/login" } onClick={ () => { localStorage.removeItem("token"); }}>Logout</Link></span>,
                    icon: <LogoutOutlined></LogoutOutlined>
                }
            ]
        },

    ];

    useEffect(() => {
        const getValidUser = async () => {
            try {
                dispatch(ShowLoading()); //Loading -> true
                const response = await GetCurrentUser();
                console.log(response);
                dispatch(SetUser(response.data));
                dispatch(HideLoading()); //Loading -> false
            } catch (error) {
                dispatch(HideLoading());
                console.log(error);
                message.error(error.message);
            }
        };

        if(localStorage.getItem("token")) 
        {
            getValidUser();
        }
        else 
        {
            navigate("/login");
            localStorage.removeItem('token');
        }
    }, []);

    const { Header } = Layout;

  return (
    user && 
    <>
        <Layout>
            <Header className='d-flex justify-content-between' style={ { 
                position: "sticky",
                top: 0,
                width: "100%",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                backgroundColor: "purple"
             } }>
                <h3 className='text-white' style={ { color: "white" }} onClick={ () => { navigate("/"); } }>ShowBooker</h3>
                <Menu theme='light' mode="horizontal" items={ navItems } style={ { backgroundColor: "purple" }}></Menu>
            </Header>
            <div style={ { padding: "24px", minHeight: "380px", background: "white"} }>
                { children }
            </div>
        </Layout>
    </>
  )
}

export default ProtectedRoute