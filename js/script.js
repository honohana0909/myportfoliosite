
document.addEventListener('DOMContentLoaded', () => {
    const honokamaekawaLottieContainer = document.getElementById('honokamaekawa');
    const sidebarLottieContainer = document.getElementById('scroll_down');
	const flowerLottieContainers = document.querySelectorAll('.flower');

    let currentSidebarLottieInstance = null;
    const LOTTIE_PATH_DATA = 'json/data.json'; 
    const LOTTIE_PATH_SCROLL_BACK = 'json/scroll_back.json';
    const LOTTIE_PATH_BACK = 'json/back.json'; 
	const LOTTIE_PATH_FLOWER = 'json/flower.json';

    const sectionLottieMap = {
        'top': LOTTIE_PATH_SCROLL_BACK,         
		'AboutMe': LOTTIE_PATH_SCROLL_BACK,  
        'about_me': LOTTIE_PATH_BACK,         
        'skill': LOTTIE_PATH_BACK,
        'works': LOTTIE_PATH_BACK,
        'contact_info': LOTTIE_PATH_BACK,
		'Important': LOTTIE_PATH_BACK,
		'Vision': LOTTIE_PATH_BACK
    };

    function loadSidebarLottie(jsonPath) {
        if (sidebarLottieContainer && currentSidebarLottieInstance && currentSidebarLottieInstance.path === jsonPath) {
            return;
        }

        if (currentSidebarLottieInstance) {
            currentSidebarLottieInstance.destroy();
            currentSidebarLottieInstance = null;
        }

        if (sidebarLottieContainer && jsonPath) {
            currentSidebarLottieInstance = lottie.loadAnimation({
                container: sidebarLottieContainer,
                renderer: 'svg',
                loop: true,      
                autoplay: true,  
                path: jsonPath
            });
            console.log(`Sidebar Lottie loaded: ${jsonPath}`);
        } else {
            console.warn(`Sidebar Lottie not loaded. Container: ${sidebarLottieContainer ? 'exists' : 'null'}, Path: ${jsonPath}`); // デバッグ用警告
        }
		
		
    }

    // --- ページ初期ロード時のLottie設定 ---
    if (honokamaekawaLottieContainer) {
        lottie.loadAnimation({
            container: honokamaekawaLottieContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: LOTTIE_PATH_DATA 
        console.log('Main title Lottie loaded and playing.');
    } else {
        console.warn('Main title Lottie container (#honokamaekawa) not found.');
    }
	
    // 2. flower.json アニメーションをロード
       if (flowerLottieContainers.length > 0) {
        flowerLottieContainers.forEach(container => {
            lottie.loadAnimation({
                container: container,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: LOTTIE_PATH_FLOWER
            });
            console.log('Flower Lottie loaded and playing on a .flower element.');
        });
    } else {
        console.warn('Flower Lottie container (.flower) not found.');
    }
    
    // ３. サイドバーのLottieの初期設定
    loadSidebarLottie(LOTTIE_PATH_SCROLL_BACK);


    const observerOptions = {
        root: null,     
        rootMargin: '0px',
        threshold: 0.5  
    };

    const mainSections = document.querySelectorAll('#about_me, #skill, #works, #contact_info, #Important, #Vision, header#top');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { 
                const sectionId = entry.target.id; 
                const newLottieSrc = sectionLottieMap[sectionId]; 
                
                loadSidebarLottie(newLottieSrc); 

                document.querySelectorAll('.sidebar-nav ul li a').forEach(link => {
                    link.classList.remove('current'); 
                });
                const currentNavLink = document.querySelector(`.sidebar-nav ul li a[href="#${sectionId}"]`);
                if (currentNavLink) {
                    currentNavLink.classList.add('current'); 
                }
            }
        });
    }, observerOptions);

    mainSections.forEach(section => {
        sectionObserver.observe(section);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const customCursor = document.querySelector('.custom-cursor');
    
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
    });

    const hoverElements = document.querySelectorAll('a, button');

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            customCursor.classList.add('hover');
        });
        element.addEventListener('mouseleave', () => {
            customCursor.classList.remove('hover');
        });
    });
});

$(".openbtn").click(function () {
    $(this).toggleClass('active');
});