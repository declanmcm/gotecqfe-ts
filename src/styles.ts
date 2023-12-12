import React from "react";

const styles: Record<string, React.CSSProperties> = {
    containerStyle : {
        display: 'flex',
        flexDirection: 'row'
    },

    buttonContainerStyle : {
        display: 'flex', 
        justifyContent: 'space-around', 
        paddingLeft: 810, 
        paddingRight: 810
    },

    headContStyle: {
        display: 'flex',
        justifyContent: 'space-between'
    },

    headingStyle : {
        textAlign: 'center', 
        fontFamily: 'Helvetica, sans-serif', 
        fontStyle: 'oblique', 
        color: 'black', 
        fontSize: '68px'
    },

    headingStyleApp : {
        textAlign: 'center', 
        fontFamily: 'Helvetica, sans-serif', 
        color: 'white', 
        paddingTop: 400, 
        fontSize: '76px'
    },

    headingStyleProblem : {
        textAlign: 'center', 
        fontFamily: 'Helvetica, sans-serif', 
        color: 'white',  
        fontSize: '76px',
        paddingTop: 450
    },

    buttonStyle : {
        backgroundColor: '#80a1e8',
        color: 'white',
        padding: 10,
        margin: 10,
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    },

    buttonStyleApp : {
        fontSize: '30px',
        backgroundColor: '#80a1e8',
        color: 'black',
        fontFamily: 'Helvetica',
        borderRadius: 8,
        padding: 8
    },

    smallButton : {
        fontSize: '15px',
        backgroundColor: '#80a1e8',
        color: 'black',
        fontFamily: 'Helvetica',
        borderRadius: 4,
        padding: 4
    },

    smallButtonActive: {
        fontSize: '15px',
        backgroundColor: '#2424c7',
        color: 'white',
        fontFamily: 'Helvetica',
        borderRadius: 4,
        padding: 4
    },

    itemStyle : {
        flex: 1,
        textAlign: 'center',
        fontSize: '32px',
        borderStyle: 'solid',
        borderColor: 'grey',
        borderRadius: 10,
        margin: 15
    },

    formStyle : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '300px',
        margin: 'auto',
        marginTop: '50px',
        fontSize: '24px'
    },

    formStyleProblem: {
        display: 'block',
        flexDirection: 'column',
        fontFamily: 'Helvetica, sans-serif', 
        color: '#4f4e4e',
        alignItems: 'left',
        width: '65%',
        margin: 'auto',
        marginTop: '50px',
        fontSize: '24px',
        borderRadius: 10
    },

    inputStyle : {
        margin: '8px',
        padding: '10px',
        width: '100%',
        boxSizing: 'border-box'
    },

    pageStyle : {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerAuthStyle : {
        width: '20%',
        height: '500px',
        backgroundColor: '#e5f2dc',
        padding: '20px',
    }
}

export default styles;