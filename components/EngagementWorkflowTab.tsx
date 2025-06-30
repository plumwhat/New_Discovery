
import React, { useEffect, useRef } from 'react';
import { TabProps, TabId } from '../types';
import { ENGAGEMENT_WORKFLOW_INFOGRAPHIC_HTML } from '../constants/infographics/html/engagementWorkflow';

const EngagementWorkflowTab: React.FC<TabProps> = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // --- Start of Infographic Logic ---
        const allStagesAndDecisions = container.querySelectorAll('.flow-connector');
        
        function initializeJourney() {
            allStagesAndDecisions.forEach((el, index) => {
                if (index > 0) el.classList.add('locked');
                else el.classList.remove('locked');
                el.classList.remove('decision-taken');
                const decisionButtons = el.querySelectorAll('.decision-btn');
                decisionButtons.forEach((btn) => {
                    btn.classList.remove('selected', 'unselected');
                });
            });
            const journeySequence = Array.from(allStagesAndDecisions).map(el => '#' + el.id);
            cascadeUnlock(journeySequence.indexOf('#stage-1'), journeySequence.indexOf('#decision-1'));
            container.ownerDocument.defaultView?.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function unlockAndHighlight(selector: string, scroll = true) {
            const element = container.querySelector(selector);
            if (element) {
                element.classList.remove('locked');
                const card = element.querySelector('.stage-card, .decision-diamond-container');
                if (card) {
                    card.classList.add('highlight');
                    if (scroll) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => {
                        if (card) card.classList.remove('highlight');
                    }, 1500);
                }
            }
        }

        function cascadeUnlock(startIndex: number, endIndex: number) {
             const journeySequence = Array.from(allStagesAndDecisions).map(el => '#' + el.id);
             for (let i = startIndex; i <= endIndex; i++) {
                 setTimeout(() => {
                    unlockAndHighlight(journeySequence[i], i === startIndex);
                 }, (i - startIndex) * 400);
             }
        }
        
        initializeJourney();
        
        // --- Event Listeners ---
        const startOverBtn = container.querySelector('#start-over-btn');
        if (startOverBtn) {
            startOverBtn.addEventListener('click', initializeJourney);
        }

        const decisionButtons = container.querySelectorAll('.decision-btn');
        const decisionButtonClickHandler = (e: Event) => {
            const targetButton = e.currentTarget;
            if (!(targetButton instanceof HTMLElement)) return;

            const parentDecision = targetButton.closest('.decision');
            if (!parentDecision || parentDecision.classList.contains('decision-taken')) return;

            const action = targetButton.dataset.action;
            const unlockSelector = targetButton.dataset.unlock;
            const targetSelector = targetButton.dataset.target;
            const journeySequence = Array.from(allStagesAndDecisions).map(el => '#' + el.id);

            if (action === 'forward' && unlockSelector) {
                parentDecision.classList.add('decision-taken');
                targetButton.classList.add('selected');
                const otherButton = parentDecision.querySelector('.decision-btn:not(.selected)');
                if(otherButton) otherButton.classList.add('unselected');

                const startIndex = journeySequence.indexOf(unlockSelector);
                if (startIndex === -1) return;

                let endIndex = startIndex;
                for (let i = startIndex + 1; i < journeySequence.length; i++) {
                    const stageEl = container.querySelector(journeySequence[i]);
                    if (stageEl && stageEl.classList.contains('decision')) {
                        endIndex = i;
                        break;
                    }
                    endIndex = i;
                }
                cascadeUnlock(startIndex, endIndex);

            } else if (action === 'backward' && targetSelector) {
                const targetElement = container.querySelector(targetSelector);
                 if(targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    const card = targetElement.querySelector('.stage-card');
                    if(card) {
                         card.classList.add('highlight');
                         setTimeout(() => {
                             if(card) card.classList.remove('highlight');
                         }, 1500);
                    }
                 }
                 const diamond = parentDecision.querySelector('.decision-diamond-container');
                 if (diamond) {
                     diamond.classList.add('highlight');
                     setTimeout(() => {
                        if(diamond) diamond.classList.remove('highlight');
                     }, 1500);
                 }
            }
        };

        decisionButtons.forEach(button => {
            button.addEventListener('click', decisionButtonClickHandler);
        });

        const filterContainer = container.querySelector('#filters');
        const filterClickHandler = (e: Event) => {
            const target = e.target;
            if (target instanceof HTMLButtonElement && target.id !== 'start-over-btn' && filterContainer) {
                const filter = target.dataset.filter;
                const activeBtn = filterContainer.querySelector('.active-filter');
                if(activeBtn) activeBtn.classList.remove('active-filter');
                target.classList.add('active-filter');
                
                const applyFilter = (elements: NodeListOf<Element>) => {
                    elements.forEach(el => {
                        if (el instanceof HTMLElement) {
                            const type = el.dataset.type;
                            el.classList.toggle('dimmed', !(filter === 'all' || filter === type));
                        }
                    });
                };
                applyFilter(container.querySelectorAll('.path-description'));
                applyFilter(container.querySelectorAll('.easy-customer-bg, .difficult-customer-bg, .current-customer-bg'));
            }
        };

        if (filterContainer) {
            filterContainer.addEventListener('click', filterClickHandler);
        }

        // Cleanup function to remove listeners when component unmounts
        return () => {
            if (startOverBtn) {
                startOverBtn.removeEventListener('click', initializeJourney);
            }
            decisionButtons.forEach(button => {
                button.removeEventListener('click', decisionButtonClickHandler);
            });
            if (filterContainer) {
                filterContainer.removeEventListener('click', filterClickHandler);
            }
        };

    }, []);

    return (
        <section
            id={`${TabId.ENGAGEMENT_WORKFLOW}-section`}
            aria-labelledby={`${TabId.ENGAGEMENT_WORKFLOW}-heading`}
            className="bg-gray-100 overflow-hidden rounded-lg shadow"
            ref={containerRef}
            dangerouslySetInnerHTML={{ __html: ENGAGEMENT_WORKFLOW_INFOGRAPHIC_HTML }}
        />
    );
};

export default EngagementWorkflowTab;
