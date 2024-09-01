import Layout from "../Layout/Layout.jsx";

export default function View({blog}) {
    return (
        <Layout>
            <h1 className={'text-center'}>{blog.title}</h1>
            <div dangerouslySetInnerHTML={{__html: blog.content}}>
            </div>
        </Layout>
    )
}

