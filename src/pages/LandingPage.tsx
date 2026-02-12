import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { categoryContent } from '../utils/categoryContent';
import './LandingPage.css';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const sublineRef = useRef<HTMLParagraphElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeline = gsap.timeline();

        // Dramatic headline entrance
        timeline.fromTo(
            headlineRef.current,
            { opacity: 0, y: 50, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'power4.out' }
        );

        // Subline with blur effect
        timeline.fromTo(
            sublineRef.current,
            { opacity: 0, y: 30, filter: 'blur(10px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
            '-=0.8'
        );

        // Description
        timeline.fromTo(
            descRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' },
            '-=0.6'
        );

        // Category cards with dramatic stagger
        timeline.fromTo(
            '.category-btn',
            {
                opacity: 0,
                y: 60,
                scale: 0.8,
                rotateX: -15
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'back.out(1.4)'
            },
            '-=0.5'
        );

        // Floating hearts animation
        gsap.to('.heart', {
            y: -30,
            duration: 3,
            stagger: 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }, []);

    const categories = [
        { key: 'sorry', color: 'rgba(139, 92, 246, 0.15)' },      // Purple
        { key: 'love', color: 'rgba(236, 72, 153, 0.15)' },       // Pink
        { key: 'try-again', color: 'rgba(59, 130, 246, 0.15)' },  // Blue
        { key: 'ask-out', color: 'rgba(251, 146, 60, 0.15)' },    // Orange
        { key: 'miss-you', color: 'rgba(34, 197, 94, 0.15)' },    // Green
        { key: 'last-message', color: 'rgba(168, 85, 247, 0.15)' } // Violet
    ];

    const handleCategoryClick = (category: string) => {
        navigate(`/create/${category}`);
    };

    const handleCategoryHover = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        const emoji = button.querySelector('.category-emoji');

        gsap.to(button, {
            y: -12,
            scale: 1.05,
            duration: 0.4,
            ease: 'power2.out'
        });

        gsap.to(emoji, {
            scale: 1.3,
            rotate: 10,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
        });
    };

    const handleCategoryLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        const emoji = button.querySelector('.category-emoji');

        gsap.to(button, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
        });

        gsap.to(emoji, {
            scale: 1,
            rotate: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
        });
    };

    return (
        <div className="landing-page">
            {/* Animated background hearts */}
            <div className="hearts-background">
                <div className="heart" style={{ left: '10%', top: '20%', animationDelay: '0s' }}>💝</div>
                <div className="heart" style={{ left: '80%', top: '30%', animationDelay: '1s' }}>💖</div>
                <div className="heart" style={{ left: '20%', top: '70%', animationDelay: '2s' }}>💗</div>
                <div className="heart" style={{ left: '70%', top: '80%', animationDelay: '1.5s' }}>💓</div>
                <div className="heart" style={{ left: '50%', top: '10%', animationDelay: '0.5s' }}>💕</div>
                <div className="heart" style={{ left: '90%', top: '60%', animationDelay: '2.5s' }}>💞</div>
            </div>

            <div className="gradient-orb orb-1"></div>
            <div className="gradient-orb orb-2"></div>
            <div className="gradient-orb orb-3"></div>

            <div className="landing-container">
                <div className="landing-hero">
                    <div className="hero-badge">
                        <span className="badge-icon">💝</span>
                        Valentine's Day 2026
                        <span className="badge-icon">💝</span>
                    </div>

                    <h1 ref={headlineRef} className="landing-headline">
                        <span className="headline-gradient">Some things are harder</span>
                        <br />
                        <span className="headline-gradient">to say than to feel.</span>
                    </h1>

                    <p ref={sublineRef} className="landing-subline">
                        ✨ Choose what words cannot carry alone ✨
                    </p>

                    <p ref={descRef} className="landing-description">
                        When emotions run deep but words fall short, let a beautifully crafted
                        message bridge the gap. Each expression is designed to feel genuinely
                        <span className="highlight"> yours</span>, never templated.
                    </p>
                </div>

                <div className="section-divider">
                    <div className="divider-line"></div>
                    <span className="divider-text">💌 Choose Your Message 💌</span>
                    <div className="divider-line"></div>
                </div>

                <div ref={gridRef} className="category-grid">
                    {categories.map((item, index) => {
                        const content = categoryContent[item.key];
                        return (
                            <button
                                key={item.key}
                                className="category-btn"
                                style={{
                                    '--category-color': item.color,
                                    '--delay': `${index * 0.1}s`
                                } as React.CSSProperties}
                                onClick={() => handleCategoryClick(item.key)}
                                onMouseEnter={handleCategoryHover}
                                onMouseLeave={handleCategoryLeave}
                            >
                                <div className="category-glow"></div>
                                <span className="category-emoji">{content.emoji}</span>
                                <span className="category-title">{content.title}</span>
                                <span className="category-hint">Create this message →</span>
                            </button>
                        );
                    })}
                </div>

                <div className="landing-features">
                    <div className="feature">
                        <div className="feature-icon">🔐</div>
                        <div className="feature-content">
                            <h3>Private & Secure</h3>
                            <p>No data stored. Everything lives in the link.</p>
                        </div>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">♾️</div>
                        <div className="feature-content">
                            <h3>Unlimited Access</h3>
                            <p>One payment. Infinite heartfelt messages.</p>
                        </div>
                    </div>
                    <div className="feature">
                        <div className="feature-icon">✨</div>
                        <div className="feature-content">
                            <h3>Emotionally Crafted</h3>
                            <p>Each message resonates authentically.</p>
                        </div>
                    </div>
                </div>

                <div className="landing-footer">
                    <div className="footer-quote">
                        <span className="quote-mark">"</span>
                        Because the hardest conversations deserve the gentlest approach.
                        <span className="quote-mark">"</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
