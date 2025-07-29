document.addEventListener('DOMContentLoaded', () => {
    // LottieWeb は lottie-player.js が読み込まれるとグローバルに利用可能になります
    const LottieWeb = window.LottieWeb;

    if (!LottieWeb) {
        console.error('LottieWeb library not loaded. Make sure lottie-player.js is correctly linked.');
        return;
    }

    // --- 1. スクロール連動アニメーション ---
    const scrollLottieContainer = document.getElementById('scroll-lottie-animation');
    const scrollLottiePath = 'json/scroll_back.json'; // ★ここにスクロール連動用JSONのパスを指定
    
    if (scrollLottieContainer) {
        const scrollAnim = LottieWeb.loadAnimation({
            container: scrollLottieContainer,
            renderer: 'svg',
            loop: false, // スクロールに合わせて制御するためループはfalse
            autoplay: false, // 自動再生もfalse
            path: scrollLottiePath
        });

        // アニメーションが読み込まれたら総フレーム数を取得
        scrollAnim.addEventListener('DOMLoaded', () => {
            const totalFrames = scrollAnim.totalFrames;
            console.log('Scroll Animation Loaded. Total Frames:', totalFrames);

            const scrollSection = document.getElementById('scroll-lottie-section');
            // スクロール可能な範囲を適切に設定するため、セクションの高さを取得
            // スクロールアニメーションの開始位置と終了位置を調整することで、よりスムーズな体験が可能
            const sectionOffsetTop = scrollSection.offsetTop;
            const sectionHeight = scrollSection.offsetHeight; 
            const windowHeight = window.innerHeight;

            // スクロールイベントリスナー
            window.addEventListener('scroll', () => {
                // スクロール位置
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                // セクションがビューポートに入り始めてから終わりまでのスクロール割合を計算
                // 例: セクションが画面下端から入り始めて、画面上端で抜けるまでの割合
                // アニメーションを再生させたいスクロール範囲を調整してください
                const scrollableDistance = sectionHeight + windowHeight; // セクションの高さ + ウィンドウの高さ
                const scrolledIntoSection = scrollTop + windowHeight - sectionOffsetTop;
                
                let scrollProgress = 0;
                if (scrollableDistance > 0) { // ゼロ除算防止
                    scrollProgress = Math.min(1, Math.max(0, scrolledIntoSection / scrollableDistance));
                }

                // プログレスに基づいてフレームを計算
                const frame = Math.floor(totalFrames * scrollProgress);
                scrollAnim.goToAndStop(frame, true); // 指定フレームに移動して停止
            });

            // ページロード時にも一度表示位置を更新
            window.dispatchEvent(new Event('scroll'));
        });
    }


    // --- 2. Aboutセクション到達時のBack to Topアニメーション ---
    const aboutMeSection = document.getElementById('about_me');
    const backToTopContainer = document.getElementById('back-to-top-animation');
    const backToTopButton = document.getElementById('back-to-top-button');
    const backToTopLottiePath = 'json/back.json'; // ★ここにBack to Top用JSONのパスを指定

    if (aboutMeSection && backToTopContainer) {
        const backToTopAnim = LottieWeb.loadAnimation({
            container: backToTopContainer,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: backToTopLottiePath
        });

        let isAnimVisible = false; // アニメーションが表示中かどうかのフラグ

        // アニメーションがロードされたら、Back to Topアニメーションを再生準備
        backToTopAnim.addEventListener('DOMLoaded', () => {
            // スクロールイベントでAboutセクションの表示を監視
            window.addEventListener('scroll', () => {
                const rect = aboutMeSection.getBoundingClientRect();
                // Aboutセクションがビューポート内に入ったら (例: 上端が画面の75%より上、下端が画面の25%より下)
                const isAboutMeInView = (rect.top <= window.innerHeight * 0.75) && (rect.bottom >= window.innerHeight * 0.25);

                if (isAboutMeInView && !isAnimVisible) {
                    // 初めてセクションに入ったらアニメーションを再生し、ボタンを表示
                    backToTopAnim.playSegments([0, backToTopAnim.totalFrames], true); // 全フレーム再生
                    backToTopButton.style.display = 'block'; // ボタンを表示
                    isAnimVisible = true;
                } else if (!isAboutMeInView && isAnimVisible) {
                    // セクションから出たらアニメーションを停止し、ボタンを非表示
                    backToTopAnim.stop(); // 最初のフレームに戻す
                    backToTopButton.style.display = 'none';
                    isAnimVisible = false;
                }
            });

            // ページロード時にも一度表示位置を更新
            window.dispatchEvent(new Event('scroll')); // 画面が読み込まれたときに一度チェック
        });


        // Back to Topボタンのクリックイベント
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // スムーズスクロール
            });
            // アニメーションを停止し非表示にする
            backToTopAnim.stop();
            backToTopButton.style.display = 'none';
            isAnimVisible = false;
        });
    }
});// JavaScript Document