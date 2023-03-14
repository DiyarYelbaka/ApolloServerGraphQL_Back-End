import React,{useEffect} from 'react'
import { Avatar, List } from 'antd';
import { useQuery} from '@apollo/client';
import {GET_POST, POST_SUBCRIPTION} from './queries'


import styles from './styles.module.css'



function HomeScreen() {
  const { loading, error, data, subscribeToMore } = useQuery(GET_POST);

  useEffect(()=>{

    subscribeToMore({
      document: POST_SUBCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if(!subscriptionData.data) return prev;
        return {
          posts:[
            subscriptionData.data.postCreated,
            ...prev.posts,
          ]
        }
      }
    })
  },[subscribeToMore])

  if (loading) {
    return <div>Loading....</div>
  }
  if (error) {
    return <div>Error....</div>
  }

  console.log(data)

  return (

    <List
      className="demo-loadmore-list"
      loading={false}
      itemLayout="horizontal"
      //loadMore={loadMore}
      dataSource={data.posts}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            style={{ alignItems: 'center' }}
            avatar={<Avatar src={item.user.profile_photo} />}
            title={<a href={`http://localhost:3000/post/${item.id}`}>{item.title}</a>}
            description={<a href={`http://localhost:3000/post/${item.id}`} className={styles.itemDesc} >{item.sort_description}</a>}
          />
        </List.Item>
      )}
    />

  )
}

export default HomeScreen