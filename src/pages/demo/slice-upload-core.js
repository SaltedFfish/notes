function sliceFile(file) {
    let chunkIndex = 0;
    let curSize = 0;
    const fileChunks = [];
    while (curSize < file.size) {
        fileChunks.push({
            chunkIndex: chunkIndex++,
            chunk: file.slice(curSize, curSize + SIZE),
        });
        curSize += SIZE;
    }
}
