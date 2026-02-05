// ===== NAVIGATION =====
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get target section
        const targetId = link.getAttribute('href').substring(1);
        
        // Remove active class from all links and sections
        navLinks.forEach(l => l.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked link and corresponding section
        link.classList.add('active');
        document.getElementById(targetId).classList.add('active');
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ===== WRITING FILTERS =====
const filterTags = document.querySelectorAll('.filter-tags .tag');
const postCards = document.querySelectorAll('.post-card');

filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
        const filter = tag.getAttribute('data-filter');
        
        // Update active tag
        filterTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');
        
        // Filter posts
        postCards.forEach(post => {
            const postTags = post.getAttribute('data-tags');
            
            if (filter === 'all' || postTags.includes(filter)) {
                post.classList.remove('hidden');
            } else {
                post.classList.add('hidden');
            }
        });
    });
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    // Get current active section index
    const activeSectionIndex = Array.from(sections).findIndex(s => s.classList.contains('active'));
    
    // Navigate with arrow keys
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (activeSectionIndex + 1) % sections.length;
        navLinks[nextIndex].click();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (activeSectionIndex - 1 + sections.length) % sections.length;
        navLinks[prevIndex].click();
    }
    
    // Home key to go home
    if (e.key === 'Home') {
        e.preventDefault();
        navLinks[0].click();
    }
});

// ===== SCROLL ANIMATIONS (OPTIONAL) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.post-card, .status-item, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== EASTER EGG: CLICK AVATAR =====
const avatar = document.querySelector('.avatar');
let clickCount = 0;

if (avatar) {
    avatar.addEventListener('click', () => {
        clickCount++;
        avatar.style.transform = 'scale(1.1) rotate(5deg)';
        
        setTimeout(() => {
            avatar.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
        
        if (clickCount === 5) {
            avatar.style.backgroundColor = getRandomColor();
            clickCount = 0;
        }
    });
}

function getRandomColor() {
    const colors = ['#8ECAE6', '#AD2831', '#FFB703', '#06FFA5', '#FF6B9D'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ===== SMOOTH REVEAL ON PAGE LOAD =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Set initial opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
