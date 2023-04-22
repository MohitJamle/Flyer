import React, { useState } from 'react';
import './TextEditor.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TextEditor(props) {
    const [Text, setText] = useState(props.edit ? props.Text : '')

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote',],
            [{
                color: [
                    'aqua', 'blue', 'fuchsia', 'gray', 'green', 'lime',
                    'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
                    'silver', 'teal', 'white', 'yellow', '#000000', '#D0021B',
                    '#FE7300', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0',
                    '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#4A4A4A', '#FFFFFF',
                ]
            }],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link'],
            ['clean']
        ],
    }
    // console.log(Text)
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="backdrop" onClick={() => props.onCancel()}>
            </div>
            <div className='textEditor' onClick={() => { }}>
                <div className="textEditorContent">
                    {/* <div className="editorMenuContainer">
                        <ul className='editorMenu'>
                            <li className='editorMenuItem' onClick={() => setBold(!bold)}>B</li>
                            <li className='editorMenuItem'>I</li>
                            <li className='editorMenuItem'>U</li>
                            <li className='editorMenuItem'>S</li>
                            <li className='editorMenuItem' onClick={() => setColorPicker(!colorPicker)}><img className='sidebar_link_icon' src="/Images/textcolor.svg" alt="" /></li>
                        </ul>
                    </div> */}
                    <form onSubmit={(e) => {
                        e.preventDefault()
                    }}>
                        {/* <textarea className='text' value={Text} onChange={e => setText(e.target.value)}></textarea> */}
                        <ReactQuill
                            modules={modules}
                            theme="snow"
                            value={Text}
                            onChange={setText}

                        />
                    </form>
                </div>
                <div className="btnContainer">
                    <button onClick={() => {
                        props.onSubmit({
                            html: props.edit ? `${Text}` : `<div>${Text}</div>`,
                            type: 'text',
                        })
                        props.onCancel()
                    }} className="edrtorBtn">Apply</button>
                    <button onClick={() => props.onCancel()} className="edrtorBtn cancel">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default TextEditor;