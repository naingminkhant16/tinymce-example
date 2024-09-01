import Layout from "../Layout/Layout.jsx";
import {useRef, useState} from "react";
import TinyEditor from "../Components/TinyEditor.jsx";
import {router} from "@inertiajs/react";

export default function Home() {
    const editorRef = useRef(null);
    const [markdownContent, setMarkdownContent] = useState('');
    // const [title, setTitle] = useState('')
    const title = useRef('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Title: ' + title.current.value);
        console.log('Content : ' + markdownContent);

        router.post('/blogs', {
            title: title.current.value,
            content: markdownContent
        }, {
            onSuccess: (page) => {
                console.log("Success");
            },
            onError: (errors) => {
                console.log(errors);
            }
        })
    }
    
    return (
        <Layout title={"Home"}>
            <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="" className={'form-label'}>Title</label>
                    <input type="text" className={'form-control'} ref={title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="" className={'form-lable'}>Content</label>
                    <TinyEditor markdownContent={markdownContent} setMarkdownContent={setMarkdownContent}/>
                </div>
                <input type="submit" value={'Post'} className={'btn btn-primary'}/>
            </form>
        </Layout>
    )
}

