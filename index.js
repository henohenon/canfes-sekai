// TextTypingというクラス名がついている子要素（span）を表示から非表示にする定義
function TextTypingAnime() {
	$('.TextTyping').each(function () {
		var elemPos = $(this).offset().top - 50;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		var thisChild = "";
		if (scroll >= elemPos - windowHeight) {
			thisChild = $(this).children(); //spanタグを取得
			//spanタグの要素の１つ１つ処理を追加
			thisChild.each(function (i) {
				var time = 100;
				//時差で表示する為にdelayを指定しその時間後にfadeInで表示させる
				$(this).delay(time * i).fadeIn(time);
			});
		} else {
			thisChild = $(this).children();
			thisChild.each(function () {
				$(this).stop(); //delay処理を止める
				$(this).css("display", "none"); //spanタグ非表示
			});
		}
	});
}




$(function () {
  $(window).scroll(function () {
    const wHeight = $(window).height();
    const scrollAmount = $(window).scrollTop();
    $('.scrollanime').each(function () {
      const targetPosition = $(this).offset().top;
      if(scrollAmount > targetPosition - wHeight + 60) {
            $(this).addClass("fadeInDown");
          }
      });
  });

	init();
});


/* 以下ページ下の波用関数等。完全コピペですはい。 */

var unit = 100,
    canvasList, // キャンバスの配列
    info = {}, // 全キャンバス共通の描画情報
    colorList; // 各キャンバスの色情報

/**
 * Init function.
 * 
 * Initialize variables and begin the animation.
 */
function init() {
    info.seconds = 0;
    info.t = 0;
    canvasList = [];
    colorList = [];
    // canvas1個めの色指定
    canvasList.push(document.getElementById("waveCanvas"));
    colorList.push(['#blue', '#aua', '#4094ff']);//重ねる波の色設定
    /*
    // canvas2個めの色指定
    canvasList.push(document.getElementById("waveCanvas2"));
    colorList.push(['#43c0e4']);
    
    // canvas3個めの色指定
    canvasList.push(document.getElementById("waveCanvas3"));
    colorList.push(['#fff']);
*/
    // 各キャンバスの初期化
    for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
        canvas.height = 200;//波の高さ
        canvas.contextCache = canvas.getContext("2d");
    }
    // 共通の更新処理呼び出し
    update();
}

function update() {
    for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        // 各キャンバスの描画
        draw(canvas, colorList[canvasIndex]);
    }
    // 共通の描画情報の更新
    info.seconds = info.seconds + .014;
    info.t = info.seconds*Math.PI;
    // 自身の再起呼び出し
    setTimeout(update, 35);
}

/**
 * Draw animation function.
 * 
 * This function draws one frame of the animation, waits 20ms, and then calls
 * itself again.
 */
function draw(canvas, color) {
    // 対象のcanvasのコンテキストを取得
    var context = canvas.contextCache;
    // キャンバスの描画をクリア
    context.clearRect(0, 0, canvas.width, canvas.height);

    //波の重なりを描画 drawWave(canvas, color[数字（波の数を0から数えて指定）], 透過, 波の幅のzoom,波の開始位置の遅れ )
    drawWave(canvas, color[0], 0.5, 3, 0);
  drawWave(canvas, color[1], 0.4, 2, 250);
  drawWave(canvas, color[2], 0.2, 1.6, 100);
}

/**
* 波を描画
* drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
*/
function drawWave(canvas, color, alpha, zoom, delay) {
    var context = canvas.contextCache;
    context.fillStyle = color;//塗りの色
    context.globalAlpha = alpha;
    context.beginPath(); //パスの開始
    drawSine(canvas, info.t / 0.5, zoom, delay);
    context.lineTo(canvas.width + 10, canvas.height); //パスをCanvasの右下へ
    context.lineTo(0, canvas.height); //パスをCanvasの左下へ
    context.closePath() //パスを閉じる
    context.fill(); //塗りつぶす
}

/**
 * Function to draw sine
 * 
 * The sine curve is drawn in 10px segments starting at the origin. 
 * drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
 */
