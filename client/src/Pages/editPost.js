import { useState,useEffect } from 'react';
import { Navigate, useParams } from "react-router-dom";
import Editor from '../editor';

export default function EditPost(){

    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [files, setFiles] = useState(null);
    const [redirect,setRedirect] = useState(false);
    const { id } = useParams();

    useEffect( () => {
        fetch(`http://localhost:4000/api/post/${id}`)
        .then(resp => resp.json())
        .then(post => {
            setTitle(post.title);
            setSummary(post.summary);
            setContent(post.content);
        });
    },[])

    const updatePost = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('id', id);
        if(files?.[0]){
            data.set('file', files?.[0]);
        }
        data.set('content', content);
        let token = sessionStorage.getItem('accessToken');
        if(token){
            const headers = { 'Authorization': `Bearer ${token}` };
            const response = await fetch('http://localhost:4000/api/post' , {
                method: 'PUT',
                body: data,
                //credentials:'include'
                headers,
            })
            if(response.ok){
                setRedirect(true);
            }
            else{
                setRedirect(false);
            }
        }
        else{
            setRedirect(false);
        }
    }   
    
    if(redirect){
        return <Navigate to={'/post/'+id}/>
    }

    return (
        <form onSubmit={updatePost}>
            <input 
                className='title'
                type="text" 
                placeholder="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input 
                className='summary'
                type="text" 
                placeholder="summary"
                value={summary}
                onChange={e => setSummary(e.target.value)}
            />
            <input type="file" onChange={e => setFiles(e.target.files)}/>
            <Editor value={content} onChange={setContent}/>
            <button style={{marginTop: '10px'}}>Update</button>
        </form>
    )
}