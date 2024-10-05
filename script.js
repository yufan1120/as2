$(document).ready(function() {
    // 選取所有超連結標籤
    $('a').on('click', function(event) {
        // 判斷連結是否包含錨點
        if (this.hash !== "") {
            // 阻止默認行為（防止直接跳轉到錨點）
            event.preventDefault();
            // 將當前標籤的錨點 ID 儲存到變數 targetId
            var targetId = this.hash;
            // 使用 querySelector 選取對應的 DOM 元素
            var targetElement = document.querySelector(targetId);
            // 確認 targetElement 是否存在
            if (targetElement) {
                // 獲取目標元素距離頁面頂部的偏移量
                var targetOffset = targetElement.offsetTop;
                // 設置滾動的持續時間
                var duration = 800; // 毫秒
                // 獲取當前頁面滾動位置
                var start = window.pageYOffset; 
                // 計算從目前滾動位置到目標元素的距離
                var distance = targetOffset - start;
                // 紀錄滾動開始的時間
                var startTime = null;

                // 命名的內部函式，用於處理平滑滾動
                function scrollAnimation(timeStamp) {
                    // 如果滾動尚未開始，則設置為目前的時間戳
                    if (!startTime) startTime = timeStamp;
                    // 計算自滾動開始後經過的時間
                    var progress = timeStamp - startTime; 
                    // 計算滾動的比例
                    var easeInOut = progress / duration; 

                    if (easeInOut < 1) {
                        // 直接將公式寫在 window.scrollTo() 裡
                        window.scrollTo(0, start + distance * easeInOut); 
                        // 告訴瀏覽器在下次重繪前調用 scrollAnimation 函式
                        requestAnimationFrame(scrollAnimation); 
                    } else {
                        // 滾動完成，讓 hash 的位置等於 targetId
                        window.location.hash = targetId; 
                    }
                }
                // 啟動動畫
                requestAnimationFrame(scrollAnimation);
            }
        }
    });
});