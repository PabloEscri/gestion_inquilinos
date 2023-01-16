import './AddDeviceForm.scss'

function AddDeviceForm(props) {
    const { setIsVisibleModal} = props;

    return(
        <div>
            <h1>New Device</h1>
            <h2>Choose a way to create new device</h2>
            <ul className='possibilities'>
                <li className='possib'>From template</li>
                <li className='possib'>Scan QR Code</li>
                <li className='possib'>Manual entry</li>
            </ul>
            <button onClick={() => setIsVisibleModal(false)}>Cancel</button>
        </div>
    )
}

export default AddDeviceForm