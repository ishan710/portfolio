// ================================================
// INTERACTIVE TERMINAL PORTFOLIO - JavaScript
// Simulates terminal commands with typing effect
// ================================================

class TerminalPortfolio {
    constructor() {
        this.terminalOutput = document.getElementById('terminal-output');
        this.navButtons = document.querySelectorAll('.nav-btn');
        this.isTyping = false;
        this.tabs = new Map();
        this.activeTabId = 'main';
        this.tabCounter = 0;
        
        // Command mappings
        this.commands = {
            'home': {
                command: 'cat ~/welcome.txt',
                content: 'home-content'
            },
            'about': {
                command: 'tree ~/ishan',
                content: 'about-content'
            },
            'experience': {
                command: 'cat ~/experience.log',
                content: 'experience-content'
            },
            'projects': {
                command: 'ls -la ~/projects/',
                content: 'projects-content'
            },
            'contact': {
                command: 'cat ~/contact.txt',
                content: 'contact-content'
            },
            'clear': {
                command: 'clear',
                action: 'clear'
            },
            'help': {
                command: 'help',
                action: 'help'
            }
        };
        
        // Project data (inlined for file:// compatibility)
        this.projectData = {
            'pluto': {
                id: 'pluto',
                title: 'Pluto – IoT for Farmers',
                description: 'Low-cost agri-tech device to remotely control water pumps via phone call.',
                year: '2015–2020',
                tags: ['Arduino', 'IoT', 'Embedded C', 'Hardware'],
                details: `Pluto.click – Founder & CEO

Smart Irrigation Control
─────────────────────────
A revolutionary IoT device enabling farmers to remotely control
water pumps from anywhere using just a phone call.

The Problem
  Farmers in rural India faced irregular power supply and had to
  physically be present to switch water pumps on/off — often at 3am.

Solution
  → Control submersible pumps remotely via phone call
  → Get notifications when power is restored
  → Manage irrigation from anywhere in the world
  → Handles current up to 25 amp via GSM module

Impact
  → Sold 700+ units across 5 Indian states
  → Impacted 500+ farmers directly
  → Won ASSOCHAM Water Management Excellence Award 2018
  → Ashoka Youth Venturer (Top 16 young changemakers in India)
  → Award presented by Union Minister Nitin Gadkari
  → Featured on Doordarshan and Apna Radio

Links
  → pluto.click
  → TEDx Talk: youtube.com/watch?v=KfqOIBB40zQ`
            },
            'chess-ai': {
                id: 'chess-ai',
                title: 'AI Chess App',
                description: 'Interactive chess application with AI opponent. Built with React + Next.js.',
                year: '2024',
                tags: ['React', 'Next.js', 'AI', 'Vercel'],
                details: `AI Chess App – 2024

Play Against an Intelligent Opponent
──────────────────────────────────────
A modern, responsive chess app where players can challenge an
AI opponent with adjustable difficulty levels.

Tech Stack
  → React + Next.js
  → Deployed on Vercel

Links
  → chess-app-ai.vercel.app`
            },
            'ride-vide': {
                id: 'ride-vide',
                title: 'Ride-Vide',
                description: 'Ride-sharing platform connecting UChicago students to split airport costs.',
                year: '2020–2022',
                tags: ['React', 'Node.js', 'Facebook API', 'Socket.io', 'MongoDB'],
                details: `Ride-Vide – Jun 2020 to Jun 2022

Smart Ride Sharing for Students
─────────────────────────────────
A web platform helping UChicago students connect and share rides
to/from O'Hare and Midway airports.

Features
  → Facebook Login + UChicago email verification
  → Smart matching by flight time (±2 hours) and airport
  → Automated group chat via Socket.io
  → Cost splitting calculator

Tech Stack
  → React · Node.js · Express
  → Facebook OAuth · Socket.io · MongoDB
  → Hosted on Heroku

Impact
  → Connected 200+ students
  → Saved $10,000+ in transportation costs
  → Active usage during holiday breaks`
            },
            'parkinson-free': {
                id: 'parkinson-free',
                title: 'Parkinson-free',
                description: 'Gesture recognition software for at-home Parkinson\'s therapy using OpenCV.',
                year: '2018',
                tags: ['Python', 'OpenCV', 'Computer Vision', 'TKinter', 'Healthcare'],
                details: `Parkinson-free – Aug 2018 to Dec 2018

Accessible Physical Therapy via Webcam
────────────────────────────────────────
Gesture recognition software that brings Parkinson's Disease
therapy to patients' homes using just a webcam.

Background
  → Shadowed doctors and physiotherapists to understand therapy
  → Translated 4 manual therapy techniques into gesture-based software

Tech Stack
  → Python · OpenCV · TKinter
  → Haar Cascades for gesture detection

Output
  → Published a research paper on the approach
  → Works on any standard webcam

Paper
  → IJRESM Vol.1 Issue 11, November 2018
  → ijresm.com/Vol_1_2018/Vol1_Iss11_November18/IJRESM_V1_I11_94.pdf`
            },
            'secrets': {
                id: 'secrets',
                title: 'Secrets – Sentiment Analysis',
                description: 'Analyzed student sentiment from 1,500+ college confession posts using NLP.',
                year: '2020',
                tags: ['Python', 'BeautifulSoup', 'Selenium', 'Google Cloud NLP'],
                details: `Secrets – Feb 2020

College Sentiment Analysis
────────────────────────────
Analyzed sentiment patterns on anonymous college confession pages
to understand student mental health trends across the academic year.

Methodology
  → Scraped 1,500+ posts using BeautifulSoup + Selenium
  → Sentiment scoring via Google Cloud Natural Language API
  → Mapped results to academic calendar

Key Findings
  → 40% drop in positive sentiment during exam weeks
  → 25% increase in positive posts on weekends
  → Sentiment improves ~2 weeks before breaks

Impact
  → Helped identify optimal times for mental health outreach`
            }
        };

        this.init();
    }
    
