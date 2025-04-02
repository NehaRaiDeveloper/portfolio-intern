// Firebase Firestore Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCtwd1MGxuA5rIzUP-UJNsWnwj5_BCUUhY",
    authDomain: "my-app-c8278.firebaseapp.com",
    projectId: "my-app-c8278",
    storageBucket: "my-app-c8278.firebasestorage.app",
    messagingSenderId: "953262250163",
    appId: "1:953262250163:web:6b8907d6c804ea133d38c6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        // 1️⃣ Get Form Data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // 2️⃣ Basic Validation
        if (!name || !email || !message) {
            alert('⚠ Please fill in all required fields.');
            return;
        }

        try {
            // 3️⃣ Firestore me Data Save karein
            const docRef = await db.collection('messages').add({
                name: name,
                email: email,
                subject: subject,
                message: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp() // Date & Time
            });

            console.log("✅ Message stored in Firestore with ID:", docRef.id);
            alert('🎉 Your message has been sent successfully!');

            // 🔄 Form Reset
            contactForm.reset();
        } catch (error) {
            console.error('❌ Error saving message:', error);
            alert('⚠ An error occurred while sending the message.');
        }
    });
}



const themeToggle = document.getElementById("theme-toggle");
const icon = themeToggle.querySelector("i");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.scroll-reveal').forEach(element => {
        observer.observe(element);
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-nav");
    const closeMenu = document.querySelector(".times");
    const menuLinks = document.querySelectorAll(".mobile-nav ul li a"); // Menu items

    // Show Menu on Hamburger Click
    hamburger.addEventListener("click", function () {
        mobileMenu.classList.add("open");
    });

    // Hide Menu on Close Button Click
    closeMenu.addEventListener("click", function () {
        mobileMenu.classList.remove("open");
    });

    // Hide Menu When Clicking Outside the Menu
    document.addEventListener("click", function (event) {
        if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) {
            mobileMenu.classList.remove("open");
        }
    });

    // Hide Menu When Clicking on Any Menu Item
    menuLinks.forEach(link => {
        link.addEventListener("click", function () {
            mobileMenu.classList.remove("open");
        });
    });
});

