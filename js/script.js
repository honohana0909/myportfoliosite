// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. トップページの Honoka Maekawa アニメーションをロード
    const honokamaekawaLottieContainer = document.getElementById('honokamaekawa');
    if (honokamaekawaLottieContainer) {
        lottie.loadAnimation({
            container: honokamaekawaLottieContainer, // HTMLで指定したdiv要素
            renderer: 'svg', // svg または canvas
            loop: true,      // ループ再生
            autoplay: true,  // 自動再生
            path: '../json/data.json' // Honoka Maekawa タイトルアニメーションのJSONファイルパス
        });
        console.log('Main title Lottie (../json/data.json) loaded and playing.');
    } else {
        console.warn('Main title Lottie container (#honokamaekawa) not found.');
    }

    // 2. サイドバーのLottieアニメーションをロード
    const sidebarLottieContainer = document.getElementById('scroll_down'); // HTMLのIDに合わせて変更
    if (sidebarLottieContainer) {
        lottie.loadAnimation({
            container: sidebarLottieContainer, // HTMLで指定したdiv要素
            renderer: 'svg', // svg または canvas
            loop: true,      // ループ再生
            autoplay: true,  // 自動再生
            path: '../json/scroll_back.json' // サイドバーのLottie JSONファイルパス
        });
        console.log('Sidebar Lottie (../json/scroll_back.json) loaded and playing.');
    } else {
        console.warn('Sidebar Lottie container (#scroll_down) not found.');
    }

    // スクロールに応じたLottie切り替えのロジック（Intersection Observerなど）は、
    // この段階では削除されています。表示が確認できたら後で追加します。
});