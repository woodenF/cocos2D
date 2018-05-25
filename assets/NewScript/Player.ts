import { Action, audioEngine } from '../../creator';
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
    @property (cc.AudioClip)
    jumpAudio:cc.AudioClip = null;
    // 主角跳跃高度
    private jumpHeight:number = 200;
    // 主角跳跃持续时间
    private jumpDuration:number = 0.3;
    // 最大移动速度
    private maxMoveSpeed:number = 400;
    // 加速度
    private accel:number = 350;
    // 定义动作
    private jumpAction:Action = null;
    // 是否添加向左的加速度
    private accLeft:boolean = false;
    // 是否添加向右的加速度
    private accRight:boolean = false;
    // 主角当前水平方向速度
    private xSpeed:number = 0;
    start () {
        // 初始化跳跃动作
        this.jumpAction = this.setJumpAction();
        // runAction 执行并返回该执行的动作
        this.node.runAction(this.jumpAction);

        // 初始化键盘输入监听
        this.setInputControl();
    }
    // 主角的原地弹跳动作
    setJumpAction () {
        // 跳跃上升
        // cc.moveBy 第一个参数 运行时间，第二个参数，x坐标y坐标移动的距离，easing参数， 动画的过度方式
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // 添加一个回调函数用于在动作结束时调用我们定义的其他方法
        var callback = cc.callFunc(this.playJumpSound, this)        
        // 不断重复
        // repeatForever 永远的重复一个动作，此动作不能被添加到cc.sequence或cc.spawn中
        // sequence 按照添加的动作依次执行
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, callback));
    }
    playJumpSound(){
        // 调用声音引擎播放声音
        cc.audioEngine.playEffect(this.jumpAudio, false)
    }
    update (dt) {
        // 根据当前加速度方向每帧更新速度
        if(this.accLeft){
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        } 
        // 限制主角的速度不能超过最大值
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed){
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
        // 根据当前速度更新主角位置
        this.node.x += this.xSpeed * dt;
    }
    setInputControl () {
        var self = this;
        // 添加键盘事件监听
        // 有按键按下时，判断是否是我们制定的防线控制键，并设置向对应方向加速
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function(event){
            switch(event.keyCode){
                case cc.KEY.a:
                    self.accLeft = true;
                    break;
                case cc.KEY.d:
                    self.accRight = true;
                    break;
            }
        });
        // 松开按键时，停止该方向的加速
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function(event){
            switch(event.keyCode) {
                case cc.KEY.a: 
                    self.accLeft = false;
                    break;
                case cc.KEY.d:
                    self.accRight = false;
                    break;
            }
        })
    }
}
