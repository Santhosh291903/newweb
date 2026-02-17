/**
 * Section Loader - Loads each section from its own file
 * Edit sections/home.html, sections/about.html, etc. for easy updates
 * Note: Use a local server (e.g. Live Server, npx serve) - file:// has CORS restrictions
 */
(function() {
    const sections = [
        { id: 'section-home', file: 'sections/home.html' },
        { id: 'section-about', file: 'sections/about.html' },
        { id: 'section-skills', file: 'sections/skills.html' },
        { id: 'section-tools', file: 'sections/tools.html' },
        { id: 'section-experience', file: 'sections/experience.html' },
        { id: 'section-articles', file: 'sections/certification.html' },
        { id: 'section-contact', file: 'sections/contact.html' }
    ];

    function loadSection(containerId, filePath) {
        const container = document.getElementById(containerId);
        if (!container) return Promise.resolve();

        return fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error('Failed to load ' + filePath);
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
            })
            .catch(err => {
                console.error('Error loading ' + filePath + ':', err);
                container.innerHTML = '<!-- Section load failed: ' + filePath + ' -->';
            });
    }

    function loadAllSections() {
        const promises = sections.map(s => loadSection(s.id, s.file));
        return Promise.all(promises).then(() => {
            document.dispatchEvent(new CustomEvent('sectionsLoaded'));
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadAllSections);
    } else {
        loadAllSections();
    }
})();
