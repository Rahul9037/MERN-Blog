import { useEffect, useState } from "react";
import Post from "../post";

export default function IndexPage(){

    const [posts ,setPosts] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/api/posts')
        .then(resp => resp.json())
        .then(posts => setPosts(posts));
    },[])

    return (
        <>
        { posts && posts?.length >0 && posts.map(post => <Post {...post}/>)}
        { (!posts || posts?.length===0) && <div>Please create a post</div>}
        </>
    )
}