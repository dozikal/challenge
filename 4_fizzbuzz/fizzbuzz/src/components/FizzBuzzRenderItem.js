import React from "react";

export default function FizzBuzzRenderItem(item, key) {
    return (
        <div key={key} style={styles.container}>
            {item}
        </div>
    )
}

const styles={
    container:{
        width: '10%'
    }
}