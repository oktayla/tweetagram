async function shareImage(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    const filesArray = [
        new File([blob], 'share-tweet.jpg', {
            type: 'image/jpeg',
            lastModified: new Date().getTime()
        })
    ];
    const shareData = {
        files: filesArray,
    };

    if( navigator.canShare && navigator.canShare({files: filesArray}) ) {
        await navigator.share(shareData);
    }
}

export {
    shareImage
}