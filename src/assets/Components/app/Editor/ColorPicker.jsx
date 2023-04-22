import React from 'react'
import { SketchPicker } from 'react-color'

function ColorPicker({ color, setColor, onClose, style }) {

    const styles = {
        container: style ? {
            position: 'absolute',
            zIndex: 25,
            left: '15%',
            top: '15%',
            width: '100%',
            maxWidth: '220px',
            backgroundColor: '#fff',
            padding: '20px',
            ...style,
        } : {
            position: 'absolute',
            zIndex: 25,
            left: '15%',
            top: '15%',
            width: '100%',
            maxWidth: '220px',
            backgroundColor: '#fff',
            padding: '20px'
        },
        close: {
            position: 'absolute',
            right: '5px',
            top: '-10px',
            fontSize: '25px',
            cursor: 'pointer',
        }
    }
    return (
        <div style={styles.container}>
            <div className="close" style={styles.close} onClick={onClose ? onClose : () => { }}>x</div>
            <SketchPicker color={color ? color : '#000'} onChange={(c) => setColor(c.hex)} />
        </div>
    )
}

export default ColorPicker;
