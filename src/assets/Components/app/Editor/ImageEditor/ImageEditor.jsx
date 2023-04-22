import React, { useRef, useState } from 'react'
import ImageCroper from './ImageCroper'
import './ImageEditor.css'

function ImageEditor(props) {
    const [selectedImage, setSelectedImage] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)
    const [oppenImageCropper, setOppenImageCropper] = useState(false)
    const images = [
        {
            id: 1,
            url: '/showImages/bike.png',
        },
        {
            id: 2,
            url: '/showImages/blue-sun.png',
        },
        {
            id: 3,
            url: '/showImages/butterfly.png',
        },
        {
            id: 4,
            url: '/showImages/car.webp',
        },
        {
            id: 5,
            url: '/showImages/wings.png',
        },
        {
            id: 6,
            url: '/showImages/Winner.png',
        },
    ]

    const getFile = (e) => {
        if (!e.target.files || e.target.files.length == 0) {
            setSelectedImage(null)
            return;
        }
        const objectUrl = URL.createObjectURL(e.target.files[0])
        setCroppedImage(null)
        setSelectedImage(objectUrl)
    }

    const ImageSelector = () => (<div className={`addImageInputContainer ${selectedImage && 'active'}`}>
        <input onChange={getFile} type="file" accept="image/*" />
        <div className="addBtn">+</div>
    </div>)
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="backdrop"></div>
            <div className='ImageEditor'>
                <div style={{ position: 'absolute', top: 0, right: '30%', cursor: 'pointer', fontSize: '50px', color: '#fff' }} onClick={props.onCancel}>x</div>
                <div className="image_editor_container">
                    <div className="image_editor_menu">
                        <div className="image_editor_link" onClick={() => {
                            if (!selectedImage) return;
                            let sel = croppedImage ? (croppedImage ? croppedImage : props.paperBackground) : (selectedImage ? selectedImage : props.paperBackground);
                            props.setpaperBackground(sel)
                            props.onCancel()
                        }}>
                            <img className='sidebar_link_icon' src="/Images/image.svg" alt="" />Use as BG
                        </div>
                        <div className="image_editor_link" onClick={() => {
                            if (!selectedImage) return;
                            props.onCancel()
                            props.onSubmit({
                                element: 'img',
                                html: <img src={croppedImage ? croppedImage : selectedImage} alt="" width={'100%'} height={'100%'} draggable={false} />,
                                url: croppedImage ? croppedImage : selectedImage,
                                type: 'Image',
                            })
                        }}> <img className='sidebar_link_icon' src="/Images/reseat.svg" alt="" />Use Orignal</div>
                    </div>
                    <div className="showBox">
                        {selectedImage ? (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                <div className="editIcon" onClick={() => setOppenImageCropper(!oppenImageCropper)}>
                                    <img src="/Icons/edit.png" alt="" />
                                </div>
                                {oppenImageCropper ? (
                                    <div className="popup">
                                        <ImageCroper src={selectedImage} closeCroper={() => setOppenImageCropper(false)} setSrc={setCroppedImage} />
                                    </div>
                                ) :
                                    <>
                                        {croppedImage ? (
                                            <img src={croppedImage} draggable={false} className='selectedImage' alt="" />
                                        ) : (
                                            <img src={selectedImage} draggable={false} className='selectedImage' alt="" />
                                        )}
                                    </>
                                }

                            </div>
                        ) : <ImageSelector />}
                    </div>
                    <div className="allImages">
                        {images.map((im, key) => {
                            return <img key={key} src={im.url} onClick={() => {
                                setCroppedImage(null)
                                setSelectedImage(im.url)
                            }} className="allImage" alt="" />
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageEditor