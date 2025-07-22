/**
 * Little Silly Goose Cafe - Main JavaScript File
 * Handles navigation, animations, gallery modal, and interactive features
 */

// Performance optimizations
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Optimized smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Optimized Intersection Observer for scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            
            // Handle menu section animations
            if (target.classList.contains('menu-section')) {
                const menuCategories = target.querySelectorAll('.menu-category');
                const menuItems = target.querySelectorAll('.menu-item');
                
                // Use requestAnimationFrame for better performance
                requestAnimationFrame(() => {
                    menuCategories.forEach((category, index) => {
                        setTimeout(() => {
                            category.classList.add('animate');
                        }, index * 200);
                    });
                    
                    setTimeout(() => {
                        menuItems.forEach(item => {
                            item.classList.add('animate');
                        });
                    }, 800);
                });
            }
            
            // Handle gallery section animations
            if (target.classList.contains('gallery-section')) {
                const galleryItems = target.querySelectorAll('.gallery-item');
                requestAnimationFrame(() => {
                    galleryItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 100);
                    });
                });
            }
            
            // Stop observing after animation is triggered
            observer.unobserve(target);
        }
    });
};

const observer = new IntersectionObserver(animateOnScroll, observerOptions);

// Observe sections for animations
document.addEventListener('DOMContentLoaded', () => {
    const menuSection = document.querySelector('.menu-section');
    const gallerySection = document.querySelector('.gallery-section');
    
    if (menuSection) observer.observe(menuSection);
    if (gallerySection) observer.observe(gallerySection);
});

