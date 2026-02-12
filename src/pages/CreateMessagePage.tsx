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
    const [verificationCode] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());

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
        if (!showPayment) return;

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

    const copyUpiId = () => {
        navigator.clipboard.writeText(upiId);
        alert('UPI ID copied to clipboard!');
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const upiId = "justforyoy@ybl";
    const amount = "29";
    const verificationNote = `VAL-${verificationCode}`;
    const upiLinkFull = `upi://pay?pa=${upiId}&pn=Valentine&am=${amount}&cu=INR&tn=${encodeURIComponent(verificationNote)}`;
    const upiLinkMinimal = `upi://pay?pa=${upiId}&pn=Valentine&tn=${encodeURIComponent(verificationNote)}`;

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

                        <div className="payment-action-area">
                            <div className="payment-steps-vertical">
                                {/* Step 1: QR Code */}
                                <div className="step-item qr-main-section">
                                    <div className="step-header">
                                        <span className="step-number">1</span>
                                        <p className="step-title">Pay via QR Code (Recommended)</p>
                                    </div>
                                    <div className="qr-container-premium">
                                        <div className="qr-box-large">
                                            <img
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiLinkFull)}`}
                                                alt="UPI QR Code"
                                                className="qr-image-large"
                                            />
                                            <div className="screenshot-tip">
                                                <span className="tip-icon">📸</span>
                                                <p>Take a <b>Screenshot</b> and upload it to your <b>Scanner</b> in GPay/PhonePe or any other payments apps to pay easily with prefilled details.</p>
                                            </div>
                                        </div>
                                        <div className="upi-id-copy-box">
                                            <p className="upi-id-label">Or use UPI ID:</p>
                                            <div className="upi-id-row">
                                                <code className="upi-id-value">{upiId}</code>
                                                <button className="btn-copy-mini" onClick={copyUpiId}>Copy</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2: Verification Note */}
                                <div className="step-item">
                                    <div className="verification-notice-box-v2">
                                        <div className="step-header">
                                            <span className="step-number">2</span>
                                            <p className="step-title">Add Note & Pay</p>
                                        </div>
                                        <p className="verification-instruction-v2">
                                            If QR is blocked, use <b>UPI ID</b>. Don't forget the code! When paying, you <b>must</b> add this code in the notes to validate:
                                        </p>
                                        <div className="code-card">
                                            <span className="code-display-v2">{verificationNote}</span>
                                            <button className="btn-copy-glass" onClick={() => {
                                                navigator.clipboard.writeText(verificationNote);
                                                alert('Code copied!');
                                            }}>Copy Code</button>
                                        </div>
                                    </div>
                                </div>

                                {/* Fallback App Buttons */}
                                <div className="step-item fallback-apps">
                                    <p className="fallback-label">Or try direct app deep link:</p>
                                    <div className="app-actions-row">
                                        <a href={upiLinkFull} className="btn-app-link">
                                            <span className="btn-icon">⚡</span> GPay/PhonePe
                                        </a>
                                        <a href={upiLinkMinimal} className="btn-app-link manual">
                                            <span className="btn-icon">📱</span> Manual App
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="payment-footer-fixed">
                                <div className="timer-pill">
                                    <span className="timer-bullet"></span>
                                    {canConfirmPayment ? '✓ Verification period ready' : `Payment window: ${formatTime(timeRemaining)}`}
                                </div>
                                <button
                                    className="btn btn-primary btn-confirm-xl"
                                    onClick={handlePaymentConfirmed}
                                    disabled={!canConfirmPayment}
                                >
                                    {!canConfirmPayment
                                        ? `Wait for bank update (${formatTime(timeRemaining)})`
                                        : 'Confirm My Payment'}
                                </button>
                            </div>
                        </div>

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
