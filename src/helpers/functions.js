export const convertItems = (items, oldItems) => {
    items.map((item, i) => {
        item.conv = Number(item[0]).toFixed(2).split('.');
        item.convFlag = ['', ''];

        if (oldItems && oldItems[i]) {
            const oldConv = oldItems[i][0].split('.');
            for (let j = 0; j < item.conv.length; j++) {
                item.convFlag[j] = oldConv[j].indexOf(item.conv[j]) == 0 ? 'opacity50' : '';
            }
        }
    });
};