    init() {
        // Add click listeners to nav buttons
        this.navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const command = btn.dataset.command;
                this.executeCommand(command);
                this.setActiveButton(btn);
            });
        });
        
        // Add click listeners to project items (using event delegation)
        // Ignore clicks on links so they navigate normally
        document.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            const projectItem = e.target.closest('.project-item[data-project]');
            if (projectItem) {
                const projectId = projectItem.dataset.project;
                this.openProjectTab(projectId, projectItem);
            }
        });
        
        // Add click listeners to tabs (using event delegation)
        document.addEventListener('click', (e) => {
            // Handle tab click
            const tab = e.target.closest('.tab:not(.tab-close)');
            if (tab && !e.target.closest('.tab-close')) {
                const tabId = tab.dataset.tabId;
                this.switchTab(tabId);
            }
            
            // Handle tab close
            if (e.target.closest('.tab-close')) {
                e.stopPropagation();
                const tab = e.target.closest('.tab');
                const tabId = tab.dataset.tabId;
                this.closeTab(tabId);
            }
        });
    }
    
    setActiveButton(activeBtn) {
        this.navButtons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }
    
    async executeCommand(commandName) {
        // Prevent multiple commands at once
        if (this.isTyping) return;
        
        const commandConfig = this.commands[commandName];
        
        if (!commandConfig) {
            this.showError(commandName);
            return;
        }
        
        // Handle special actions
        if (commandConfig.action === 'clear') {
            this.clearTerminal();
            return;
        }
        
        if (commandConfig.action === 'help') {
            this.showHelp();
            return;
        }
        
        // Fade out and clear previous content (except initial block)
        await this.fadeOutAndClear();
        
        // Create command block
        const commandBlock = document.createElement('div');
        commandBlock.className = 'command-block';
        commandBlock.style.opacity = '0';
        
        // Create command line
        const commandLine = document.createElement('div');
        commandLine.className = 'command-line';
        commandLine.innerHTML = `<span class="prompt">ishan@portfolio ~ %</span><span class="typed-command"></span>`;
        
        commandBlock.appendChild(commandLine);
        this.terminalOutput.appendChild(commandBlock);
        
        // Fade in the new command block
        await this.sleep(50);
        commandBlock.style.transition = 'opacity 0.3s ease';
        commandBlock.style.opacity = '1';
        
        // Type the command
        await this.typeCommand(commandLine.querySelector('.typed-command'), commandConfig.command);
        
        // Show content
        if (commandConfig.content) {
            const content = document.getElementById(commandConfig.content).cloneNode(true);
            content.style.display = 'block';
            content.className = 'command-output';
            commandBlock.appendChild(content);
        }
    }
    
    async typeCommand(element, text) {
        this.isTyping = true;
        const typingSpeed = 40; // milliseconds per character
        
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            await this.sleep(typingSpeed);
        }
        
        await this.sleep(200); // Pause after typing
        this.isTyping = false;
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    scrollToBottom() {
        this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
    }
    
    async fadeOutAndClear() {
        // Get all command blocks except the initial one
        const blocks = Array.from(this.terminalOutput.querySelectorAll('.command-block:not(.initial-block)'));
        
        if (blocks.length > 0) {
            // Fade out existing blocks
            blocks.forEach(block => {
                block.style.transition = 'opacity 0.2s ease';
                block.style.opacity = '0';
            });
            
            // Wait for fade out
            await this.sleep(200);
            
            // Remove the blocks
            blocks.forEach(block => block.remove());
        }
    }
    
    clearTerminal() {
        // Keep only the initial welcome block
        const initialBlock = this.terminalOutput.querySelector('.initial-block');
        this.terminalOutput.innerHTML = '';
        if (initialBlock) {
            this.terminalOutput.appendChild(initialBlock.cloneNode(true));
        }
    }
    
    showError(command) {
        const commandBlock = document.createElement('div');
        commandBlock.className = 'command-block';
        
        const commandLine = document.createElement('div');
        commandLine.className = 'command-line';
        commandLine.innerHTML = `<span class="prompt">ishan@portfolio ~ %</span><span class="typed-command">${command}</span>`;
        
        const errorOutput = document.createElement('div');
        errorOutput.className = 'error-output';
        errorOutput.textContent = `zsh: command not found: ${command}`;
        
        const helpText = document.createElement('div');
        helpText.className = 'command-output';
        helpText.innerHTML = `<p>Try one of these commands: <span class="cmd-hint">home</span>, <span class="cmd-hint">about</span>, <span class="cmd-hint">projects</span>, <span class="cmd-hint">contact</span>, <span class="cmd-hint">help</span>, <span class="cmd-hint">clear</span></p>`;
        
        commandBlock.appendChild(commandLine);
        commandBlock.appendChild(errorOutput);
        commandBlock.appendChild(helpText);
        
        this.terminalOutput.appendChild(commandBlock);
    }
    
    showHelp() {
        const commandBlock = document.createElement('div');
        commandBlock.className = 'command-block';
        
        const commandLine = document.createElement('div');
        commandLine.className = 'command-line';
        commandLine.innerHTML = `<span class="prompt">ishan@portfolio ~ %</span><span class="typed-command">help</span>`;
        
        const helpOutput = document.createElement('div');
        helpOutput.className = 'command-output';
        helpOutput.innerHTML = `
            <p>Available commands:</p>
            <ul class="command-list">
                <li><span class="cmd-name">home</span> - Return to home screen</li>
                <li><span class="cmd-name">about</span> - Learn more about me</li>
                <li><span class="cmd-name">experience</span> - View work history</li>
                <li><span class="cmd-name">projects</span> - View my projects</li>
                <li><span class="cmd-name">contact</span> - Get my contact information</li>
                <li><span class="cmd-name">clear</span> - Clear the terminal</li>
                <li><span class="cmd-name">help</span> - Show this help message</li>
            </ul>
            <br>
            <p>Tip: You can also click the navigation buttons above!</p>
        `;
        
        commandBlock.appendChild(commandLine);
        commandBlock.appendChild(helpOutput);
        
        this.terminalOutput.appendChild(commandBlock);
    }
    
    // === TAB MANAGEMENT ===
    
    async openProjectTab(projectId, projectElement) {
        const project = this.projectData[projectId];
        if (!project) return;
        
        // Check if tab already exists
        const existingTabId = Array.from(this.tabs.keys()).find(id => 
            this.tabs.get(id).projectId === projectId
        );
        
        if (existingTabId) {
            this.switchTab(existingTabId);
            return;
        }
        
        // Create new tab
        this.tabCounter++;
        const tabId = `project-${this.tabCounter}`;
        
        // Create tab element
        const tab = document.createElement('div');
        tab.className = 'tab';
        tab.dataset.tabId = tabId;
        tab.innerHTML = `
            <span class="tab-title">${project.title}</span>
            <span class="tab-close">×</span>
        `;
        
        document.getElementById('tabs-container').appendChild(tab);
        
        // Create content element
        const contentWrapper = document.querySelector('.terminal-content-wrapper');
        const content = document.createElement('div');
        content.className = 'terminal-content';
        content.dataset.contentId = tabId;
        
        // Build project content
        content.innerHTML = `
            <header class="header">
                <div class="logo">ISHAN MALHOTRA <span class="logo-divider">//</span> PORTFOLIO</div>
                <nav class="nav">
                    <button class="nav-btn" data-command="about">about</button>
                    <button class="nav-btn" data-command="projects">projects</button>
                    <button class="nav-btn" data-command="experience">work</button>
                    <button class="nav-btn" data-command="contact">contacts</button>
                    <button class="dark-mode-toggle" title="Toggle dark mode">${document.documentElement.getAttribute('data-theme') === 'dark' ? '○' : '◐'}</button>
                </nav>
            </header>
            <div class="terminal-output-area" id="output-${tabId}">
                <div class="command-block">
                    <div class="command-line">
                        <span class="prompt">ishan@portfolio ~ %</span>
                        <span class="typed-command">cat ~/projects/${projectId}/README.md</span>
                    </div>
                    <div class="command-output">
                        <div class="content-section">
                            <h3>// ${project.title}</h3>
                            <p>${project.description}</p>
                            <br>
                            <pre class="code-block">${project.details}</pre>
                            <br>
                            <div class="project-tags">
                                ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        contentWrapper.appendChild(content);

        // Wire up nav buttons in this tab — clicking navigates main tab
        content.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchTab('main');
                this.executeCommand(btn.dataset.command);
                this.setActiveButton(document.querySelector(`.terminal-content[data-content-id="main"] .nav-btn[data-command="${btn.dataset.command}"]`) || btn);
            });
        });

        // Wire up dark mode toggle in this tab
        const tabToggle = content.querySelector('.dark-mode-toggle');
        if (tabToggle) {
            tabToggle.addEventListener('click', () => {
                document.getElementById('dark-mode-toggle').click();
                tabToggle.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '○' : '◐';
            });
        }

        // Store tab reference
        this.tabs.set(tabId, {
            projectId,
            element: tab,
            content: content
        });

        // Switch to new tab
        this.switchTab(tabId);
    }
    
    switchTab(tabId) {
        // Update active tab
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tabId === tabId);
        });
        
        // Update active content
        document.querySelectorAll('.terminal-content').forEach(content => {
            content.classList.toggle('active', content.dataset.contentId === tabId);
        });
        
        this.activeTabId = tabId;
        
        // Update terminal output reference
        const activeContent = document.querySelector(`.terminal-content[data-content-id="${tabId}"]`);
        if (activeContent) {
            this.terminalOutput = activeContent.querySelector('.terminal-output-area') || 
                                  document.getElementById('terminal-output');
        }
    }
    
    closeTab(tabId) {
        // Don't close the main tab
        if (tabId === 'main') return;
        
        const tabData = this.tabs.get(tabId);
        if (!tabData) return;
        
        // Remove tab and content
        tabData.element.remove();
        tabData.content.remove();
        this.tabs.delete(tabId);
        
        // Switch to main tab if we closed the active tab
        if (this.activeTabId === tabId) {
            this.switchTab('main');
        }
    }
}

// === WINDOW CONTROLS INTERACTION ===
function initWindowControls() {
    const controlRed = document.querySelector('.control-red');
    const controlYellow = document.querySelector('.control-yellow');
    const controlGreen = document.querySelector('.control-green');
    const terminalWindow = document.querySelector('.terminal-window');
    
    // Close button - fade effect
    controlRed.addEventListener('click', () => {
        terminalWindow.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        terminalWindow.style.opacity = '0';
        terminalWindow.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            terminalWindow.style.opacity = '1';
            terminalWindow.style.transform = 'scale(1)';
        }, 300);
    });
    
    // Minimize button - scale down
    controlYellow.addEventListener('click', () => {
        terminalWindow.style.transition = 'transform 0.3s ease';
        terminalWindow.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            terminalWindow.style.transform = 'scale(1)';
        }, 300);
    });
    
    // Maximize button - toggle fullscreen
    let isMaximized = false;
    controlGreen.addEventListener('click', () => {
        if (!isMaximized) {
            terminalWindow.style.transition = 'all 0.3s ease';
            terminalWindow.style.maxWidth = '100%';
            terminalWindow.style.margin = '0';
            terminalWindow.style.borderRadius = '0';
            terminalWindow.style.height = '100vh';
            isMaximized = true;
        } else {
            terminalWindow.style.maxWidth = '1200px';
            terminalWindow.style.margin = '2rem auto';
            terminalWindow.style.borderRadius = 'var(--radius-window)';
            terminalWindow.style.height = '';
            isMaximized = false;
        }
    });
}

// === KEYBOARD SHORTCUTS ===
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // CMD/CTRL + K to clear terminal
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            terminal.clearTerminal();
        }
        
        // CMD/CTRL + L to also clear terminal
        if ((e.metaKey || e.ctrlKey) && e.key === 'l') {
            e.preventDefault();
            terminal.clearTerminal();
        }
    });
}

// === CONSOLE EASTER EGG ===
function initConsoleMessages() {
    const styles = {
        title: 'font-family: monospace; font-size: 16px; font-weight: bold; color: #111;',
        success: 'font-family: monospace; font-size: 12px; color: #27c93f;',
        info: 'font-family: monospace; font-size: 12px; color: #666;',
        ascii: 'font-family: monospace; font-size: 10px; color: #999; line-height: 1.2;'
    };
    
    console.log('%c$ init terminal_portfolio', styles.title);
    console.log('%c✓ Interactive terminal system loaded', styles.success);
    console.log('%c→ Type commands or click navigation', styles.info);
    console.log('%c' + 
        '\n╔════════════════════════════╗' +
        '\n║  ISHAN MALHOTRA PORTFOLIO ║' +
        '\n╚════════════════════════════╝\n', 
        styles.ascii
    );
    console.log('%cKeyboard shortcuts:', styles.info);
    console.log('%c  CMD/CTRL + K - Clear terminal', styles.info);
    console.log('%c  CMD/CTRL + L - Clear terminal', styles.info);
}

// === EXPERIENCE TABLE EXPAND/COLLAPSE ===
function initExperienceTable() {
    document.addEventListener('click', (e) => {
        const row = e.target.closest('.exp-row');
        if (!row) return;
        const id = row.dataset.exp;
        const detail = document.getElementById(`detail-${id}`);
        if (!detail) return;
        const isOpen = detail.classList.contains('open');
        // Close all
        document.querySelectorAll('.exp-detail.open').forEach(d => d.classList.remove('open'));
        document.querySelectorAll('.exp-row.open').forEach(r => r.classList.remove('open'));
        // Toggle clicked
        if (!isOpen) {
            detail.classList.add('open');
            row.classList.add('open');
        }
    });
}

// === DARK MODE TOGGLE ===
function initDarkMode() {
    const toggle = document.getElementById('dark-mode-toggle');
    if (!toggle) return;

    // Restore saved preference
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggle.textContent = '○';
    }

    toggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            toggle.textContent = '◐';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggle.textContent = '○';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// === INITIALIZE APPLICATION ===
let terminal;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize terminal
    terminal = new TerminalPortfolio();
    
    // Initialize window controls
    initWindowControls();
    
    // Initialize keyboard shortcuts
    initKeyboardShortcuts();
    
    // Show console messages
    initConsoleMessages();

    // Initialize experience table
    initExperienceTable();

    // Initialize dark mode toggle
    initDarkMode();

    console.log('%c✓ Terminal ready. Type "help" for available commands.',
        'font-family: monospace; font-size: 11px; color: #27c93f;'
    );
});
