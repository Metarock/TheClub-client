export const timeStamp = (timeStamp: string) => {
    const date = new Date(parseInt(timeStamp));
    const currentDate = new Date();

    if (
        date.getDate() !== currentDate.getDate() ||
        date.getMonth() !== currentDate.getMonth() ||
        date.getFullYear() !== currentDate.getFullYear()
    ) {
        return `on ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    }

    const secondDiff = Math.floor((currentDate.getTime() - date.getTime()) / 1000);
    const minuteDiff = Math.floor(secondDiff / 60);
    const hourDiff = Math.floor(minuteDiff / 60);

    return (
        "posted: " + (hourDiff ? `${hourDiff}hr ` : "") +
        (minuteDiff ? `${minuteDiff % 60}min ` : "") +
        (!hourDiff ? `${secondDiff % 60}sec` : "") +
        " ago"
    );
}