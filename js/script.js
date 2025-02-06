function displayImages() {
    console.log("Fetching images...");
    const gallery = document.getElementById('imageGallery');
    gallery.innerHTML = "";

    db.collection("images").get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.warn("No images found in Firestore.");
            } else {
                snapshot.forEach(doc => {
                    console.log("Found image:", doc.data().imageUrl);
                    const img = document.createElement('img');
                    img.src = doc.data().imageUrl;
                    gallery.appendChild(img);
                });
            }
        })
        .catch(error => console.error("Error fetching images:", error));
}
