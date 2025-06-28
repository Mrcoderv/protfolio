// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        mirror: false
    });

    // Navigation menu toggle for mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Activate nav links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('.nav-links a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    });

    // Animate skill progress bars
    const progressBars = document.querySelectorAll('.progress');
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    };
    
    // Trigger progress bar animation when skills section is in view
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(skillsSection);
    }

    // GitHub language chart
    const renderGitHubChart = () => {
        const ctx = document.getElementById('languageChart');
        if (ctx) {
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Java', 'JavaScript', 'HTML', 'CSS', 'Python', 'C'],
                    datasets: [{
                        data: [40, 25, 15, 10, 7, 3],
                        backgroundColor: [
                            '#f7df1e', // JavaScript
                            '#e34c26', // HTML
                            '#563d7c', // CSS
                            '#3572A5', // Python
                            '#A97BFF', // C
                            '#b07219'  // Java
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                color: '#f0f0f0',
                                font: {
                                    size: 14
                                },
                                padding: 20
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(10, 10, 10, 0.8)',
                            titleColor: '#00c8ff',
                            bodyColor: '#f0f0f0',
                            bodyFont: {
                                size: 14
                            },
                            padding: 15,
                            displayColors: true,
                            borderColor: '#222',
                            borderWidth: 1
                        }
                    },
                    cutout: '65%',
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    }
                }
            });
        }
    };
    
    // Initialize GitHub chart when the page loads
    renderGitHubChart();

    // Project filtering
    const filterProjects = () => {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (filterBtns.length > 0) {
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    
                    // Add active class to clicked button
                    btn.classList.add('active');
                    
                    const filter = btn.getAttribute('data-filter');
                    
                    // Show/hide projects based on filter
                    projectCards.forEach(card => {
                        if (filter === 'all') {
                            card.style.display = 'block';
                        } else {
                            if (card.classList.contains(filter)) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        }
                    });
                });
            });
        }
    };
    
    // Initialize project filtering
    filterProjects();

    // Contact form validation and submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.querySelector('.form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || subject === '' || message === '') {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission (in a real scenario, you would send data to a server)
            showFormMessage('Your message has been sent successfully!', 'success');
            contactForm.reset();
            
            // In a real implementation, you would use fetch or XMLHttpRequest to send the form data
        });
    }
    
    // Function to show form submission messages
    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.style.display = 'block';
        
        if (type === 'success') {
            formMessage.className = 'form-message success-message';
        } else {
            formMessage.className = 'form-message error-message';
        }
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }

    // Typing animation for hero section
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const phrases = ['Raghav Vian Panthi', 'a Developer', 'a BCA Student', 'a Problem Solver'];
        let currentPhrase = 0;
        let currentChar = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeText() {
            const phrase = phrases[currentPhrase];
            
            if (isDeleting) {
                typingElement.textContent = phrase.substring(0, currentChar - 1);
                currentChar--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = phrase.substring(0, currentChar + 1);
                currentChar++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && currentChar === phrase.length) {
                isDeleting = true;
                typingSpeed = 1000; // Pause at the end of typing
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentPhrase = (currentPhrase + 1) % phrases.length;
                typingSpeed = 500; // Pause before typing next phrase
            }
            
            setTimeout(typeText, typingSpeed);
        }
        
        // Start typing animation
        setTimeout(typeText, 1000);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Load projects dynamically from CV data
    function loadProjectsFromCV() {
        // This function would typically fetch project data from a JSON file or API
        // For now, we'll use hardcoded data based on the CV
        const projects = [
            {
                title: "JavaFX Ball Shot Game",
                description: "Developed an interactive 2D Ball Shooting Game using JavaFX. Implemented game mechanics, physics, and UI elements to create an engaging experience.",
                image: "assets/project1.jpg",
                technologies: ["Java", "JavaFX", "Game Development"],
                github: "https://github.com/Mrcoderv/JavaFXprojects/blob/main/JAVAFXExample/src/main/java/org/example/javafxdemo/GameOn.java",
                demo: "",
                category: "java"
            },
            {
                title: "Guess Game (IntelliJ)",
                description: "Built a number guessing game (1-100) in JavaFX using IntelliJ, incorporating logic for random number generation and user interaction.",
                image: "assets/Project2.jpg",
                technologies: ["Java", "JavaFX", "IntelliJ"],
                github: "https://github.com/Mrcoderv/JavaFXprojects/blob/main/JAVAFXExample/src/main/java/org/example/javafxdemo/GuessGame.java",
                demo: "",
                category: "java"
            },
            {
                title: "Personal Portfolio Website",
                description: "Designed and developed a responsive personal portfolio website using HTML, CSS, and JavaScript to showcase projects and skills.",
                image: "assets/Project3.jpg",
                technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
                github: "https://github.com/Mrcoderv/protfolio",
                demo: "https://mrcoderv.github.io/protfolio/",
                category: "web"
            },
            {
                title: "Data Analysis Project",
                description: "Conducted data analysis on a dataset using Python libraries like Pandas, NumPy, and Matplotlib to extract insights and create visualizations.",
                image: "assets/Project4.jpg",
                technologies: ["Python", "Pandas", "NumPy", "Matplotlib"],
                github: "https://github.com/Mrcoderv/data-analysis",
                demo: "",
                category: "data"
            }
        ];
        
        // Get the projects container
        const projectsContainer = document.getElementById('projects-container');
        if (!projectsContainer) return;
        
        // Clear existing projects
        projectsContainer.innerHTML = '';
        
        // Add projects to the container
        projects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = `project-card ${project.category}`;
            projectCard.setAttribute('data-aos', 'fade-up');
            projectCard.setAttribute('data-aos-delay', (index + 1) * 100);
            
            let demoButton = '';
            if (project.demo) {
                demoButton = `<a href="${project.demo}" target="_blank" class="btn small-btn"><i class="fas fa-external-link-alt"></i> Demo</a>`;
            }
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.github}" target="_blank" class="btn small-btn"><i class="fab fa-github"></i> GitHub</a>
                        ${demoButton}
                        <a href="pages/project-details.html?id=${index}" class="btn small-btn"><i class="fas fa-info-circle"></i> Details</a>
                    </div>
                </div>
            `;
            
            projectsContainer.appendChild(projectCard);
        });
    }
    
    // Load projects when on the main page
    if (document.getElementById('projects-container')) {
        loadProjectsFromCV();
    }

    // Handle project details page
    function loadProjectDetails() {
        const projectDetailsContainer = document.getElementById('project-details-container');
        if (!projectDetailsContainer) return;
        
        // Get project ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const projectId = urlParams.get('id');
        
        if (projectId === null) {
            projectDetailsContainer.innerHTML = '<div class="error-message">Project not found</div>';
            return;
        }
        
        // This would typically fetch project data from a JSON file or API
        // For now, we'll use the same hardcoded data as in loadProjectsFromCV
        const projects = [
            {
                title: "JavaFX Ball Shot Game",
                description: "Developed an interactive 2D Ball Shooting Game using JavaFX. Implemented game mechanics, physics, and UI elements to create an engaging experience.",
                image: "../assets/project1.jpg",
                technologies: ["Java", "JavaFX", "Game Development"],
                github: "https://github.com/Mrcoderv/JavaFXprojects/blob/main/JAVAFXExample/src/main/java/org/example/javafxdemo/GameOn.java",
                demo: "",
                category: "java",
                date: "March 2023",
                client: "University Project",
                longDescription: "This JavaFX Ball Shot Game was developed as part of my university coursework to demonstrate object-oriented programming concepts and GUI development skills. The game features a player-controlled cannon that shoots balls at moving targets. Points are awarded for hitting targets, and the game includes multiple levels with increasing difficulty. I implemented collision detection, score tracking, and game state management to create a complete gaming experience.",
                features: [
                    "Player-controlled cannon with adjustable angle and power",
                    "Moving targets with different speeds and patterns",
                    "Score tracking and high score system",
                    "Multiple game levels with increasing difficulty",
                    "Sound effects and visual feedback",
                    "Pause/resume functionality"
                ]
            },
            {
                title: "Guess Game (IntelliJ)",
                description: "Built a number guessing game (1-100) in JavaFX using IntelliJ, incorporating logic for random number generation and user interaction.",
                image: "../assets/Project2.jpg",
                technologies: ["Java", "JavaFX", "IntelliJ"],
                github: "https://github.com/Mrcoderv/JavaFXprojects/blob/main/JAVAFXExample/src/main/java/org/example/javafxdemo/GuessGame.java",
                demo: "",
                category: "java",
                date: "February 2023",
                client: "Personal Project",
                longDescription: "The Guess Game is a simple yet engaging JavaFX application where players try to guess a randomly generated number between 1 and 100. The game provides feedback after each guess, telling the player if their guess was too high or too low. The game tracks the number of attempts and displays a congratulatory message when the correct number is guessed. This project demonstrates my ability to create interactive applications with user input validation and game logic.",
                features: [
                    "Random number generation between 1-100",
                    "User input validation",
                    "Feedback system (too high/too low)",
                    "Attempt counter",
                    "Restart game functionality",
                    "Clean and intuitive user interface"
                ]
            },
            {
                title: "Personal Portfolio Website",
                description: "Designed and developed a responsive personal portfolio website using HTML, CSS, and JavaScript to showcase projects and skills.",
                image: "../assets/Project3.jpg",
                technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
                github: "https://github.com/Mrcoderv/protfolio",
                demo: "https://mrcoderv.github.io/protfolio/",
                category: "web",
                date: "April 2023",
                client: "Self",
                longDescription: "This portfolio website was created to showcase my skills, projects, and experience in a visually appealing and user-friendly manner. The website is fully responsive, ensuring a seamless experience across all devices. I implemented modern design principles and animations to enhance user engagement. The site includes sections for my bio, skills, projects, education, and contact information. The project demonstrates my front-end development skills and attention to design details.",
                features: [
                    "Responsive design for all device sizes",
                    "Modern UI with smooth animations",
                    "Project showcase with filtering capability",
                    "Skills visualization with progress bars",
                    "Contact form with validation",
                    "Dark/light theme toggle",
                    "SEO optimization"
                ]
            },
            {
                title: "Data Analysis Project",
                description: "Conducted data analysis on a dataset using Python libraries like Pandas, NumPy, and Matplotlib to extract insights and create visualizations.",
                image: "../assets/Project4.jpg",
                technologies: ["Python", "Pandas", "NumPy", "Matplotlib"],
                github: "https://github.com/Mrcoderv/data-analysis",
                demo: "",
                category: "data",
                date: "May 2023",
                client: "University Assignment",
                longDescription: "This data analysis project involved processing and analyzing a large dataset to extract meaningful insights. I used Python's data science libraries (Pandas, NumPy, Matplotlib) to clean the data, perform statistical analysis, and create visualizations. The project demonstrates my ability to work with real-world data, identify patterns, and present findings in a clear and visually appealing manner. The analysis included correlation studies, trend identification, and predictive modeling.",
                features: [
                    "Data cleaning and preprocessing",
                    "Exploratory data analysis",
                    "Statistical analysis and hypothesis testing",
                    "Data visualization with various chart types",
                    "Correlation analysis",
                    "Trend identification and forecasting",
                    "Comprehensive documentation of findings"
                ]
            }
        ];
        
        const project = projects[projectId];
        if (!project) {
            projectDetailsContainer.innerHTML = '<div class="error-message">Project not found</div>';
            return;
        }
        
        // Update page title
        document.title = `${project.title} - Raghav Vian Panthi`;
        
        // Update project details
        projectDetailsContainer.innerHTML = `
            <div class="project-header">
                <h2>${project.title}</h2>
                <div class="underline"></div>
                <div class="project-meta">
                    <div class="project-meta-item">
                        <i class="far fa-calendar-alt"></i>
                        <span>${project.date}</span>
                    </div>
                    <div class="project-meta-item">
                        <i class="far fa-user"></i>
                        <span>${project.client}</span>
                    </div>
                    <div class="project-meta-item">
                        <i class="fas fa-folder"></i>
                        <span>${project.category.charAt(0).toUpperCase() + project.category.slice(1)}</span>
                    </div>
                </div>
            </div>
            
            <div class="project-gallery">
                <img src="${project.image}" alt="${project.title}">
            </div>
            
            <div class="project-description">
                <h3>Project Overview</h3>
                <p>${project.longDescription}</p>
                
                <div class="project-features">
                    <h4>Key Features</h4>
                    <ul class="features-list">
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-technologies">
                    <h4>Technologies Used</h4>
                    <div class="tech-stack">
                        ${project.technologies.map(tech => `<div class="tech-item">${tech}</div>`).join('')}
                    </div>
                </div>
                
                <div class="project-links">
                    <a href="${project.github}" target="_blank" class="btn primary-btn"><i class="fab fa-github"></i> View on GitHub</a>
                    ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn secondary-btn"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                </div>
            </div>
            
            <div class="back-to-projects">
                <a href="../index.html#projects" class="btn secondary-btn"><i class="fas fa-arrow-left"></i> Back to Projects</a>
            </div>
        `;
    }
    
    // Load project details when on the project details page
    if (document.getElementById('project-details-container')) {
        loadProjectDetails();
    }

    // CV page functionality
    function initCVPage() {
        const cvContainer = document.getElementById('cv-container');
        if (!cvContainer) return;
        
        // Add event listener for print button
        const printButton = document.getElementById('print-cv');
        if (printButton) {
            printButton.addEventListener('click', () => {
                const iframe = document.querySelector('#cv-preview iframe');
                if (iframe) {
                    iframe.contentWindow.print();
                }
            });
        }
    }
    
    // Initialize CV page if on CV page
    if (document.getElementById('cv-container')) {
        initCVPage();
    }
});