export const parentDiv = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            staggerChildren: 0.5
        }
    }
}

export const childNav = {
    hidden: {
        opacity: 0,
        x: 50
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 3, type: 'spring', stiffness: 50
        }
    }
}

export const childeDiv = {
    hidden: {
        opacity: 0,
        y: 50
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 3, type: 'spring', stiffness: 50
        }
    }
}