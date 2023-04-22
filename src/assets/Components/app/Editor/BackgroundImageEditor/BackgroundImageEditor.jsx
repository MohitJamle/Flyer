import React from 'react'
import './BackgroundImageEditor.css'

function BackgroundImageEditor(props) {
    const backgrounds = [
        {
            id: 1,
            url: 'https://i.pinimg.com/originals/99/ca/43/99ca43783e0e5163db7a868583165980.jpg',
        },
        {
            id: 2,
            url: 'https://previews.123rf.com/images/cougarsan/cougarsan1602/cougarsan160200047/52255497-a3-and-a4-size-beige-classic-flower-pattern-wallpaper-background.jpg',
        },
        {
            id: 3,
            url: 'https://st2.depositphotos.com/5477854/8143/i/450/depositphotos_81438276-stock-photo-blue-border-a4-size-certificate.jpg',
        },
        {
            id: 4,
            url: 'https://i.pinimg.com/originals/c9/21/92/c921924d77b119c41ca5fd6a4aee49fc.jpg',
        },
        {
            id: 5,
            url: 'https://media.istockphoto.com/id/1326233440/vector/frame-of-umbrellas-fitted-to-a4-card-different-sizes-umbrella-frame-in-autumn-colours-orange.jpg?b=1&s=170667a&w=0&k=20&c=m2n2gcxx8B5ZMi7S5-8fijQMfieS5BVPF4KEqO2ujYA=',
        },
    ]
    return (
        <>
            <div className="ImageEditorContent">
                <div className="editorContent">
                    <div>
                    </div>
                    <div>
                        <div className="closeBtn" onClick={props.onCancel}>x</div>
                        <div className='editor_image_box'>
                            {backgrounds.map((ele) => <img src={ele.url} key={ele.id} className='editorImage' alt="" onClick={() => {
                                // props.onCancel()
                                props.setpaperBackground(ele.url)
                            }
                            }
                            />)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BackgroundImageEditor