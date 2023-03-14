import React, { useState }  from 'react'
import { Menu } from 'antd';
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom';



function CustomHeaderMenu() {
    const navigate = useNavigate();
    const [current, setCurrent] = useState('mail');

    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        navigate(e.key)
      };

    const items = [
        {
          label: 'Home',
          key: '/',
        },
        {
          label: 'New Post',
          key: '/new',
        },
      ];

  return (
    <div>
     <Menu className={styles.headerMenu}  onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    </div>
  )
}

export default CustomHeaderMenu