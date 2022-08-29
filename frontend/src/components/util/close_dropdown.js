import { useState, useEffect } from 'react'

const CloseDropdown = (el, initialState) => {
    const [open, setOpen] = useState(initialState);

    useEffect(() => {
        const pageClickEvent = (e) => {
            if (el.current != null && !el.current.contains(e.target)) {
                setOpen(!open)
            }
        }

        if (open) {
            console.log('click')
            window.addEventListener('click', pageClickEvent)
        }

        return ()  => {
            window.removeEventListener('click', pageClickEvent)
        }
    }, [open, el])

    return [open, setOpen]
}

export default CloseDropdown