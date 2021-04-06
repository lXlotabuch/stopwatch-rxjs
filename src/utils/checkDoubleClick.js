const checkClick = () => {
    let click = false
    return () => {
        if (!click) {
            click = true
            setTimeout(() => click = false, 300)
        } else return click
        return false
    }
}

const checkDoubleClick = checkClick()

export default checkDoubleClick