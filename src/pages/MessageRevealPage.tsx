import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { decodeMessageData } from '../utils/encoding';
import { getCategoryContent } from '../utils/categoryContent';
import './MessageRevealPage.css';

const MessageRevealPage: React.FC = () => {
    const { encodedData } = useParams<{ encodedData: string }>();
    const navigate = useNavigate();

    const recipientRef = useRef<HTMLDivElement>(null);
    const openingRef = useRef<HTMLParagraphElement>(null);
    const messageRef = useRef<HTMLParagraphElement>(null);
    const signatureRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!encodedData) {
            navigate('/');
            return;
        }

        const messageData = decodeMessageData(encodedData);
        if (!messageData) {
            navigate('/');
            return;
        }

        const content = getCategoryContent(messageData.category);
        if (!content) {
            navigate('/');
            return;
        }

        // GSAP Timeline for staged reveal
        const timeline = gsap.timeline();

        // Stage 1: Show recipient name (pause 2s)
        timeline.fromTo(
            recipientRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
        );
        timeline.to({}, { duration: 2 }); // Pause

        // Stage 2 & 3: Show message content
        if (messageData.customMessage) {
            if (messageRef.current) {
                timeline.fromTo(
                    messageRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }
                );
                timeline.to({}, { duration: 2.5 }); // Pause
            }
        } else if (openingRef.current) {
            timeline.fromTo(
                openingRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }
            );
            timeline.to({}, { duration: 2.5 }); // Pause
        }

        // Stage 4: Show signature
        timeline.fromTo(
            signatureRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
        );
        timeline.to({}, { duration: 1.5 }); // Pause

        // Stage 5: Show CTA
        timeline.fromTo(
            ctaRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: 'power2.out' }
        );

    }, [encodedData, navigate]);

    if (!encodedData) return null;

    const messageData = decodeMessageData(encodedData);
    if (!messageData) return null;

    const content = getCategoryContent(messageData.category);
    if (!content) return null;

    return (
        <div className="reveal-page">
            <div className="reveal-container">
                <div className="reveal-content">
                    {/* Stage 1: Recipient */}
                    <div ref={recipientRef} className="reveal-recipient">
                        For {messageData.recipientName}.
                    </div>

                    {/* Stage 2 & 3: Message Content */}
                    {messageData.customMessage ? (
                        <p ref={messageRef} className="reveal-message">
                            {messageData.customMessage}
                        </p>
                    ) : (
                        <p ref={openingRef} className="reveal-opening">
                            {content.openingLine}
                        </p>
                    )}

                    {/* Stage 4: Signature */}
                    <div ref={signatureRef} className="reveal-signature">
                        — {messageData.senderName}
                    </div>
                </div>

                {/* Stage 5: CTA */}
                <div ref={ctaRef} className="reveal-cta">
                    <a href="/" className="cta-link">
                        Write yours →
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MessageRevealPage;
