import { useState } from 'react';
import { Navigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

export default function CreatePost(){

    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [files, setFiles] = useState(null);
    const [redirect,setRedirect] = useState(false);

    const createNewPost = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', title);
        data.set('file', files[0]);
        data.set('content', content);

        const response = await fetch('http://localhost:4000/post' , {
            method: 'POST',
            body: data,
            credentials:'include'
        })
        if(response.ok){
            setRedirect(true);
        }
        else{
            setRedirect(false);
        }
    }   
    
    if(redirect){
        return <Navigate to={'/'}/>
    }

    return (
        <form onSubmit={createNewPost}>
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
            <ReactQuill theme="snow" modules={modules} formats={formats} value={content} onChange={setContent}/>
            <button style={{marginTop: '10px'}}>Save</button>
        </form>
    )
}