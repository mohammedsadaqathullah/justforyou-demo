import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { categoryContent } from '../utils/categoryContent';
import { encodeMessageData } from '../utils/encoding';
import type { MessageData } from '../utils/encoding';
import { hasUserPaid, markUserAsPaid } from '../utils/payment';
import './CreateMessagePage.css';

const CreateMessagePage: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();

    const [senderName, setSenderName] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [customMessage, setCustomMessage] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');
    const [showPayment, setShowPayment] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(150);
    const [canConfirmPayment, setCanConfirmPayment] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'upi' | 'qr' | null>(null);

    const headerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const content = category ? categoryContent[category] : null;

    useEffect(() => {
        if (!content) {
            navigate('/');
            return;
        }

        const timeline = gsap.timeline();
        timeline.fromTo(
            headerRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        );
        timeline.fromTo(
            formRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
            '-=0.4'
        );
    }, [content, navigate]);

    useEffect(() => {
        if (!showPayment || !paymentMethod) return;

        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setCanConfirmPayment(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [showPayment, paymentMethod]);

    const handleGenerateLink = () => {
        if (!senderName.trim() || !recipientName.trim()) {
            alert('Please enter both names');
            return;
        }

        if (hasUserPaid()) {
            generateLink();
        } else {
            setShowPayment(true);
            setTimeRemaining(150);
            setCanConfirmPayment(false);
            setPaymentMethod(null);
        }
    };

    const handlePaymentConfirmed = () => {
        markUserAsPaid();
        setShowPayment(false);
        generateLink();
    };

    const generateLink = () => {
        const messageData: MessageData = {
            category: category!,
            senderName: senderName.trim(),
            recipientName: recipientName.trim(),
            customMessage: customMessage.trim() || undefined
        };

        const encodedData = encodeMessageData(messageData);
        const fullUrl = `${window.location.origin}/message/${encodedData}`;
        setGeneratedLink(fullUrl);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        alert('Link copied to clipboard!');
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const upiId = "justforyoy@ybl";
    const amount = "29";
    const [transactionId] = useState(`VAL${Date.now()}${Math.floor(Math.random() * 1000)}`);
    const upiLink = `upi://pay?pa=${upiId}&pn=ValentineMessage&am=${amount}&cu=INR&tr=${transactionId}&mc=0000&tn=Valentine%20Message%20Payment`;

    if (!content) return null;

    return (
        <div className="create-page">
            <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
            </div>

            <div className="create-container">
                <div ref={headerRef} className="create-header">
                    <span className="create-emoji">{content.emoji}</span>
                    <h2 className="create-title">{content.title}</h2>
                    <p className="create-subtitle">{content.openingLine}</p>
                </div>

                {showPayment ? (
                    <div className="payment-modal">
                        <div className="payment-icon-wrapper">
                            <div className="payment-icon">💳</div>
                        </div>

                        <h3 className="payment-title">One-Time Payment</h3>
                        <p className="payment-subtitle">Unlock unlimited messages for all types</p>

                        <div className="price-display">
                            <span className="currency">₹</span>
                            <span className="amount">{amount}</span>
                            <span className="price-label">only</span>
                        </div>

                        <div className="payment-benefits">
                            <div className="benefit-item">
                                <span className="benefit-icon">✓</span>
                                <span>Unlimited message links</span>
                            </div>
                            <div className="benefit-item">
                                <span className="benefit-icon">✓</span>
                                <span>All 6 message types included</span>
                            </div>
                            <div className="benefit-item">
                                <span className="benefit-icon">✓</span>
                                <span>Premium animated reveals</span>
                            </div>
                        </div>

                        {!paymentMethod ? (
                            <div className="payment-options">
                                <p className="options-title">Pay with UPI to continue</p>
                                <div className="options-grid">
                                    <button className="option-card" onClick={() => setPaymentMethod('upi')}>
                                        <span className="option-icon">📱</span>
                                        <span className="option-label">Pay via App</span>
                                    </button>
                                    <button className="option-card" onClick={() => setPaymentMethod('qr')}>
                                        <span className="option-icon">📷</span>
                                        <span className="option-label">Scan QR</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="payment-action-area">
                                {paymentMethod === 'upi' ? (
                                    <div className="upi-app-section">
                                        <p className="method-hint">Opens GPay, PhonePe, or Paytm</p>
                                        <a href={upiLink} className="btn btn-primary btn-upi-app">
                                            Open Payment App
                                        </a>
                                    </div>
                                ) : (
                                    <div className="qr-section">
                                        <div className="qr-box">
                                            {/* Using a placeholder service for QR or user can replace with image */}
                                            <img
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`}
                                                alt="UPI QR Code"
                                                className="qr-image"
                                            />
                                            <p className="upi-id-text">{upiId}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="timer-container">
                                    <div className="timer-circle">
                                        <svg className="timer-svg" viewBox="0 0 100 100">
                                            <circle className="timer-bg" cx="50" cy="50" r="45" />
                                            <circle
                                                className="timer-progress"
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                style={{
                                                    strokeDashoffset: `${283 * (1 - timeRemaining / 150)}`
                                                }}
                                            />
                                        </svg>
                                        <div className="timer-text">
                                            {canConfirmPayment ? '✓' : formatTime(timeRemaining)}
                                        </div>
                                    </div>
                                    <p className="timer-label">
                                        {canConfirmPayment
                                            ? 'Payment duration met'
                                            : 'Verifying payment status...'}
                                    </p>
                                </div>

                                <div className="payment-actions">
                                    {canConfirmPayment && (
                                        <button
                                            className="btn btn-primary btn-confirm"
                                            onClick={handlePaymentConfirmed}
                                        >
                                            I Have Paid
                                        </button>
                                    )}
                                    <button className="btn-back" onClick={() => setPaymentMethod(null)}>
                                        Choose other method
                                    </button>
                                </div>
                            </div>
                        )}

                        <button className="btn btn-cancel" onClick={() => setShowPayment(false)}>
                            Cancel
                        </button>
                    </div>
                ) : !generatedLink ? (
                    <form ref={formRef} className="create-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-instruction">
                            <p>Fill in the details below to create your personalized message page.</p>
                        </div>

                        <div className="form-group">
                            <label htmlFor="senderName">Your Name</label>
                            <input
                                id="senderName"
                                type="text"
                                value={senderName}
                                onChange={(e) => setSenderName(e.target.value)}
                                placeholder="e.g., John"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="recipientName">Their Name</label>
                            <input
                                id="recipientName"
                                type="text"
                                value={recipientName}
                                onChange={(e) => setRecipientName(e.target.value)}
                                placeholder="e.g., Sarah"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="customMessage">Your Message (Optional)</label>
                            <textarea
                                id="customMessage"
                                value={customMessage}
                                onChange={(e) => setCustomMessage(e.target.value)}
                                placeholder="Add a personal note to make it even more meaningful..."
                                rows={4}
                            />
                            <span className="form-hint">
                                {customMessage.length > 0
                                    ? `${customMessage.length} characters`
                                    : 'Leave blank to use the default poetic message'}
                            </span>
                        </div>

                        <div className="form-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleGenerateLink}
                            >
                                Generate Link
                            </button>
                            <p className="payment-note">
                                {hasUserPaid()
                                    ? '✓ You have unlimited access'
                                    : '₹29 one-time • Unlimited messages for all types'}
                            </p>
                        </div>
                    </form>
                ) : (
                    <div className="link-generated">
                        <div className="success-icon">✓</div>
                        <p className="success-message">Your message is ready to share</p>
                        <p className="success-description">
                            Copy the link below and send it to {recipientName}.
                            When they open it, they'll experience your message beautifully.
                        </p>
                        <div className="link-box">
                            <input
                                type="text"
                                value={generatedLink}
                                readOnly
                                className="link-input"
                                onClick={(e) => e.currentTarget.select()}
                            />
                        </div>
                        <div className="action-buttons">
                            <button className="btn btn-primary" onClick={copyToClipboard}>
                                Copy Link
                            </button>
                            <button
                                className="btn"
                                onClick={() => {
                                    setGeneratedLink('');
                                    setSenderName('');
                                    setRecipientName('');
                                    setCustomMessage('');
                                }}
                            >
                                Create Another
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateMessagePage;
