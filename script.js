// ================================================
// APPLE TERMINAL-INSPIRED ASCII PORTFOLIO - JS
// ================================================

// === TERMINAL TYPING ANIMATION ===
// Simulates terminal typing effect
(function initTypingAnimation() {
    const typedTextElement = document.getElementById('typed-text');
    
    const textLines = [
        'creating elegant digital experiences...',
        'designing with precision and clarity...',
        'building with modern web technologies...',
        'hello, I\'m a creative developer.'
    ];
    
    let lineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;
    
    function type() {
        const currentLine = textLines[lineIndex];
        
        if (isDeleting) {
            // Delete character
            typedTextElement.textContent = currentLine.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            // Type character
            typedTextElement.textContent = currentLine.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }
        
        // Check if line is complete
        if (!isDeleting && charIndex === currentLine.length) {
            // Pause before deleting
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next line
            isDeleting = false;
            lineIndex = (lineIndex + 1) % textLines.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing after short delay
    setTimeout(type, 1000);
})();

// === SMOOTH SCROLL FOR NAVIGATION ===
// Smooth scroll to sections with offset for header
(function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offset = 100; // Offset for header
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
})();

// === SCROLL REVEAL ANIMATION ===
// Fade in sections as they enter viewport
(function initScrollReveal() {
    const sections = document.querySelectorAll('.fade-in-section');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
})();

// === PROJECT CARD INTERACTIONS ===
// Add subtle parallax effect to project cards
(function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `
                translateY(-4px)
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
})();

// === WINDOW CONTROLS INTERACTION ===
// Add interaction to macOS window control buttons
(function initWindowControls() {
    const controlRed = document.querySelector('.control-red');
    const controlYellow = document.querySelector('.control-yellow');
    const controlGreen = document.querySelector('.control-green');
    const terminalWindow = document.querySelector('.terminal-window');
    
    // Close button - fade out effect
    controlRed.addEventListener('click', function() {
        terminalWindow.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        terminalWindow.style.opacity = '0';
        terminalWindow.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            terminalWindow.style.opacity = '1';
            terminalWindow.style.transform = 'scale(1)';
        }, 300);
    });
    
    // Minimize button - scale down effect
    controlYellow.addEventListener('click', function() {
        terminalWindow.style.transition = 'transform 0.3s ease';
        terminalWindow.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            terminalWindow.style.transform = 'scale(1)';
        }, 300);
    });
    
    // Maximize button - toggle fullscreen feel
    let isMaximized = false;
    controlGreen.addEventListener('click', function() {
        if (!isMaximized) {
            terminalWindow.style.transition = 'all 0.3s ease';
            terminalWindow.style.maxWidth = '100%';
            terminalWindow.style.margin = '0';
            terminalWindow.style.borderRadius = '0';
            isMaximized = true;
        } else {
            terminalWindow.style.maxWidth = '1400px';
            terminalWindow.style.margin = '2rem auto';
            terminalWindow.style.borderRadius = 'var(--radius-window)';
            isMaximized = false;
        }
    });
})();

// === KEYBOARD SHORTCUTS ===
// Add keyboard navigation (optional enhancement)
(function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // CMD/CTRL + K to focus on navigation
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            const firstNavLink = document.querySelector('.nav-link');
            if (firstNavLink) firstNavLink.focus();
        }
        
        // ESC to scroll to top
        if (e.key === 'Escape') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
})();

// === PERFORMANCE OPTIMIZATION ===
// Throttle function for scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// === DECORATIVE ASCII ANIMATION ===
// Subtle animation for floating ASCII elements
(function initAsciiAnimation() {
    const decoItems = document.querySelectorAll('.deco-item');
    
    decoItems.forEach((item, index) => {
        // Random rotation on scroll
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const rotation = (scrolled * (0.05 + index * 0.01)) % 360;
            item.style.transform = `translateY(${Math.sin(rotation) * 10}px) rotate(${rotation}deg)`;
        }, 50));
    });
})();

// === CONSOLE EASTER EGG ===
// Terminal-style console messages
(function initConsoleMessages() {
    const styles = {
        title: 'font-family: monospace; font-size: 16px; font-weight: bold; color: #111;',
        success: 'font-family: monospace; font-size: 12px; color: #27c93f;',
        info: 'font-family: monospace; font-size: 12px; color: #666;',
        ascii: 'font-family: monospace; font-size: 10px; color: #999; line-height: 1.2;'
    };
    
    console.log('%c$ init portfolio_system', styles.title);
    console.log('%c✓ All modules loaded successfully', styles.success);
    console.log('%c→ System ready', styles.info);
    console.log('%c' + 
        '\n╔════════════════════════════╗' +
        '\n║  ENOSTA // ASCII DESIGN   ║' +
        '\n╚════════════════════════════╝\n', 
        styles.ascii
    );
    console.log('%cTry clicking the colored buttons in the window header! 🎨', styles.info);
})();

// === ACTIVE SECTION HIGHLIGHTING ===
// Highlight current section in navigation
(function initActiveSection() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.style.color = '';
                    link.style.fontWeight = '';
                    
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.style.color = 'var(--color-text)';
                        link.style.fontWeight = '600';
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        if (section.id) {
            observer.observe(section);
        }
    });
})();

// === LINK HOVER SOUND EFFECT (Optional) ===
// Uncomment to add subtle click feedback
/*
(function initLinkFeedback() {
    const links = document.querySelectorAll('a, button');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // You can add a subtle audio feedback here
            // const audio = new Audio('click.mp3');
            // audio.volume = 0.1;
            // audio.play();
        });
    });
})();
*/

// === INITIALIZE COMPLETE ===
console.log('%c$ portfolio_system --status\n✓ All animations initialized\n✓ Scroll observers active\n✓ Interactive elements ready', 
    'font-family: monospace; font-size: 11px; color: #27c93f;'
);
