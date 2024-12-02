let angle = 0;
let colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];
let rainbows = [];  // 儲存彩虹碎片
let fireworks = [];  // 儲存煙火
let fireworkSound;  // 煙火聲音
let colorChangeInterval = 0;  // 顏色變化的計數器
let currentColor;  // 當前顏色
let message = "教育科技";  // 主要顯示的文字
let isHovering = false;  // 滑鼠是否懸停在文字上

function preload() {
  fireworkSound = loadSound('firework.wav', 
    () => console.log('Sound loaded successfully'), 
    (err) => console.error('Error loading sound:', err)
  );  // 載入煙火聲音
}

function setup() {
  createCanvas(windowWidth, windowHeight);  // 設置畫布大小為視窗大小
  textAlign(CENTER, CENTER);
  textSize(200);  // 放大文字大小
  currentColor = color(random(255), random(255), random(255));  // 初始化顏色
}

function draw() {
  background(220);
  
  // 隨機生成煙火
  if (random() < 0.02) {  // 每幾幀隨機生成煙火
    let rainbowColor = color(random(255), random(255), random(255));  // 隨機顏色
    fireworks.push({ 
      x: random(width),  // 隨機位置
      y: height, 
      color: rainbowColor,
      speed: random(3, 6),  // 隨機速度
      alpha: 255,  // 初始透明度
      size: random(20, 50),  // 隨機大小
      exploded: false  // 紀錄是否已經爆炸
    });
    fireworkSound.play();  // 播放煙火聲音
  }

  // 繪製煙火效果
  for (let i = fireworks.length - 1; i >= 0; i--) {
    let firework = fireworks[i];
    
    if (!firework.exploded) {
      // 繪製煙火上升
      fill(firework.color);
      noStroke();
      ellipse(firework.x, firework.y, firework.size, firework.size);  // 繪製圓形
      firework.y -= firework.speed;  // 向上移動

      // 當煙火到達頂部時，標記為爆炸並生成彩虹碎片
      if (firework.y < height / 4) {
        firework.exploded = true;

        // 生成彩虹碎片
        for (let j = 0; j < 20; j++) {  // 生成 20 個彩虹碎片
          let rainbowColor = color(random(255), random(255), random(255));  // 隨機顏色
          rainbows.push({ 
            x: firework.x + random(-20, 20),  // 隨機位置
            y: firework.y, 
            color: rainbowColor,
            speed: random(2, 5),  // 隨機速度
            alpha: 255,  // 初始透明度
            size: random(10, 30)  // 隨機大小
          });
        }
      }
    } else {
      // 煙火爆炸效果
      fill(firework.color.levels[0], firework.color.levels[1], firework.color.levels[2], firework.alpha); // 更新顏色的透明度
      ellipse(firework.x, height / 4, firework.size * 2, firework.size * 2);  // 繪製爆炸效果
      firework.alpha -= 5;  // 減少透明度

      // 如果透明度小於 0，則移除該煙火
      if (firework.alpha <= 0) {
        fireworks.splice(i, 1);
      }
    }
  }

  // 繪製彩虹碎片
  for (let i = rainbows.length - 1; i >= 0; i--) {
    let rainbow = rainbows[i];
    fill(rainbow.color);
    noStroke();
    ellipse(rainbow.x, rainbow.y, rainbow.size, rainbow.size);  // 繪製圓形

    // 更新位置和透明度
    rainbow.y -= rainbow.speed;  // 向上移動
    rainbow.alpha -= 5;  // 減少透明度
    fill(rainbow.color.levels[0], rainbow.color.levels[1], rainbow.color.levels[2], rainbow.alpha); // 更新顏色的透明度

    // 如果透明度小於 0，則移除該彩虹碎片
    if (rainbow.alpha <= 0) {
      rainbows.splice(i, 1);
    }
  }
  
  // 重置懸停狀態
  isHovering = false;
  
  // 設定文字位置在畫面中央
  push();  // 保存當前變換狀態
  translate(width / 2, height / 2);
  
  // 為每個字元創建動態效果
  for (let i = 0; i < message.length; i++) {
    push();
    // 每個字的位置和動態效果
    let x = (i - message.length/2) * 150;  // 增加字間距
    let y = sin(angle + i * 0.5) * 30;
    
    // 每 30 幀改變一次顏色
    if (colorChangeInterval % 30 === 0) {
      currentColor = color(random(255), random(255), random(255));
    }
    fill(currentColor);
    
    // 添加些微旋轉
    rotate(sin(angle + i) * 0.1);
    
    // 檢查滑鼠是否碰到文字
    let d = dist(mouseX - width/2, mouseY - height/2, x, y);
    if (d < 100) {  // 增加檢測範圍
      isHovering = true;
    }
    
    // 繪製文字
    text(message[i], x, y);
    pop();
  }
  
  // 如果滑鼠懸停在文字上，顯示資訊
  if (isHovering) {
    textSize(48);  // 設置資訊文字大小
    fill(0);  // 黑色文字
    text("413730507 吳德維", 0, 150);  // 在主要文字下方顯示
  }
  
  pop();  // 恢復變換狀態
  
  // 更新顏色變化計數器
  colorChangeInterval++;
  
  // 更新角度以產生動態效果
  angle += 0.05;
}
