// Fetch and display images from Firestore
function displayImages() {
    const gallery = document.getElementById('imageGallery');
    gallery.innerHTML = "";

    db.collection("images").get().then(snapshot => {
        snapshot.forEach(doc => {
            const img = document.createElement('img');
            img.src = doc.data().imageUrl;
            gallery.appendChild(img);
        });
    }).catch(error => console.error("Error fetching images:", error));
}

// Load images on page load
window.onload = displayImages;
