export const svgToPng = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const result = await fetch('http://localhost:5000/svgToPng', {
            method: 'POST',
            body: formData,
        });

        const data = await result.json();
        const imageData = data['image'];
        if (!imageData) {
            console.error("got invalid image data back from server");
            return null;
        }
        return imageData;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}