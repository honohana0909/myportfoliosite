// script.js

document.addEventListener('DOMContentLoaded', () => {
    // サイドバーに設置したLottieプレイヤー要素を取得
    const sidebarLottiePlayer = document.querySelector('.sidebar-nav lottie-player');

    // メインコンテンツの各セクション要素を取得
    const mainSections = document.querySelectorAll('main .section, header#top');

    // 各セクションIDと、対応するLottie JSONファイルのパスをマッピング
    // ★ここを、about_me以降全て json/back.json に変更しました！★
    const sectionLottieMap = {
        'top': 'json/scroll_back.json',         // トップセクション用のLottie
        'about_me': 'json/back.json',    // About meセクションも back.json
        'skill': 'json/back.json',       // Skillセクションも back.json
        'works': 'json/back.json',       // Worksセクションも back.json
        'contact_info': 'json/back.json' // Contactセクションも back.json
    };

    // Intersection Observer のオプション設定
    const observerOptions = {
        root: null,      // nullはビューポート（ブラウザの表示領域）を監視の基準とする
        rootMargin: '0px', // ルートのマージン
        threshold: 0.5   // 監視対象要素がビューポートの50%以上見えたらコールバックを発火
    };

    // Intersection Observer のインスタンスを作成
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // ターゲット要素がビューポートに入った場合
                const sectionId = entry.target.id; // 現在表示されているセクションのID
                const newLottieSrc = sectionLottieMap[sectionId]; // 対応するLottie JSONのパス

                // 現在のLottieアニメーションのパスと異なる場合のみ更新
                if (sidebarLottiePlayer && sidebarLottiePlayer.src !== newLottieSrc) {
                    sidebarLottiePlayer.load(newLottieSrc); // 新しいLottie JSONをロード
                    sidebarLottiePlayer.speed = 1;         // 速度をリセット（必要であれば）
                    sidebarLottiePlayer.play();            // アニメーションを再生
                }

                // サイドバーナビゲーションのハイライトを更新
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
        observer.observe(section);
    });

    // ★ 初期ロード時の処理 ★
    // ページ読み込み時に、URLのハッシュ（#topなど）に基づいてLottieとナビハイライトを設定
    // または、デフォルトでTopセクションをアクティブにする
    const initialSectionId = window.location.hash ? window.location.hash.substring(1) : 'top';
    const initialLottieSrc = sectionLottieMap[initialSectionId];

    if (sidebarLottiePlayer && initialLottieSrc && sidebarLottiePlayer.src !== initialLottieSrc) {
        sidebarLottiePlayer.load(initialLottieSrc);
        sidebarLottiePlayer.play();
    }
    const initialNavLink = document.querySelector(`.sidebar-nav ul li a[href="#${initialSectionId}"]`);
    if (initialNavLink) {
        initialNavLink.classList.add('current');
    }
});
