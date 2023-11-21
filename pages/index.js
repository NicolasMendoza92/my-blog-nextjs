import Layout from "@/components/Layout";
import PostsGrid from "@/components/PostsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import Post from "@/models/Post";

// TRAIGO LOS PROYECTOS CON GET SERVER SIDE PROPS PARA PODER USARLOS 
export async function getServerSideProps() {
  await mongooseConnect();
  const posts = await Post.find({}, null, { sort: { '_id': -1 } });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    }
  };
}

export default function Home({posts}) {

  return (
    <Layout>
      <PostsGrid posts={posts}/>
    </Layout>
  )
}
