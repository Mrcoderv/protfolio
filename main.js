// Mouse cursor animation
const cursor = document.getElementById('cursor');

// Update cursor position based on mouse movement
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Adjust the size of the cursor when hovering over links
const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('mouseover', () => {
        cursor.style.transform = 'scale(1.5)'; // Scale up
    });
    link.addEventListener('mouseout', () => {
        cursor.style.transform = 'scale(1)'; // Scale back
    });
});

// Smooth scrolling functionality for the "Know More" button
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