// Gallery Modal Functionality with optimized data structure
const galleryData = {
    interior: [
        { src: 'resources/css/images/burger.jpg', title: 'Delicious Burger', description: 'Our signature beef burger with fresh ingredients' },
        { src: 'resources/css/images/pasta.jpg', title: 'Fresh Pasta', description: 'Homemade pasta with authentic Italian flavors' },
        { src: 'resources/css/images/pizza.jpg', title: 'Wood-Fired Pizza', description: 'Crispy crust pizza baked to perfection' },
        { src: 'resources/css/images/macncheese.jpg', title: 'Creamy Mac & Cheese', description: 'Comfort food at its finest with rich cheese sauce' },
        { src: 'resources/css/images/frenchtoast.jpg', title: 'French Toast Delight', description: 'Golden French toast with maple syrup and fresh berries' },
        { src: 'resources/css/images/chickenwrap.jpg', title: 'Chicken Wrap', description: 'Grilled chicken wrap with fresh vegetables and sauce' },
        { src: 'resources/css/images/salad.jpg', title: 'Fresh Garden Salad', description: 'Crisp lettuce with seasonal vegetables and dressing' },
        { src: 'resources/css/images/toasty.jpg', title: 'Grilled Toasty', description: 'Perfectly toasted sandwich with melted cheese' },
        { src: 'resources/css/images/meusli.jpg', title: 'Healthy Muesli Bowl', description: 'Nutritious muesli with fresh fruits and yogurt' },
        { src: 'resources/css/images/wings.jpg', title: 'Crispy Chicken Wings', description: 'Perfectly seasoned wings with your choice of sauce' }
    ],
    party: [
        { src: 'resources/css/images/birthdayhats.jpg', title: 'Birthday Party Fun', description: 'Colorful birthday celebrations with festive party hats' },
        { src: 'resources/css/images/balloons.jpg', title: 'Party Balloons', description: 'Vibrant balloons that add joy to any celebration' },
        { src: 'resources/css/images/clown.jpg', title: 'Entertainment & Fun', description: 'Professional entertainment to make your party special' },
        { src: 'resources/css/images/outsideparty.jpg', title: 'Outdoor Party Setup', description: 'Beautiful outdoor party arrangements for special occasions' }
    ],
    dessert: [
        { src: 'resources/css/images/doughnut.jpg', title: 'Glazed Doughnut', description: 'Freshly glazed doughnut with perfect sweetness' },
        { src: 'resources/css/images/cake.jpg', title: 'Decadent Cake', description: 'Rich layered cake perfect for any celebration' },
        { src: 'resources/css/images/cupcakes.jpg', title: 'Gourmet Cupcakes', description: 'Delightfully decorated cupcakes in various flavors' },
        { src: 'resources/css/images/strawberry.jpg', title: 'Fresh Strawberry Treats', description: 'Sweet strawberry desserts made with fresh berries' },
        { src: 'resources/css/images/cookie.jpg', title: 'Homemade Cookies', description: 'Fresh baked cookies with love and premium ingredients' }
    ],
    milkshakes: [
        { src: 'resources/css/images/chocmilk.jpg', title: 'Chocolate Milkshake', description: 'Rich and creamy chocolate milkshake topped with whipped cream' },
        { src: 'resources/css/images/caramilk.jpg', title: 'Caramel Milkshake', description: 'Smooth caramel milkshake with sweet caramel drizzle' },
        { src: 'resources/css/images/kkmilk.jpg', title: 'Cookies & Cream Milkshake', description: 'Delicious milkshake blended with crushed cookies' },
        { src: 'resources/css/images/sprinklemilk.jpg', title: 'Rainbow Sprinkle Milkshake', description: 'Fun and colorful milkshake topped with rainbow sprinkles' },
        { src: 'resources/css/images/aimilk.jpg', title: 'AI Special Milkshake', description: 'Our signature specialty milkshake with unique flavors' }
    ],
    coffee: [
        { src: 'resources/css/images/iced.jpg', title: 'Refreshing Iced Coffee', description: 'Cool and invigorating iced coffee perfect for any time of day' },
        { src: 'resources/css/images/coffee.jpg', title: 'Classic Hot Coffee', description: 'Rich and aromatic hot coffee brewed to perfection' },
        { src: 'resources/css/images/coffeecan.jpg', title: 'Specialty Coffee Blend', description: 'Our signature coffee blend with unique flavor notes' },
        { src: 'resources/css/images/foambrew.jpg', title: 'Artisan Foam Brew', description: 'Expertly crafted coffee with beautiful foam art' },
        { src: 'resources/css/images/aiicecoffee.jpg', title: 'AI Iced Coffee Special', description: 'Our premium iced coffee with a special twist' }
    ],
    drinks: [
        { src: 'resources/css/images/eventplan.jpg', title: 'Event Planning', description: 'Professional event planning for all your special occasions' },
        { src: 'resources/css/images/pizzaday.jpg', title: 'Pizza Making Day', description: 'Fun pizza making workshops for kids and families' },
        { src: 'resources/css/images/photoday.jpg', title: 'Photo Day Events', description: 'Capture precious memories at our special photo day events' },
        { src: 'resources/css/images/chefday.jpg', title: 'Little Chef Day', description: 'Kids cooking classes where little ones become master chefs' }
    ]
};

let currentGallery = [];
let currentImageIndex = 0;

// Cache DOM elements for better performance
const modal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const imageCounter = document.getElementById('imageCounter');
const thumbnailsContainer = document.getElementById('modalThumbnails');
const closeModal = document.querySelector('.close-modal');
const prevBtn = document.getElementById('prevImage');
const nextBtn = document.getElementById('nextImage');

// Optimized modal opening with event delegation
document.addEventListener('click', (e) => {
    const galleryItem = e.target.closest('.gallery-item');
    if (galleryItem) {
        const category = galleryItem.getAttribute('data-category');
        const imageSrc = galleryItem.querySelector('.gallery-image').src;
        
        currentGallery = galleryData[category] || [];
        currentImageIndex = currentGallery.findIndex(img => imageSrc.includes(img.src.split('/').pop()));
        
        if (currentImageIndex === -1) currentImageIndex = 0;
        
        openModal(category);
    }
});

