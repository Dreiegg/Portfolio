document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');

    // Navigation Link Functionality
    document.querySelectorAll('.top-bar a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const href = this.getAttribute('href');
            const targetId = href.startsWith('#') ? href.substring(1) : null;

            if (targetId === 'about-me' || targetId === 'contact') {
                window.location.href = `index.html#${targetId}`;
            } else {
                window.location.href = href;
            }
        });
    });

    // Hover Effect Functionality
    const leftHitbox = document.querySelector('.hitbox-left');
    const rightHitbox = document.querySelector('.hitbox-right');
    const leftEnterHitbox = document.querySelector('.mouseenter-left');
    const rightEnterHitbox = document.querySelector('.mouseenter-right');
    const centerImages = {
        default: document.getElementById('image-center'),
        left: document.getElementById('image-center-L'),
        right: document.getElementById('image-center-R')
    };

    if (leftHitbox && rightHitbox && centerImages.default && centerImages.left && centerImages.right) {
        leftEnterHitbox.addEventListener('mouseenter', function () {
            rightHitbox.style.backgroundColor = "rgba(20, 20, 22, 0.8)";
            centerImages.default.style.opacity = 0;
            centerImages.left.style.opacity = 1;
        });

        leftEnterHitbox.addEventListener('mouseleave', function () {
            rightHitbox.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
            centerImages.default.style.opacity = 1;
            centerImages.left.style.opacity = 0;
        });

        rightEnterHitbox.addEventListener('mouseenter', function () {
            leftHitbox.style.backgroundColor = "rgba(20, 20, 22, 0.8)";
            centerImages.default.style.opacity = 0;
            centerImages.right.style.opacity = 1;
        });

        rightEnterHitbox.addEventListener('mouseleave', function () {
            leftHitbox.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
            centerImages.default.style.opacity = 1;
            centerImages.right.style.opacity = 0;
        });
    } else {
        console.error('Hover effect elements not found');
    }

    // "Read More" Toggle Functionality
    document.querySelectorAll(".read-more-btn").forEach(button => {
        button.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");
            toggleText(targetId, this);
        });
    });

    function toggleText(targetId, button) {
        const moreText = document.getElementById(targetId);
        const mainText = moreText.previousElementSibling;

        if (moreText.style.display === "none" || moreText.style.display === "") {
            moreText.style.display = "block";
            button.textContent = "Read Less";
            mainText.classList.remove('gradient-text');
            mainText.classList.add('no-gradient');
        } else {
            moreText.style.display = "none";
            button.textContent = "Read More";
            mainText.classList.remove('no-gradient');
            mainText.classList.add('gradient-text');
        }
    }

    // Modal Gallery Implementation
    const galleryImages = document.querySelectorAll('.gallery-img');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-image');
    const captionText = document.getElementById('modal-caption');
    const closeModalBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentIndex = 0;

    // Open Modal Function
    function openModal(index) {
        modal.style.display = 'flex';
        modalImg.src = galleryImages[index].src;
        captionText.innerText = galleryImages[index].alt || `Image ${index + 1}`;
        currentIndex = index;
    }

    // Close Modal Function
    function closeModal() {
        modal.style.display = 'none';
    }

    // Show Image in Modal based on Index
    function showImage(index) {
        if (index >= galleryImages.length) currentIndex = 0;
        if (index < 0) currentIndex = galleryImages.length - 1;
        modalImg.src = galleryImages[currentIndex].src;
        // captionText.innerText = galleryImages[currentIndex].alt || `Image ${currentIndex + 1}`;
    }

    // Add click event to each gallery image to open modal
    galleryImages.forEach((image, index) => {
        image.addEventListener('click', () => openModal(index));
    });

    // Modal Navigation Controls
    prevBtn.addEventListener('click', () => {
        currentIndex -= 1;
        showImage(currentIndex);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft')
        {
            currentIndex -= 1;
            showImage(currentIndex);
        }
    });


    nextBtn.addEventListener('click', () => {
        currentIndex += 1;
        showImage(currentIndex);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight')
        {
            currentIndex += 1;
            showImage(currentIndex);
        }
    });

    // Close Modal Events
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeModal();
    });
});
