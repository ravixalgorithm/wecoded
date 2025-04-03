const articlesContainer = document.getElementById('articles-container');
const eventItemsContainer = document.getElementById('event-items-container');
const resourceLinksContainer = document.getElementById('resource-links-container');
const showMoreButtonContainer = document.getElementById('show-more-button-container');
const wecodedPageContent = document.getElementById('wecoded-page-content');
const wecodedTitle = document.getElementById('wecoded-title');
const wecodedSubtitle = document.getElementById('wecoded-subtitle');
const socialLinksContainer = document.getElementById('social-links');
let allArticles = [];
let showMoreButton;

function showLoadingIndicator() {
    articlesContainer.innerHTML = `<p class="loading-indicator text-center" style="padding: 20px; font-size: 18px; color: #555; background-color: #f5f5f5; border-radius: 8px;">Loading articles...</p>`;
}

function formatDate(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function createCard(article) {
    const primaryTag = article.tag_list[0];
    const cardColor = primaryTag === 'wecoded' ? '#4531EA' : '#CCEA71';

    const card = document.createElement('div');
    card.className = "group card";
    card.innerHTML = `
                <div class="overflow-hidden transition-all duration-300 border-2 border-transparent hover:shadow-lg hover:border-gray-700 bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-md rounded-lg">
                    <div class="p-6">
                        <div class="flex justify-between items-start gap-4 mb-4">
                            <a href="https://dev.to/${article.user.username}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors">
                                <img src="${article.user.profile_image_90}" alt="${article.user.name}" class="w-8 h-8 rounded-full">
                                <span class="text-sm font-medium">${article.user.name}</span>
                            </a>
                            <div class="text-xs font-semibold px-2 py-1 rounded-full transition-colors shadow-sm ${primaryTag === 'wecoded' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-green-500/20 text-green-300 border border-green-500/30'} tag">
                                ${primaryTag}
                            </div>
                        </div>
                        <a href="https://dev.to/${article.user.username}/${article.slug}" target="_blank" rel="noopener noreferrer" class="text-lg font-semibold text-white hover:text-gray-200 transition-colors block mb-2 group-hover:underline article-link">
                            ${article.title}
                        </a>
                        <p class="text-gray-400 text-sm mb-4 line-clamp-2">${article.description}</p>
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${article.tag_list.slice(0, 3).map(tag => `<span class="text-xs font-medium px-2 py-1 rounded-full transition-colors border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white border border-gray-700 tag">${tag}</span>`).join('')}
                        </div>
                        <div class="flex items-center justify-between text-xs text-gray-500">
                            <span>${formatDate(article.published_at)}</span>
                            <div class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart w-4 h-4 text-red-400"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 1.66-3 1.66s-1.24-1.66-3-1.66A5.5 5.5 0 0 0 2 8.5c0 2.3 1.51 4.05 3 5.5l7 7Z"></path></svg>
                                <span>${article.positive_reactions_count}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open w-4 h-4"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path><path d="M12 13h6"></path><path d="M12 17h6"></path></svg>
                                <span>${article.reading_time_minutes} min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    return card;
}

function createEventItem(event) {
    const eventItem = document.createElement('div');
    eventItem.className = "p-6 rounded-lg bg-gray-900/90 backdrop-blur-md border border-gray-800 shadow-md";
    eventItem.innerHTML = `
                <h3 class="text-xl font-semibold text-white mb-2">${event.title}</h3>
                <div class="text-gray-400 mb-4">
                    <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar w-4 h-4"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
                        <span>${event.date}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock w-4 h-4"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        <span>${event.time}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-4 h-4"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8" cy="4" r="4"></circle><path d="M20 17v-2a4 4 0 0 0-4-4h-3"></path><path d="M16 3v1.75"></path><path d="M18.85 5.15l1.41 1.41"></path><path d="M21 7.25h-2.25"></path><path d="M18.85 8.85l-1.41 1.41"></path></svg>
                        <span>${event.location}</span>
                    </div>
                </div>
                <p class="text-gray-300 mb-4">${event.description}</p>
                <div class="flex items-center gap-2 text-sm text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-4 h-4"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8" cy="4" r="4"></circle><path d="M20 17v-2a4 4 0 0 0-4-4h-3"></path><path d="M16 3v1.75"></path><path d="M18.85 5.15l1.41 1.41"></path><path d="M21 7.25h-2.25"></path><path d="M18.85 8.85l-1.41 1.41"></path></svg>
                    <span>${event.attendees}+ attendees</span>
                </div>
            `;
    return eventItem;
}

function createResourceLink(resource) {
    const resourceLink = document.createElement('div');
    resourceLink.className = "p-4 rounded-lg bg-gray-900/90 backdrop-blur-md border border-gray-800 hover:shadow-lg transition-all duration-300";
    resourceLink.innerHTML = `
                <a href="${resource.url}" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 font-medium transition-colors block">
                    ${resource.title}
                </a>
            `;
    return resourceLink;
}

// Articles from Dev.to API
async function fetchArticles() {
    try {
        showLoadingIndicator();
        const response = await fetch('https://dev.to/api/articles?tag=wecoded');
        if (!response.ok) {
            throw new Error(`Failed to fetch articles: ${response.status}`);
        }
        const data = await response.json();
        allArticles = data;
        displayArticles(data.slice(0, 6));

        showMoreButton.addEventListener('click', () => {
            const currentCount = articlesContainer.children.length;
            const nextArticles = allArticles.slice(currentCount, currentCount + 6);
            displayArticles(nextArticles);

            if (articlesContainer.children.length >= allArticles.length) {
                showMoreButton.style.display = 'none';
            }
        });
    } catch (error) {
        console.error("Error fetching articles:", error);
        articlesContainer.innerHTML = `<div class="text-red-500 text-center">Error: ${error.message || 'An error occurred while fetching articles.'}</div>`;
    }
}

// Show More button
showMoreButton = document.createElement('button');
showMoreButton.id = 'show-more-button';
showMoreButton.className = 'mt-8 mx-auto block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300 shadow-md';
showMoreButton.textContent = 'Show More Stories';
showMoreButtonContainer.appendChild(showMoreButton);
function displayArticles(articles) {
    if (articlesContainer.querySelector('.loading-indicator')) {
        articlesContainer.innerHTML = '';
    }
    articles.forEach(article => {
        const card = createCard(article);
        articlesContainer.appendChild(card);
    });

    gsap.from(articlesContainer.children, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.2,
        ease: "easeInOut",
    });
}

// Event Details
function loadEvents() {
    const events = [
        {
            title: 'Virtual Panel: Women in Tech Leadership',
            date: '2024-03-08',
            time: '12:00 PM - 1:30 PM EST',
            location: 'Online',
            attendees: 500,
            description: 'Join us for a virtual panel discussion with leading women in technology as they share their experiences, challenges, and insights on navigating leadership roles.',
        },
        {
            title: 'Local Hackathon: Empowering Women Coders',
            date: '2024-03-09',
            time: '9:00 AM - 6:00 PM PST',
            location: 'San Francisco, CA',
            attendees: 100,
            description:
                'A day-long hackathon focused on creating solutions for social impact, organized by and for women coders.  Prizes and mentorship available.',
        },
        {
            title: 'Workshop: Building Your Personal Brand',
            date: '2024-03-10',
            time: '2:00 PM - 4:00 PM GMT',
            location: 'London, UK',
            attendees: 50,
            description:
                'Learn how to build a strong personal brand in the tech industry.  This workshop will cover resume building, networking, and online presence.',
        },
    ];

    events.forEach(event => {
        const eventItem = createEventItem(event);
        eventItemsContainer.appendChild(eventItem);
    });
    // Animate the event items on initial load
    gsap.from(eventItemsContainer.children, {
        opacity: 0,
        x: 20,
        duration: 0.5,
        stagger: 0.2,
        ease: "easeInOut",
    });
}

function loadResources() {
    const resources = [
        { title: 'UN Women', url: 'https://www.unwomen.org/' },
        { title: 'International Women\'s Day', url: 'https://www.internationalwomensday.com/' },
        { title: 'AnitaB.org', url: 'https://anitab.org/' },
    ];

    resources.forEach(resource => {
        const resourceLink = createResourceLink(resource);
        resourceLinksContainer.appendChild(resourceLink);
    });
    // Animate the resource links on initial load
    gsap.from(resourceLinksContainer.children, {
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        stagger: 0.1,
        ease: "easeInOut"
    });
}

// Call functions
fetchArticles();
loadEvents();
loadResources();

// GSAP Animations
gsap.fromTo(wecodedTitle,
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'easeInOut', delay: 0.2 }
);

gsap.fromTo(wecodedSubtitle,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'easeInOut', delay: 0.4 }
);

gsap.fromTo(socialLinksContainer,
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.6, ease: 'easeInOut', delay: 0.6 }
);

gsap.fromTo("#featured-stories-title",
    { opacity: 0, y: -10 },
    { opacity: 1, y: 0, duration: 0.6, ease: "easeOut", delay: 0.2 }
);

gsap.fromTo("#featured-stories-description",
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.6, ease: "easeOut", delay: 0.4 }
);

gsap.fromTo("#iwd-events-title",
    { opacity: 0, y: -10 },
    { opacity: 1, y: 0, duration: 0.6, ease: "easeOut", delay: 0.2 }
);

gsap.fromTo("#iwd-events-description",
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.6, ease: "easeOut", delay: 0.4 }
);

gsap.fromTo("#iwd-resources-title",
    { opacity: 0, y: -10 },
    { opacity: 1, y: 0, duration: 0.6, ease: "easeOut", delay: 0.2 }
);

gsap.fromTo("#iwd-resources-description",
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.6, ease: "easeOut", delay: 0.4 }
);

gsap.fromTo("#wecoded-history-title",
    { opacity: 0, y: -10 },
    { opacity: 1, y: 0, duration: 0.6, ease: "easeOut", delay: 0.2 }
);

gsap.fromTo("#wecoded-history-description",
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.6, ease: "easeOut", delay: 0.4 }
);

gsap.fromTo("#iwd-history-title",
    { opacity: 0, y: -10 },
    { opacity: 1, y: 0, duration: 0.6, ease: "easeOut", delay: 0.2 }
);

gsap.fromTo("#iwd-history-description",
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.6, ease: "easeOut", delay: 0.4 }
);
