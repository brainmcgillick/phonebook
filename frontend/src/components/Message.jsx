const Message = ({ message, messageType }) => {
    const baseStyle = {
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: "5",
        padding: 10,
        marginBottom: 10
    }

    const colorStyle = {
        success: {color: "green"},
        failure: {color: "red"}
    }

    const messageStyle = {
        ...baseStyle,
        ...colorStyle[messageType]
    }

    if (message === null) {
        return null
    }

    return (
        <div style={messageStyle}>
            <em>{message}</em>
        </div>
    )
}

export default Message