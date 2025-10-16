// 平滑滚动导航
document.addEventListener('DOMContentLoaded', function() {
    // 导航链接平滑滚动
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // 导航栏高度
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 英雄区域按钮点击效果
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');

    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 移动端导航菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // 点击导航链接时关闭移动端菜单
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 滚动时导航栏效果
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // 向下滚动时添加阴影效果
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    // 页面元素动画观察器
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animateElements = document.querySelectorAll('.skill-card, .achievement-card, .timeline-item, .contact-item, .social-link');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // 技能卡片悬停效果
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 成就数字动画
    const achievementNumbers = document.querySelectorAll('.achievement-number');
    const animateNumbers = () => {
        achievementNumbers.forEach(number => {
            const text = number.textContent;
            const numValue = parseInt(text.replace(/[^\d]/g, ''));

            if (numValue && !number.classList.contains('animated')) {
                number.classList.add('animated');
                let current = 0;
                const increment = numValue / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numValue) {
                        current = numValue;
                        clearInterval(timer);
                    }

                    if (text.includes('%')) {
                        number.textContent = Math.floor(current) + '%';
                    } else if (text.includes('万')) {
                        number.textContent = Math.floor(current) + '万+';
                    } else {
                        number.textContent = Math.floor(current) + '+';
                    }
                }, 20);
            }
        });
    };

    // 当成就区域进入视野时触发数字动画
    const achievementsSection = document.getElementById('achievements');
    if (achievementsSection) {
        const achievementObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    achievementObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        achievementObserver.observe(achievementsSection);
    }

    // 社交链接点击效果
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 添加点击动画效果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // 打字机效果（英雄区域标题）
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';

        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };

        // 延迟启动打字机效果
        setTimeout(typeWriter, 500);
    }

    // 联系方式卡片交互效果
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const contactText = this.querySelector('.contact-text p').textContent;

            // 复制到剪贴板（如果支持）
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(contactText).then(() => {
                    showToast('已复制到剪贴板');
                });
            } else {
                // 创建临时输入框进行复制
                const textArea = document.createElement('textarea');
                textArea.value = contactText;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    showToast('已复制到剪贴板');
                } catch (err) {
                    console.log('复制失败');
                }
                document.body.removeChild(textArea);
            }
        });
    });

    // 简单的提示消息功能
    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 9999;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 100);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }

    // 页面加载完成后的初始化动画
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// CSS 动画类
const style = document.createElement('style');
style.textContent = `
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .nav-menu.active {
        display: flex !important;
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 20px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        z-index: 999;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }

    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    body.loaded .hero-content {
        animation: fadeInUp 1s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .contact-item {
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .contact-item:hover {
        background: var(--bg-light);
        border-radius: 12px;
        padding: 15px;
        margin: -15px;
    }

    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);