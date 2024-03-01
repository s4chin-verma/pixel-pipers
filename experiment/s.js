function convertToCoordinates(rawData) {
    const lines = rawData.trim().split('\n');
    const coordinates = [];
    for (const line of lines) {
        const values = line.trim().split(' ').slice(1).map(parseFloat);
        if (values.length === 4 && values.every(value => !isNaN(value))) {
            const [x, y, width, height] = values;
            coordinates.push({ x, y, width, height });
        } else {
            console.error(`Invalid data: ${line}`);
        }
    }
    return coordinates;
}

const rawData = `
0 0.286392 0.0412234 0.123418 0.0824468
0 0.920886 0.397606 0.0759494 0.125
0 0.962025 0.901596 0.0727848 0.191489
0 0.0996835 0.908245 0.183544 0.167553
0 0.856804 0.401596 0.0933544 0.138298
0 0.84731 0.287234 0.068038 0.106383
0 0.512658 0.043883 0.10443 0.087766
0 0.901899 0.285904 0.0632911 0.103723
0 0.880538 0.921543 0.134494 0.151596
0 0.609177 0.0531915 0.0981013 0.0957447
// Add more lines here...
`;

const coordinates = convertToCoordinates(rawData);
console.log(coordinates);
