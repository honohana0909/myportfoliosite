// js/script.js
// jQueryやlottie.jsがこのファイルの前に読み込まれている前提です

document.addEventListener('DOMContentLoaded', () => {
    // Lottieアニメーションをロードするコンテナ要素を取得
    const honokamaekawaLottieContainer = document.getElementById('honokamaekawa');
    const sidebarLottieContainer = document.getElementById('scroll_down');

    let currentSidebarLottieInstance = null; // サイドバーのLottieインスタンスを保持

    // Lottie JSONファイルへのパスを定義
    // ★ここが最も重要です。JSONファイルのパスを、実際に機能したパスに合わせてください。
    // 例: 'json/data.json' または '../json/data.json'
    const LOTTIE_PATH_DATA = 'json/data.json'; // Honoka Maekawa タイトルアニメーション用
    const LOTTIE_PATH_SCROLL_BACK = 'json/scroll_back.json'; // スクロール前（初期状態）のサイドバーLottie
    const LOTTIE_PATH_BACK = 'json/back.json'; // スクロール後（about_me以降）のサイドバーLottie

    // 各セクションIDと、サイドバーLottieのJSONファイルのパスをマッピング
    const sectionLottieMap = {
        'top': LOTTIE_PATH_SCROLL_BACK,         // Topセクションでは scroll_back.json を表示
        'about_me': LOTTIE_PATH_BACK,           // About meセクション以降は back.json
        'skill': LOTTIE_PATH_BACK,
        'works': LOTTIE_PATH_BACK,
        'contact_info': LOTTIE_PATH_BACK
    };

    // Lottieアニメーションをロード・切り替える関数 (サイドバー用)
    function loadSidebarLottie(jsonPath) {
        // 現在のLottieアニメーションのパスと異なる場合のみ更新
        if (sidebarLottieContainer && currentSidebarLottieInstance && currentSidebarLottieInstance.path === jsonPath) {
            // 同じアニメーションが既に表示されている場合は何もしない
            return;
        }

        // 既存のLottieインスタンスがあれば破棄
        if (currentSidebarLottieInstance) {
            currentSidebarLottieInstance.destroy();
            currentSidebarLottieInstance = null;
        }

        // 新しいLottieアニメーションをロード
        if (sidebarLottieContainer && jsonPath) {
            currentSidebarLottieInstance = lottie.loadAnimation({
                container: sidebarLottieContainer,
                renderer: 'svg',
                loop: true,      // ループ再生
                autoplay: true,  // 自動再生
                path: jsonPath
            });
            console.log(`Sidebar Lottie loaded: ${jsonPath}`); // デバッグ用メッセージ
        } else {
            console.warn(`Sidebar Lottie not loaded. Container: ${sidebarLottieContainer ? 'exists' : 'null'}, Path: ${jsonPath}`); // デバッグ用警告
        }
    }

    // --- ページ初期ロード時のLottie設定 ---

    // 1. トップページの Honoka Maekawa アニメーションをロード
    if (honokamaekawaLottieContainer) {
        lottie.loadAnimation({
            container: honokamaekawaLottieContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: LOTTIE_PATH_DATA // Honoka Maekawa タイトルアニメーションのJSONファイルパス
        });
        console.log('Main title Lottie loaded and playing.');
    } else {
        console.warn('Main title Lottie container (#honokamaekawa) not found.');
    }
    
    // 2. サイドバーのLottieの初期設定
    // ページロード時は #top セクションにいるので、LOTTIE_PATH_SCROLL_BACK をロード
    loadSidebarLottie(LOTTIE_PATH_SCROLL_BACK);


    // Intersection Observer のオプション設定
    const observerOptions = {
        root: null,      // ビューポートを監視の基準とする
        rootMargin: '0px',
        threshold: 0.5   // 監視対象要素がビューポートの50%以上見えたらコールバックを発火
    };

    // メインコンテンツの各セクション要素を取得
    // HTMLで定義されているIDに合わせています
    const mainSections = document.querySelectorAll('#about_me, #skill, #works, #contact_info, header#top');

    // Intersection Observer のインスタンスを作成
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // ターゲット要素がビューポートに入った場合
                const sectionId = entry.target.id; // 現在表示されているセクションのID
                const newLottieSrc = sectionLottieMap[sectionId]; // 対応するLottie JSONのパス
                
                loadSidebarLottie(newLottieSrc); // サイドバーのLottieを切り替える関数を呼び出す

                // サイドバーナビゲーションのハイライトを更新
                // これはLottieの切り替えとは直接関係ありませんが、ナビゲーションの動作もここで同期できます
                document.querySelectorAll('.sidebar-nav ul li a').forEach(link => {
                    link.classList.remove('current'); // すべての'current'クラスを削除
                });
                const currentNavLink = document.querySelector(`.sidebar-nav ul li a[href="#${sectionId}"]`);
                if (currentNavLink) {
                    currentNavLink.classList.add('current'); // 現在のセクションに対応するリンクに'current'クラスを追加
                }
            }
        });
    }, observerOptions);

    // 各セクションを監視対象に追加
    mainSections.forEach(section => {
        sectionObserver.observe(section);
    });
});