import {Editor} from '@tinymce/tinymce-react';
import {useState} from "react";

const TinyEditor = ({markdownContent, setMarkdownContent}) => {
    const apiKey = import.meta.env.VITE_TINYMCE_API_KEY;

    const handleEditorChange = (content, editor) => {
        setMarkdownContent(content);
    };

    const filePickerCallback = (cb, value, meta) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');

        input.onchange = function () {
            const file = this.files[0];
            const reader = new FileReader();

            reader.onload = function () {
                const id = 'blobid' + (new Date()).getTime();
                const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                const base64 = reader.result.split(',')[1];
                const blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                // Upload the image
                const formData = new FormData();
                formData.append('image', file);
                formData.append('_token', document.querySelector('meta[name="csrf-token"]').getAttribute('content')); // Add CSRF token

                axios.post('/upload', formData)
                    .then(response => {
                        cb(blobInfo.blobUri(), {title: file.name});
                    })
                    .catch(error => {
                        console.error('Image upload failed:', error);
                    });
            };
            reader.readAsDataURL(file);
        };
        input.click();
    };

    return (
        <Editor
            apiKey={apiKey}
            // onInit={(_evt, editor) => editorRef.current = editor}
            // initialValue={markdownContent}
            init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                image_title: true,
                automatic_uploads: true,
                images_upload_url: '/upload',
                file_picker_types: 'image',
                file_picker_callback: filePickerCallback,
                setup: (editor) => {
                    editor.on('init change', () => {
                        editor.save();
                    });
                }
            }}
            onEditorChange={handleEditorChange}
        />
    );
};

export default TinyEditor;
