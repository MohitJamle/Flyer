import React, { useEffect, useRef, useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

function ImageCroper({ src, setSrc, closeCroper }) {
    const [image, setImage] = useState(null)
    const [ratio, setRatio] = useState(false)
    const canvasRef = useRef()
    const imageRef = useRef()
    const [completeCrop, setCompleteCrop] = useState(null)
    const [crop, setCrop] = useState({
        unit: '%',
        height: 88,
        width: 30,
        x: 10,
        y: 5,
    })
    console.log(canvasRef)
    useEffect(() => {
        if (!completeCrop || !canvasRef.current || !imageRef.current) return;
        const com_crop = completeCrop;
        const rc_image = imageRef.current;
        const canvas = canvasRef.current;
        const scaleX = rc_image.naturalWidth / rc_image.width;
        const scaleY = rc_image.naturalHeight / rc_image.height;
        const pixelRatio = window.devicePixelRatio;
        const dImageWidth = com_crop.width * scaleX;
        const dImageHeight = com_crop.height * scaleY;
        canvas.width = dImageWidth * pixelRatio;
        canvas.height = dImageHeight * pixelRatio;

        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            ctx.imagesmoothingquality = "large";
            ctx.imagesmoothingenabled = true;
            ctx.drawImage(
                imageRef.current,
                com_crop.x * scaleX,
                com_crop.y * scaleY,
                dImageWidth,
                dImageHeight,
                0, 0,
                dImageWidth,
                dImageHeight
            )
        }

    }, [completeCrop])

    // console.log("Image", image)
    // console.log("crop", crop)
    // console.log("completeCrop", completeCrop)
    return (
        <>
            <div style={{ width: '500px', maxHeight: '500px', position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '100%', height: '100%', bottom: '-50%', zIndex: 999, backgroundImage: 'url(/Images/noBackground.jpeg)' }}>
                    <canvas ref={canvasRef} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
            </div>

            <div aspect={16 / 9} style={{ width: '100%', height: '100%', maxHeight: '500px', border: '1px solid black', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', backgroundColor: '#2d354d', backgroundImage: 'url(/Images/noBackground.jpeg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#fff', boxShadow: '0px 1px 15px 0px #4899db', }}>
                    <div className="closeCroper" onClick={closeCroper}>✗</div>
                    <div className='resize-options'>
                        <div
                            className="a4Ratio ratioContainer"
                            style={{ border: ratio ? '2px dashed #000' : "1px dashed #000", }}
                            onClick={() => setRatio(true)}>
                            4:3 <span className="ratio"></span>
                        </div>
                        <div
                            className="customRatio ratioContainer"
                            style={{ border: ratio ? '1px dashed #000' : "2px dashed #000", }}
                            onClick={() => setRatio(false)}>
                            Custom<span className="ratio"></span>
                        </div>
                    </div>
                    <div className="closeCroper" onClick={() => {
                        closeCroper()
                        setSrc(canvasRef.current.toDataURL())
                    }}>✓</div>
                </div>
                <ReactCrop
                    crop={crop}
                    aspect={ratio && 3 / 4}
                    onComplete={c => setCompleteCrop(c)}
                    onChange={c => setCrop(c)}
                >
                    <img src={src}
                        alt=''
                        style={{ maxHeight: '500px' }}
                        draggable={false}
                        ref={imageRef}
                        onLoad={i => setImage(i)}
                    />
                </ReactCrop>
            </div>
        </>
    )
}

export default ImageCroper;