function drawSine(canvas, t, zoom, delay) {
    var xAxis = Math.floor(canvas.height/2);
    var yAxis = 0;
    var context = canvas.contextCache;
    // Set the initial x and y, starting at 0,0 and translating to the origin on
    // the canvas.
    var x = t; //時間を横の位置とする
    var y = Math.sin(x)/zoom;
    context.moveTo(yAxis, unit*y+xAxis); //スタート位置にパスを置く

    // Loop to draw segments (横幅の分、波を描画)
    for (let i = yAxis; i <= canvas.width + 10; i += 10) {
        x = t+(-yAxis+i)/unit/zoom;
        y = Math.sin(x - delay)/3;
        context.lineTo(i, unit*y+xAxis);
    }
}
/*

$(document).ready(function() {
    $('#answerButton').on('click', function(){
        const answerInput=$('#answerInput').val();
        await async function(){
            const uint8  = new TextEncoder().encode(text)
            const digest = await crypto.subtle.digest('SHA-256', uint8)
            return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('');
        }.then(hash=>{
            if(hash=='90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'){
            
            }else{
                $('#resultErea').text('残念...不正解です');
                $('#answerInput').val('');
            }
        })
    })
})
  */
    
const questions={
    'CFNazo_Cky54C' :{'answeres':['f4ab3dae84c3ff953c3492d1b308a5a31eee9e31fcaad628b01695cb7f929da7'], 'hint1':'答えは四文字です。それぞれの文字は「+」で区切られています。', 'hint2':'指定された色の部分に注目しましょう。'},
    'CFNazo_Ds9yeA' :{'answeres':['7f9cee78c399f26679f004947ae5872b380643bdf790a179d17289c9c33619ce'], 'hint1':'小学校で習う表の形をしています。', 'hint2':'五十音表です。'},
    'CFNazo_GrkAhm' :{'answeres':['427101d91632c0fad636a9d962a78d7b4ea381a7849a4929da3dd34f62d320f0'], 'hint1':'「しなじー」を、青色の矢印に当てはめてみましょう。', 'hint2':'縦読みしてみましょう。'},
    'CFNazo_HaDiL5' :{'answeres':['d9a0d68b30061d93781cd89a58f36d6307ab79caf47212ac0649c87bfbcdff15'], 'hint1':'イラストを文字に変換しましょう。', 'hint2':'「くつ」のイラストは、2つに分かれています。'},
    'CFNazo_i57t63' :{'answeres':['d5181e3b433fdc5d28e2745a1edaa5fd86f8d127f1b07d8742d9d277068feb88'], 'hint1':'指示に従って、言葉を変換しましょう。', 'hint2':'青い矢印は、対義語を表しています。'},
    'CFNazo_mDhQae' :{'answeres':['b8f455d557d67b105dad2bc095c6b950336b666a7f92303eb2d57e9cfaedd94c'], 'hint1':'問題文がなぜかローマ字になっています。', 'hint2':'「うらみな」をローマ字に変換しましょう。'},
    'CFNazo_nBXLMF' :{'answeres':['f8797412334f868e6b153ad2c3c8336f9d8d373334bd0628aa9e88d021b8c136'], 'hint1':'指示に従って、全ての単語を漢字に変換します。', 'hint2':'文字の赤い部分が、カタカナに見えてきませんか？'},
    'CFNazo_s2QZ62' :{'answeres':['82aaaa0e49d09afb502548b3cd50adf3799ca4ba62226de3bbb80c03978dde75'], 'hint1':'右上のイラストは、「くじら」です。', 'hint2':'左の図は、時刻を表しています。'},
    'CFNazo_tAU2FQ' :{'answeres':['6f37ffe3ec1d6fb722858dafc76a692e8d4617c520b04e32767615ce0694cb84'], 'hint1':'文字の色に法則性がありそうです。', 'hint2':'緑色の文字は、全て「い」になっています。'},
    'CFNazo_wsFEgB' :{'answeres':['4519ba204a8a88e7a39c266f47d2b39a0ba2f364101aa4e7bcc661f94cb1351b'], 'hint1':'', 'hint2':''},
    'CFNazo_A2gupC' :{'answeres':['90bd955ed49d354f75a16447e1554c8904ff7f7008dad1b687be087ce94f821d'], 'hint1':'', 'hint2':''},
  }
  
  async function makeHash(text){
    const uint8  = new TextEncoder().encode(text)
    const digest = await crypto.subtle.digest('SHA-256', uint8)
    return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('')
  }
  
  async function comparisonHash(text, questionName) {
    let result = false;
    await makeHash(text).then(hash=>{
      for(let i = 0; i < questions[questionName].answeres.length; i++){
        console.log(questions[questionName].answeres[i]==hash);
        if(hash == questions[questionName].answeres[i]){
          result = true;
          break;
        }
      }
    })
    return result;
  }
  
  function getQuestionNames(){
    return Object.keys(questions);
  }
  
  function getQuestionProps(questionName){
    return {'questionImgUrl':questions[questionName].questionImgUrl,'hint1':questions[questionName].hint1,'hint2':questions[questionName].hint2};
  }
  
  //export {makeHash, comparisonHash, getQuestionNames, getQuestionProps};