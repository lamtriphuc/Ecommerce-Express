export const convertPrice = (price) => {
    try {
        const result = price.toLocaleString().replaceAll(',', '.')
        return `${result} VNĐ`
    } catch (error) {
        return null
    }
}

export const formattedDate = (fiveDaysLater) => {
    return `${fiveDaysLater.getDate().toString().padStart(2, '0')}/${(fiveDaysLater.getMonth() + 1).toString().padStart(2, '0')}/${fiveDaysLater.getFullYear()}`;
};