import React from 'react'

export const useLocalStorageSpace = () => {
    let data = '';
    const localStorage = window.localStorage

    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            data += localStorage[key]
        }
    }

    // in KB
    const totalSpaceUsed = data?.length ? +((data.length * 16)/(8 * 1024)).toFixed(2) : 0
    const approxSpaceRemaining = data.length ? (5120 - +((data.length * 16)/(8 * 1024)).toFixed(2)) : 5

    return {
        totalSpaceUsed,
        approxSpaceRemaining
    }
}