/**
 * Opens the gallery modal with the specified category
 * @param {string} category - The gallery category to display
 */
function openModal(category) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    const categoryTitles = {
        interior: "Chef's Art",
        party: 'Fun, fun, fun!',
        food: 'Food & Breakfast',
        dessert: 'Sweet Treats',
        milkshakes: 'Milkshake Collection',
        coffee: 'Coffee Collection',
        drinks: 'We Cater for Kids!'
    };
    
    modalTitle.textContent = categoryTitles[category] || 'Gallery';
    
    updateModalContent();
    createThumbnails();
}

/**
 * Updates the modal content with the current image
 */
function updateModalContent() {
    if (currentGallery.length === 0) return;
    
    const currentImage = currentGallery[currentImageIndex];
    modalImage.src = currentImage.src;
    modalImage.alt = currentImage.title;
    modalDescription.textContent = currentImage.description;
    imageCounter.textContent = `${currentImageIndex + 1} / ${currentGallery.length}`;
    
    // Update navigation buttons
    prevBtn.disabled = currentImageIndex === 0;
    nextBtn.disabled = currentImageIndex === currentGallery.length - 1;
    
    // Update thumbnail active state
    updateThumbnailsActive();
}

/**
 * Creates thumbnail images for the current gallery
 */
function createThumbnails() {
    thumbnailsContainer.innerHTML = '';
    
    currentGallery.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image.src;
        thumbnail.alt = image.title;
        thumbnail.className = 'thumbnail';
        thumbnail.addEventListener('click', () => {
            currentImageIndex = index;
            updateModalContent();
        });
        
        thumbnailsContainer.appendChild(thumbnail);
    });
    
    updateThumbnailsActive();
}

/**
 * Updates the active state of thumbnail images
 */
function updateThumbnailsActive() {
    const thumbnails = thumbnailsContainer.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// Modal navigation event listeners
prevBtn.addEventListener('click', () => {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateModalContent();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentImageIndex < currentGallery.length - 1) {
        currentImageIndex++;
        updateModalContent();
    }
});

/**
 * Closes the gallery modal and restores page scroll
 */
function closeGalleryModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal event listeners
closeModal.addEventListener('click', closeGalleryModal);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeGalleryModal();
    }
});

// Keyboard navigation for modal
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        switch(e.key) {
            case 'Escape':
                closeGalleryModal();
                break;
            case 'ArrowLeft':
                if (currentImageIndex > 0) {
                    currentImageIndex--;
                    updateModalContent();
                }
                break;
            case 'ArrowRight':
                if (currentImageIndex < currentGallery.length - 1) {
                    currentImageIndex++;
                    updateModalContent();
                }
                break;
        }
    }
});

// Touch/Swipe functionality for mobile devices
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;
const minSwipeDistance = 50; // Minimum distance for a swipe to be detected

// Handle touch start
modal.addEventListener('touchstart', (e) => {
    if (modal.style.display === 'block') {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }
}, { passive: true });

// Handle touch end and determine swipe direction
modal.addEventListener('touchend', (e) => {
    if (modal.style.display === 'block') {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipeGesture();
    }
}, { passive: true });

/**
 * Handles swipe gestures for modal navigation
 */
function handleSwipeGesture() {
    const horizontalDistance = touchEndX - touchStartX;
    const verticalDistance = Math.abs(touchEndY - touchStartY);
    
    // Only process horizontal swipes (ignore vertical scrolling)
    if (Math.abs(horizontalDistance) > minSwipeDistance && Math.abs(horizontalDistance) > verticalDistance) {
        if (horizontalDistance > 0) {
            // Swiped right - go to previous image
            if (currentImageIndex > 0) {
                currentImageIndex--;
                updateModalContent();
            }
        } else {
            // Swiped left - go to next image
            if (currentImageIndex < currentGallery.length - 1) {
                currentImageIndex++;
                updateModalContent();
            }
        }
    }
}
