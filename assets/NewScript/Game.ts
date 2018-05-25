import { Prefab, Label, property } from '../../creator';
// Learn TypeScript:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/typescript/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    starPrefab:cc.Prefab = null;
    @property(cc.Node)
    ground:cc.Node = null;
    @property(cc.Node)
    player:cc.Node = null;
    @property(cc.Label)
    scoreDisplay:cc.Label = null;
    @property(cc.AudioClip)
    scoreAudio:cc.AudioClip = null;
    // 星星产生后消失时间的随机范围
    private maxStarDuration:number = 5;
    private minStarDuration:number = 3;
    // 获得地面的Y坐标
    private groundY:number = 0;
    // 初始化计分
    private score:number = 0;
    // 初始化计时器
    private timer:number = 0;
    // 初始化星星存在时间
    private starDuration:number = 0;

    start () {
        this.groundY = this.ground.y + this.ground.height / 2;
        this.spawnNewStar();
    }
    update(dt) {
        //每帧更新计时器，超过限度还没有生成新的星星
        // 就会调用游戏失败逻辑
        if(this.timer > this.starDuration){
            this.gameOver();
            return
        }
        this.timer += dt;
    }
    gameOver(){
        this.player.stopAllActions(); // 停止player节点的跳跃动作
        cc.director.loadScene('game');
    }
    gainScore(){
        this.score += 1;
        // 更新scoreDisplay Label的文字
        this.scoreDisplay.string = 'Score:' + this.score.toString();
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    }
    spawnNewStar(){
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到Canvas节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        // 将game组建的实例传入星星组件
        newStar.getComponent('Star').game = this;
        // 重置计时器，根据消失时间范围随机取一个值
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    }
    getNewStarPosition(){
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的y坐标
        var randY = this.groundY + cc.random0To1() * this.player.getComponent('Player').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星的x坐标
        var maxX = this.node.width / 2
        randX = cc.randomMinus1To1() * maxX;
        // 返回星星坐标
        return cc.p(randX, randY);
    }
    // update (dt) {},
}
