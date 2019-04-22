
export const enableMWL = () => {
    return {
        type: "EN_MWL"
    }
};

export const gotoTable = () => {
    return {
        type: "GOTO_TABLE"
    }
};

export const aetitle = (text) => {
    return {
        type: "AETITLE",
        payload: text
    }
}

export const technician = (text) => {
    return {
        type: "TECHNICIAN",
        payload: text
    }
}

export const patselected = () => {
    return {
        type: "PATSELECTED"
    }
}

export const choose = (text) => {
    return {
        type: "PATIENT",
        payload: text
    }
};

export const imgs = (img64) => {
    return {
        type: "IMAGES",
        payload: img64
    }
};