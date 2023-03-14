import React from 'react'
import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client';
import { Typography, Image } from 'antd';
import styles from './styles.module.css'

const { Title } = Typography;

const GET_POST = gql`
query getPost($id:ID!){
  post(id:$id){
    id
    title
    description
    cover
  }
}
`;

function PostDetailScreen() {

  const { id } = useParams()

  const { loading, error, data } = useQuery(GET_POST, {
    variables: {
      id,
    }
  });

  if (loading) {
    return <div>Loading....</div>
  }
  if (error) {
    return <div>Error....</div>
  }
  const { post } = data;

  console.log(data)
  return (
    <div>
      <Title level={3}>{post.title}</Title>
      <Image
      width={'60%'}
        src={post.cover}
      />
      <div className={styles.description} >{post.description}</div>
    </div>
  )
}

export default PostDetailScreen